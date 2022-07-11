#![feature(int_log)]
#![feature(const_trait_impl)]
#![feature(const_mut_refs)]
#![feature(const_fn_floating_point_arithmetic)]
#![feature(iter_collect_into)]
#![feature(new_uninit)]

use wasm_bindgen::{prelude::*, Clamped, JsCast};
extern crate console_error_panic_hook;
use rayon::prelude::*;
pub use wasm_bindgen_rayon::init_thread_pool;
use core::arch::wasm32;
use itertools::{Itertools, MinMaxResult};
use std::{convert::*, f32::consts::{TAU, PI}, pin::Pin, mem::align_of, mem::size_of};
use strided::{Stride, MutStride, Strided, MutStrided, MutSubstrides};
use arrayvec::ArrayVec;
use num_complex::Complex32;

mod const_twid;
mod tuples_exact;
mod wavegen;
mod gamma;
mod cmplx;
mod product_exact;
mod collect_into_arrayvec;

use const_twid::lookup_twiddle;
use wavegen::{WaveGen, WavePoint};
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

// fn log_stride(stride: &FFTStepRange) {
//    web_sys::console::log_3(&stride.start.to_string().into(), &stride.end.to_string().into(), &stride.shift.to_string().into());
//}

fn make_box_arrayvec<T: Sized, const S: usize>() -> Box<ArrayVec<T, S>> {
    // this both allocates uninit memory and prevents a crash when allocating normally
    // (not enough stack space to store the arrayvec I guess?)
    let mut pos_out: Box<ArrayVec<T, S>>;
    unsafe {
        pos_out = Box::new_uninit().assume_init();
        pos_out.set_len(0);
    }
    pos_out
}

