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
use strided::{Stride, MutStride, Strided, MutStrided, MutSubstrides};
use arrayvec::ArrayVec;

mod const_twid;
mod stride_iter;
mod tuples_exact;
mod wavegen;
mod gamma;
mod cmplx;

use cmplx::Complex;
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
        output[1] = m[0] - m1_j - m[2] + m3_j;
        output[2] = m[0] - m[1] + m[2] - m[3];
        output[3] = m[0] + m1_j - m[2] - m3_j;
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

struct UnsafeBox<T>(T);
unsafe impl<T> Send for UnsafeBox<T> {}
unsafe impl<T> Sync for UnsafeBox<T> {}

unsafe trait SendIGuess : Send {}
// unsafe impl<T: Send + Sync> SendIGuess for MutSubstrides<'_, T> {}

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
    let mut output1: Vec<Complex> = vec![Complex(0.0, 0.0); N_SQR];
    let mut output2: Vec<Complex> = vec![Complex(0.0, 0.0); N_SQR];
    // unsafe { 
    //     output1.set_len(N_SQR);
    //     output2.set_len(N_SQR);
    // }

    web_sys::console::time();

    fft_impl(&input, &mut output1);
    fft_impl(&output1, &mut output2);

    web_sys::console::time_end();

    output2
}

#[wasm_bindgen]
pub fn fft_2d(pts: &[f32]) -> Vec<f32> {
    console_error_panic_hook::set_once();

    assert!(pts.len() == 2*N_SQR);

    let input = pts
        .into_iter()
        .tuples::<(_, _)>()
        .map(|(a, b)| Complex(*a, *b))
        .collect_vec();

    assert!(input.len() == N_SQR);
   
    let output = fft_2d_impl(&input);

    output
        .into_iter()
        .flat_map(|c| [c.0, c.1])
        .collect()
}
