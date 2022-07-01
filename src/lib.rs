#![feature(int_log)]
#![feature(const_trait_impl)]
#![feature(const_mut_refs)]
#![feature(const_fn_floating_point_arithmetic)]

use const_twid::TWIDDLE_LOOKUP;
use wasm_bindgen::{prelude::*, Clamped};
extern crate console_error_panic_hook;
use rayon::prelude::*;
pub use wasm_bindgen_rayon::init_thread_pool;
use core::arch::wasm32;
use itertools::Itertools;
use std::{convert::*, f32::consts::{TAU, PI}};

mod const_twid;
mod stride_iter;
mod tuples_exact;
mod wavegen;

use stride_iter::FFTStepRange;

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

#[inline]
fn multiply_complex(ab: (f32, f32), cd: (f32, f32)) -> (f32, f32) {
    let (a, b) = ab;
    let (c, d) = cd;
    ((a*c - b*d), (b*c + a*d))
}

#[inline]
fn add_complex(ab: (f32, f32), cd: (f32, f32)) -> (f32, f32) {
    (ab.0 + cd.0, ab.1 + cd.1)
}

#[inline]
#[cfg(target_arch = "wasm32")]
fn multiply_complex_simd(ab: (f32, f32), cd: (f32, f32)) -> (f32, f32) {
    let (a, b) = ab;
    let (c, d) = cd;
    let vec_all = wasm32::f32x4(a, b, c, d);
    // c d b a
    let vec_all_shuf = wasm32::u16x8_shuffle::<4, 5, 6, 7, 2, 3, 0, 1>(vec_all, wasm32::u16x8_splat(0));
    // ac bd bc ad
    let vec_mul = wasm32::f32x4_mul(vec_all, vec_all_shuf);
    // ac -bd bc ad
    let vec_mul_sign = wasm32::f32x4_mul(vec_mul, wasm32::f32x4(1.0, -1.0, 1.0, 1.0));
    // -bd ac ad bc
    let vec_mul_sign_shuf = wasm32::u16x8_shuffle::<2, 3, 0, 1, 6, 7, 4, 5>(vec_mul_sign, wasm32::u16x8_splat(0));
    // ac - bd, ac - bd, ad + bc, ad + bc
    let vec_res = wasm32::f32x4_add(vec_mul, vec_mul_sign_shuf);
    (wasm32::f32x4_extract_lane::<0>(vec_res), wasm32::f32x4_extract_lane::<2>(vec_res))
}

fn two_point_dft(pt0: (f32, f32), pt1: (f32, f32)) -> [(f32, f32); 2] {
    [(pt0.0 + pt1.0, pt0.1 + pt1.1), (pt0.0 - pt1.0, pt0.1 - pt1.1)]
}

fn unpack_f32(vec: wasm32::v128) -> [f32; 4] {
    [
        wasm32::f32x4_extract_lane::<0>(vec), 
        wasm32::f32x4_extract_lane::<1>(vec), 
        wasm32::f32x4_extract_lane::<2>(vec), 
        wasm32::f32x4_extract_lane::<3>(vec)
    ]
}

fn multiply_complex2_simd(ab: wasm32::v128, cd: wasm32::v128) -> wasm32::v128 {
    // all vectors are pairs of two complex numbers: [a1, b1, a2, b2]
    // algorithm derived from https://github.com/jagger2048/fft_simd

    let cc = wasm32::u16x8_shuffle::<0, 1, 0, 1, 4, 5, 4, 5>(cd, wasm32::u16x8_splat(0));
    let dd = wasm32::u16x8_shuffle::<2, 3, 2, 3, 6, 7, 6, 7>(cd, wasm32::u16x8_splat(0));
    let ba = wasm32::u16x8_shuffle::<2, 3, 0, 1, 6, 7, 4, 5>(ab, wasm32::u16x8_splat(0));

    let ac_bc = wasm32::f32x4_mul(ab, cc);
    let bd_ad = wasm32::f32x4_mul(ba, dd);

    let sub = wasm32::f32x4_sub(ac_bc, bd_ad);
    let add = wasm32::f32x4_add(ac_bc, bd_ad);

    // (sub[0], add[1])
    wasm32::i16x8_shuffle::<0, 1, 10, 11, 4, 5, 14, 15>(sub, add)
}

fn lookup_twiddle(idx: usize, half_n: usize, twiddles: &[(f32, f32)]) -> (f32, f32) {
    // lookup and return the vector
    let step = twiddles.len() / half_n;
    twiddles[idx * step]
}

// fn log_stride(stride: &FFTStepRange) {
//    web_sys::console::log_3(&stride.start.to_string().into(), &stride.end.to_string().into(), &stride.shift.to_string().into());
//}

