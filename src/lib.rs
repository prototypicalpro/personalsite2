#![feature(int_log)]
#![feature(const_trait_impl)]
#![feature(const_mut_refs)]
#![feature(const_fn_floating_point_arithmetic)]
#![feature(iter_collect_into)]
#![feature(new_uninit)]

use const_twid::TWIDDLE_LOOKUP;
use wasm_bindgen::{prelude::*, Clamped, JsCast};
extern crate console_error_panic_hook;
use rayon::prelude::*;
pub use wasm_bindgen_rayon::init_thread_pool;
use web_sys::ImageData;
use core::arch::wasm32;
use itertools::{Itertools, MinMaxResult};
use std::{convert::*, f32::consts::{TAU, PI}, pin::Pin};
use strided::{Stride, MutStride, Strided, MutStrided, MutSubstrides};
use arrayvec::ArrayVec;

mod const_twid;
mod tuples_exact;
mod wavegen;
mod gamma;
mod cmplx;
mod product_exact;
mod collect_into_arrayvec;

use wavegen::{WaveGen, WavePoint};
use cmplx::Complex;
use collect_into_arrayvec::ParCollectArrayVec;
use product_exact::ProductExactIteratorTrait;

// #[global_allocator]
// static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

trait DiscreetUnwrap<T, E> {
    fn duwrp(self) -> T;
}

impl<T, E> DiscreetUnwrap<T, E> for Result<T, E> {
    fn duwrp(self) -> T  {
        match self {
            Ok(r) => r,
            Err(_) => {
                panic!("duwrp() failed.")
            },
        }
    }
}

fn lookup_twiddle(idx: usize, half_n: usize, twiddles: &[Complex]) -> Complex {
    // lookup and return the vector
    let step = twiddles.len() / half_n;
    twiddles[idx * step]
}

// fn log_stride(stride: &FFTStepRange) {
//    web_sys::console::log_3(&stride.start.to_string().into(), &stride.end.to_string().into(), &stride.shift.to_string().into());
//}

/// Writes the forward DFT of `input` to `output`.
fn fft(input: Stride<Complex>, mut output: MutStride<Complex>, twiddles: &[Complex]) {
    // check it's a power of two.
    // assert!(input.len() == output.len() && input.len().count_ones() == 1, "input_stride = {}, output_stride = {}", input.len(), output.len());
    // web_sys::console::log_1(&input.len().to_string().into());

    // break early for a four point butterfly
    // log_stride(&input_stride);
    if input.len() == 4 {
        let m: [Complex; 4] = [input[0], input[1], input[2], input[3]];
    
        let (m1_j, m3_j) = (Complex(-m[1].1, m[1].0), Complex(-m[3].1, m[3].0));
        output[0] = m[0] + m[1] + m[2] + m[3];
        output[1] = m[0] + m1_j - m[2] - m3_j;
        output[2] = m[0] - m[1] + m[2] - m[3];
        output[3] = m[0] - m1_j - m[2] + m3_j;
        return;
    }

    // split the input into two arrays of alternating elements ("decimate in time")
    let (evens, odds) = input.substrides2();
    // break the output into two halves (front and back, not alternating)
    let (mut start, mut end) = output.split_at_mut(input.len() / 2);
    let half_len = start.len();

    // recursively perform two FFTs on alternating elements of the input, writing the
    // results into the first and second half of the output array respectively.
    fft(evens, start.reborrow(), twiddles);
    fft(odds, end.reborrow(), twiddles);

    // combine the subFFTs with the relations:
    //   X_k       = E_k + exp(-2πki/N) * O_k
    //   X_{k+N/2} = E_k - exp(-2πki/N) * O_k
    for (i, (even, odd)) in start.iter_mut().zip(end.iter_mut()).enumerate() {
        let twiddle = lookup_twiddle(i, half_len, twiddles);
        let odd_twiddle = *odd * twiddle;
        let e = *even;

        *even = e + odd_twiddle;
        *odd = e - odd_twiddle;
    }
}

const N: usize = 512;
const N_SQR: usize = N * N;

fn fft_impl(input: &[Complex], output: &mut [Complex]) {
    // let mut output1: Vec<Complex> = Vec::with_capacity(N);
    let mut output_strides: ArrayVec<_, N> = output
        .as_stride_mut()
        .substrides_mut(N)
        .collect();

    input
        .par_chunks(N)
        .zip_eq(output_strides.par_iter_mut())
        .for_each(|(input_row, output_col)| {
            fft(input_row.as_stride(), output_col.reborrow(), &TWIDDLE_LOOKUP);
        });
}