/// Writes the forward DFT of `input` to `output`.
fn fft_c2c(input: Stride<Complex32>, mut output: MutStride<Complex32>) {
    const J: Complex32 = Complex32::new(0.0, 1.0);
    // check it's a power of two.
    assert!(input.len() == output.len() && input.len().count_ones() == 1, "input_stride = {}, output_stride = {}", input.len(), output.len());
    // web_sys::console::log_1(&input.len().to_string().into());

    // break early for a four point butterfly
    // log_stride(&input_stride);
    if input.len() == 4 {
        let m: [Complex32; 4] = [input[0], input[1], input[2], input[3]];
    
        let (m1_j, m3_j) = (J*m[1], J*m[3]);
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
    fft_c2c(evens, start.reborrow());
    fft_c2c(odds, end.reborrow());

    // combine the subFFTs with the relations:
    //   X_k       = E_k + exp(-2πki/N) * O_k
    //   X_{k+N/2} = E_k - exp(-2πki/N) * O_k
  
    // let twiddle = Complex32::from_polar(1.0, (-2.0 * std::f32::consts::PI / input.len() as f32));
    // let mut factor = Complex32::new(1., 0.);
    for (i, (even, odd)) in start.iter_mut().zip_eq(end.iter_mut()).enumerate() {
        let twiddle = lookup_twiddle(i, half_len);
        // assert!((Complex32::from_polar(1.0, std::f32::consts::TAU * (i as f32 / input.len() as f32)) - twiddle).re < 0.0001);
        let e = *even;
        let o = *odd;
        let odd_twiddle = o*twiddle;
  
        *even = e + odd_twiddle;
        *odd = e - odd_twiddle;
    }
}

const N: usize = 512;
const N_CMPLX: usize = N / 2 + 1;
const N_SQR: usize = N * N;

fn complex_to_packed_input(input: &mut [Complex32]) {
    // Xe[k] = 0.5(X[k] + X*[N/2-k])
    // Xo[k] = 0.5(X[k] + X*[N/2-k]e^(j2pik/N))
    // Z[k] = Xe[k] + jXo[k]
  
    // first and last imaginary MUST be zero
    input[0].im = 0.0;
    // input[input.len() - 1].im = 0.0;
  
    let (lhs, rhs) = input.split_at_mut(input.len() / 2);
  
    for (i, (left, rev_right)) in lhs.iter_mut().zip(rhs.iter_mut().rev()).enumerate() {
      let twiddle = lookup_twiddle(i, N / 2);
      // assert!((twiddle - Complex32::from_polar(1.0, std::f32::consts::TAU * (i as f32 / N as f32))).re < 0.0001);
      
      let sum = *left + *rev_right;
      let diff = *left - *rev_right;
  
      // Apply twiddle factors. Theoretically we'd have to load 2 separate twiddle factors here, one for the beginning
      // and one for the end. But the twiddle factor for the end is just the twiddle for the beginning, with the
      // real part negated. Since it's the same twiddle, we can factor out a ton of math ops and cut the number of
      // multiplications in half.
      let twiddled_re_sum = sum * twiddle.re;
      let twiddled_im_sum = sum * twiddle.im;
      let twiddled_re_diff = diff * twiddle.re;
      let twiddled_im_diff = diff * twiddle.im;
  
      let output_twiddled_real = twiddled_re_sum.im + twiddled_im_diff.re;
      let output_twiddled_im = twiddled_im_sum.im - twiddled_re_diff.re;
  
      // We finally have all the data we need to write our preprocessed data back where we got it from.
      *left = Complex32::new(
          sum.re - output_twiddled_real,
          diff.im - output_twiddled_im,
      );
      *rev_right = Complex32::new(
          sum.re + output_twiddled_real,
          -output_twiddled_im - diff.im,
      );
    }
  
    // center element
    input[input.len() / 2] = 2.0*input[input.len() / 2].conj();
  
    // note: last element in each row is padding
    input[input.len() - 1] = Complex32::new(0.0, 0.0);
  
  }
  

fn fft_2d_impl(input_unpacked: &mut [Complex32]) -> Box<[f32]> {
    // input_unpacked: N*(N/2+1) (transposed)
    // output_packed:  (N/2+1)*N
    assert!(input_unpacked.len() == (N/2 + 1)*N);
    assert!(align_of::<Complex32>() == 4);
    assert!(size_of::<Complex32>() == 8);

    let mut stage1 = 
        unsafe { Box::<[Complex32]>::new_uninit_slice((N/2 + 1)*N).assume_init() };
    {
        let mut output_strides: ArrayVec<_, N> = stage1
            .as_stride_mut()
            .substrides_mut(N/2 + 1)
            .collect();

        // pass 1: N/2+1 FFTs which move rows of N -> columns of N
        input_unpacked
            .par_chunks_exact_mut(N)
            .zip_eq(output_strides.par_iter_mut())
            .for_each(|(input_row, output_col)|
                fft_c2c(input_row.as_stride(), output_col.reborrow()));
    }

    // pass 2: N DFTS which move rows of N/2+1 -> rows of N real
    let mut output = 
        unsafe { Box::<[f32]>::new_uninit_slice(N*N).assume_init() };
    let (_, output_as_cmplx, _) = unsafe { output.align_to_mut::<Complex32>() };
    assert!(output_as_cmplx.len() == N*N/2);

    {
        // let mut output_strides: ArrayVec<_, N> = output
        //     .as_stride_mut()
        //     .substrides_mut(N)
        //     .collect();
        
        stage1
            .par_chunks_exact_mut(N/2 + 1)
            .zip_eq(output_as_cmplx.par_chunks_exact_mut(N/2))
            .for_each(|(input_row, output_col)| {
                // pack complex into N/2 DFT
                complex_to_packed_input(input_row);
                // drop last sample 257 -> 256
                fft_c2c(input_row[0..input_row.len() - 1].as_stride(), output_col.as_stride_mut());
            });
    }
    
    output
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
        let pos_out = make_box_arrayvec::<f32, OUT_FIELD_SIZE>();

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

    output.field = Box::new(WaveGen::new(N, 250.0, 1000.0, 25.0, 100000.0, 3.33, 0.0));
    output.data = output.field.compute_spectra();
}

#[wasm_bindgen]
pub fn gen_and_paint_height_field(wavefield: &mut RetBuf, time: f32) {
    web_sys::console::time_with_label(&"height_field");

    let waves = &wavefield.data;
    let field = &wavefield.field;
    let pos_out = &mut *wavefield.pos_out;
    pos_out.truncate(0);

    let mut cmplx_field = field.compute_timevaried(&waves, time);
    
    // let ret = cmplx_field[0]
    //     .iter()
    //     .flat_map(|c| [c.re, c.im])
    //     .collect::<Vec<f32>>();

    let mut fft_out: ArrayVec<Box<[f32]>, 3> = ArrayVec::new_const();
    cmplx_field
        .par_iter_mut()
        .map(|c| fft_2d_impl(c.as_mut_slice()))
        .collect_into_arrayvec(&mut fft_out);

    fft_out[0]
        .iter()
        .zip_eq(&*fft_out[1])
        .zip_eq(&*fft_out[2])
        .enumerate()
        .flat_map(|(i, ((h, x), y))| {
            // scale xy to [-domain/2, domain/2]
            // and set origin to top right (-x, +y)
            let x_pos = (i % field.points()) as f32 * (field.domain() / field.points() as f32) - 0.5*field.domain();
            let y_pos = 0.5*field.domain() - (i / field.points()) as f32 * (field.domain() / field.points() as f32);
            [x_pos + x, y_pos + y, h.clone() + 2.0]
        })
        .collect_into(pos_out);

    // let normalize = |c: f32| ((c + 2.0) / 4.0 * 255.0).clamp(0.0, 255.0) as u8;
    // let pix_out: Vec<u8> = fft_out[0]
    //     .par_iter()
    //     .zip_eq(&*fft_out[1])
    //     .zip_eq(&*fft_out[2])
    //     .flat_map_iter(|((h, x), y)| [normalize(h.clone()), /* normalize(x.0), normalize(y.0) */ 0_u8, 0_u8, 255_u8])
    //     .collect();
    
    // let minmax = fft_out[1].as_slice().into_iter().map(|c| c.0).minmax().into_option().unwrap();
    // web_sys::console::log_2(&minmax.0.to_string().into(), &minmax.1.to_string().into());
    
    web_sys::console::time_end_with_label(&"height_field");

    // Clamped(pix_out)
    // ret
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