/// Writes the forward DFT of `input` to `output`.
fn fft(input: &[f32], input_stride: FFTStepRange, output: &mut [f32], output_stride: FFTStepRange, twiddles: &[(f32, f32)]) {
    // check it's a power of two.
    // assert!(input_stride.len() == output_stride.len() && input_stride.len().count_ones() == 1, "input_stride = {}, output_stride = {}", input_stride.len(), output_stride.len());

    // break early for a four point butterfly
    // log_stride(&input_stride);
    if input_stride.len() == 4 {
        unsafe {
            let m: [(f32, f32); 4] = [
                (*input.get_unchecked(input_stride.get(0)), *input.get_unchecked(input_stride.get(0) + 1)),
                (*input.get_unchecked(input_stride.get(1)), *input.get_unchecked(input_stride.get(1) + 1)),
                (*input.get_unchecked(input_stride.get(2)), *input.get_unchecked(input_stride.get(2) + 1)),
                (*input.get_unchecked(input_stride.get(3)), *input.get_unchecked(input_stride.get(3) + 1)),
            ];
        
            let (m1_j, m3_j) = ((-m[1].1, m[1].0), (-m[3].1, m[3].0));
            *output.get_unchecked_mut(output_stride.get(0)    ) =  m[0].0 + m[1].0 + m[2].0 + m[3].0;
            *output.get_unchecked_mut(output_stride.get(0) + 1) =  m[0].1 + m[1].1 + m[2].1 + m[3].1;
            *output.get_unchecked_mut(output_stride.get(1)    ) =  m[0].0 - m1_j.0 - m[2].0 + m3_j.0;
            *output.get_unchecked_mut(output_stride.get(2) + 1) =  m[0].1 - m1_j.1 - m[2].1 + m3_j.1;
            *output.get_unchecked_mut(output_stride.get(2)    ) =  m[0].0 - m[1].0 + m[2].0 - m[3].0;
            *output.get_unchecked_mut(output_stride.get(2) + 1) =  m[0].1 - m[1].1 + m[2].1 - m[3].1;
            *output.get_unchecked_mut(output_stride.get(3)    ) =  m[0].0 + m1_j.0 - m[2].0 - m3_j.0;
            *output.get_unchecked_mut(output_stride.get(3) + 1) =  m[0].1 + m1_j.1 - m[2].1 - m3_j.1;
        }
        return;
    }

    // split the input into two arrays of alternating elements ("decimate in time")
    let (evens_stride, odds_stride) = input_stride.stride_2();
    // break the output into two halves (front and back, not alternating)
    let (start_stride, end_stride) = output_stride.split();
    // log_stride(&start_stride);
    // log_stride(&end_stride);
    let half_len = start_stride.len();

    // recursively perform two FFTs on alternating elements of the input, writing the
    // results into the first and second half of the output array respectively.
    fft(input, evens_stride, output, start_stride.clone(), twiddles);
    fft(input, odds_stride, output, end_stride.clone(), twiddles);

    // combine the subFFTs with the relations:
    //   X_k       = E_k + exp(-2πki/N) * O_k
    //   X_{k+N/2} = E_k - exp(-2πki/N) * O_k
    for (i, (even, odd)) in start_stride.zip_eq(end_stride).enumerate() {
        let twiddle = lookup_twiddle(i, half_len, twiddles);
        let odd_twiddle = multiply_complex((output[odd], output[odd + 1]), twiddle);
        let e = (output[even], output[even + 1]);

        let even_num = add_complex(e, odd_twiddle);
        let odd_num = add_complex(e, (-odd_twiddle.0, -odd_twiddle.1));

        output[even] = even_num.0;
        output[even + 1] = even_num.1;
        output[odd] = odd_num.0;
        output[odd + 1] = odd_num.1;
    }
}

struct UnsafeBox(*mut f32);
unsafe impl Send for UnsafeBox {}
unsafe impl Sync for UnsafeBox {}

const PTS: usize = 1024;
const N: usize = PTS / 2;
const N_SQR: usize = N * N;
const N2_SQR: usize = N * N * 2;

fn fft_impl(input: &[f32]) -> Vec<f32> {
    let mut output1: Vec<f32> = Vec::with_capacity(N2_SQR);
    let unsafe_output;
    unsafe { 
        output1.set_len(N2_SQR);
        unsafe_output = UnsafeBox(output1.as_mut_ptr());
    }

    (0..N).zip_eq(0..N)
        .par_bridge()
        .into_par_iter()
        .for_each(|(input_row, output_col)| {
                // linear over row
                let input_stride = FFTStepRange::new(input_row*2*N, input_row*2*N + 2*N, 1);
                // linear over col
                let output_stride = FFTStepRange::new(output_col*2, N2_SQR + output_col*2, 10);
                // unsafe copy of the output vector
                let unsafe_slice;
                unsafe { unsafe_slice = std::slice::from_raw_parts_mut(unsafe_output.0, output1.len()); }
                fft(input, input_stride, unsafe_slice, output_stride, &TWIDDLE_LOOKUP);
            });
    
    output1
}

#[wasm_bindgen]
pub fn fft_2d(pts: &[f32]) -> Vec<f32> {
    console_error_panic_hook::set_once();

    assert!(pts.len() == N2_SQR);

    web_sys::console::time();

    let input = pts;
    let output1 = fft_impl(input);
    let output2 = fft_impl(&output1);
   
    web_sys::console::time_end();

    output2
}