fn fft_2d_impl(input: &[Complex]) -> Vec<Complex> {
    let mut output1: Vec<Complex> = Vec::with_capacity(N_SQR);
    let mut output2: Vec<Complex> = Vec::with_capacity(N_SQR);
    unsafe { 
        output1.set_len(N_SQR);
        output2.set_len(N_SQR);
    }

    // web_sys::console::time();

    fft_impl(&input, &mut output1);
    fft_impl(&output1, &mut output2);

    // web_sys::console::time_end();

    output2
}

const OUT_FIELD_SIZE: usize = 512*512*3; // TODO: constants

#[wasm_bindgen]
pub struct RetBuf {
    #[wasm_bindgen(skip)]
    pub data: Box<[WavePoint]>,
    #[wasm_bindgen(skip)]
    pub field: Box<WaveGen>,
    #[wasm_bindgen(skip)]
    pub pos_out: Pin<Box<ArrayVec<f32, OUT_FIELD_SIZE>>>
}

#[wasm_bindgen]
impl RetBuf {
    #[wasm_bindgen(constructor)]
    pub fn new() -> RetBuf {
        // allocating a new box of arrayvec still pushes it to the stack for some reason
        // so we fiddle with it manually here
        let mut pos_out: Box<ArrayVec<f32, OUT_FIELD_SIZE>>;
        unsafe {
            pos_out = Box::new_uninit().assume_init();
            pos_out.set_len(0);
        }

        RetBuf{ 
            data: Box::new([]), 
            field: Box::new(WaveGen::default()),
            pos_out: pos_out.into()
        }
    }

    pub fn get_pos_out_ptr(&self) -> *const f32 {
        self.pos_out.as_ptr()
    }
}

#[wasm_bindgen]
pub fn gen_wavefield(output: &mut RetBuf) {
    console_error_panic_hook::set_once();

    output.field = Box::new(WaveGen::new(N, 250.0, 1000.0, 5.0, 100000.0, 3.33, 0.0));
    output.data = output.field.compute_spectra();
}

#[wasm_bindgen]
pub fn gen_and_paint_height_field(wavefield: &mut RetBuf, time: f32) -> Clamped<Vec<u8>> {
    web_sys::console::time_with_label(&"height_field");

    let waves = &wavefield.data;
    let field = &wavefield.field;
    let pos_out = &mut *wavefield.pos_out;
    pos_out.truncate(0);

    let cmplx_field = field.compute_timevaried(&waves, time);
    
    let mut fft_out: ArrayVec<Vec<Complex>, 3> = ArrayVec::new_const();
    cmplx_field
        .into_par_iter()
        .map(|c| fft_2d_impl(&c))
        .collect_into_arrayvec(&mut fft_out);

    fft_out[0]
        .iter()
        .zip_eq(&fft_out[1])
        .zip_eq(&fft_out[2])
        .flat_map(|((h, x), y)| [h.0, x.0, y.0])
        .collect_into(pos_out);


    let normalize = |c: f32| ((c + 2.0) / 4.0 * 255.0).clamp(0.0, 255.0) as u8;
    let pix_out: Vec<u8> = fft_out[0]
        .par_iter()
        .zip_eq(&fft_out[1])
        .zip_eq(&fft_out[2])
        .flat_map_iter(|((h, x), y)| [normalize(h.0), normalize(x.0), normalize(y.0), 255_u8])
        .collect();
    
    // let minmax = fft_out[1].as_slice().into_iter().map(|c| c.0).minmax().into_option().unwrap();
    // web_sys::console::log_2(&minmax.0.to_string().into(), &minmax.1.to_string().into());
    
    web_sys::console::time_end_with_label(&"height_field");

    Clamped(pix_out)
    // cmplx_out
    //     .into_iter()
    //     .flat_map(|c| [c.0, c.1])
    //     .collect_vec()
}


fn compute_rendering_data() {
    // Two real FFTs simultaniously using one c2c IFFT:
    // https://qr.ae/pvP6xT
    // http://dsp-book.narod.ru/FFTBB/0270_PDF_C14.pdf

    // x, y, z disp
    // normals can either be compluted from partials (dydx, dydz, dxdx, dzdz) or approximated from displacement
    // uvs?

    // returns a list of pointers to arrays
}