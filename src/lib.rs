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
use itertools::{Itertools, izip};
use std::{convert::*, f32::consts::{TAU, PI}};
use arrayvec::ArrayVec;

mod bitshuffle;
mod const_twid;
mod stride_iter;

use stride_iter::{StrideIteratorTrait, FFTStepRange};
use bitshuffle::BitShuffleIteratorTrait;

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

#[wasm_bindgen]
pub fn test_cmplx(input: Clamped<Vec<f32>>) -> Clamped<Vec<f32>> {
    console_error_panic_hook::set_once();
    
    let mut ret: Vec<f32> = Vec::with_capacity(input.len()/2);
    
    for i in 0..input.len()/4 {
        let res = multiply_complex((input[i], input[i+1]), (input[i+2], input[i+3]));
        ret.push(res.0);
        ret.push(res.1);
    }

    Clamped(ret)
}

#[wasm_bindgen]
pub fn test_cmplx_simd(input: Clamped<Vec<f32>>) -> Clamped<Vec<f32>> {
    console_error_panic_hook::set_once();
    
    // console_log!("Input length: {}", input.len());
    let mut ret: Vec<f32> = Vec::with_capacity(input.len()/2);
    
    for i in 0..input.len()/4 {
        let res = multiply_complex_simd((input[i], input[i+1]), (input[i+2], input[i+3]));
        ret.push(res.0);
        ret.push(res.1);
    }

    Clamped(ret)
}

// fn two_point_dft(pt0: wasm32::v128, pt1: wasm32::v128) -> wasm32::v128 {
//     // pt0 and pt1 are (a, bJ, a, bj)
//     let pt1_neg = wasm32::f32x4_mul(pt1, wasm32::f32x4(1.0, 1.0, -1.0, -1.0));
//     wasm32::f32x4_add(pt0, pt1_neg)
// }

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

fn n_point_butterfly(ray: &mut [(f32, f32)], twiddles: &[(f32, f32)]) {
    // N_packed because each v128 vector contains two complex numbers
    let N = ray.len();
    let (even_half, odd_half) = ray.split_at_mut(N/2);

    assert!(even_half.len() == odd_half.len());

    for idx in 0..even_half.len() {
        let even = even_half[idx];
        let odd = odd_half[idx];
        let twiddle = lookup_twiddle(idx, N / 2, twiddles);
        let odd_mult = multiply_complex(odd, twiddle);

        even_half[idx] = (even.0 + odd.0, even.1 + odd.1);
        odd_half[idx] = (even.0 - odd.0, even.1 - odd.1);
    }
}

fn log_stride(stride: &FFTStepRange) {
    web_sys::console::log_3(&stride.start.to_string().into(), &stride.end.to_string().into(), &stride.shift.to_string().into());
}

/// Writes the forward DFT of `input` to `output`.
fn fft(input: &[f32], input_stride: FFTStepRange, output: &mut [f32], output_stride: FFTStepRange, twiddles: &[(f32, f32)]) {
    // check it's a power of two.
    // assert!(input_stride.len() == output_stride.len() && input_stride.len().count_ones() == 1, "input_stride = {}, output_stride = {}", input_stride.len(), output_stride.len());

    // break early for a four point butterfly
    // log_stride(&input_stride);
    if input_stride.len() == 4 {
        let m: [(f32, f32); 4] = [
            (input[input_stride.get(0)], input[input_stride.get(0) + 1]),
            (input[input_stride.get(1)], input[input_stride.get(1) + 1]),
            (input[input_stride.get(2)], input[input_stride.get(2) + 1]),
            (input[input_stride.get(3)], input[input_stride.get(3) + 1]),
        ];
    
        let (m1_j, m3_j) = ((-m[1].1, m[1].0), (-m[3].1, m[3].0));
        output[output_stride.get(0)]     =  m[0].0 + m[1].0 + m[2].0 + m[3].0;
        output[output_stride.get(0) + 1] =  m[0].1 + m[1].1 + m[2].1 + m[3].1;
        output[output_stride.get(1)]     =  m[0].0 - m1_j.0 - m[2].0 + m3_j.0;
        output[output_stride.get(2) + 1] =  m[0].1 - m1_j.1 - m[2].1 + m3_j.1;
        output[output_stride.get(2)]     =  m[0].0 - m[1].0 + m[2].0 - m[3].0;
        output[output_stride.get(2) + 1] =  m[0].1 - m[1].1 + m[2].1 - m[3].1;
        output[output_stride.get(3)]     =  m[0].0 + m1_j.0 - m[2].0 - m3_j.0;
        output[output_stride.get(3) + 1] =  m[0].1 + m1_j.1 - m[2].1 - m3_j.1;
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

const PTS: usize = 1024;

fn fft_1d(pts: &[f32], out: &mut [f32]) -> ArrayVec<f32, PTS> {
    const N: usize = PTS / 2;
    const ITERATIONS: usize = N.log2() as usize;
    const N_2: usize = N / 2;
    const TWIDDLES: [(f32, f32); N_2] = const_twid::TWIDDLE_LOOKUP;
    assert!(pts.len() == PTS);

    let mut pass: ArrayVec<(f32, f32), N> = pts
        .into_iter()
        // [a, b, ...] -> [{a, b, a, b}, ...]
        .tuples::<(_, _)>()
        // .map(|(r, c)| wasm32::f32x4(*r, *c, *r, *c))
        // sort by bit reversal
        .shuffle_iterator::<ITERATIONS, N>()
        // 2-pt DFT on each element -> [{a, b, c, d}, ...]
        .tuples::<(_, _)>()
        .flat_map(|(lhs, rhs)| two_point_dft((*lhs.0, *lhs.1), (*rhs.0, *rhs.1)))
        .collect();

    for i in 1..ITERATIONS {
        let chunk_size = 2_usize.pow((i + 1) as u32);
        // for every chunk compute butterfly sum
        // web_sys::console::log_2(&"Pass:".into(), &chunk_size.to_string().into());
        for chunk in pass.chunks_exact_mut(chunk_size) {
            assert!(chunk.len() > 1);
            n_point_butterfly(chunk, &TWIDDLES);
        }
    }

    pass
        .into_iter()
        // .map(|v| wasm32::f32x4_div(v, wasm32::f32x4_splat(N as f32)))
        .flat_map(|(a, b)| [a, b])
        .collect()
    // TODO: probably fastest to copy it directly into a GL buffer
}

#[wasm_bindgen]
pub fn fft_2d(pts: &[f32]) -> Vec<f32> {
    console_error_panic_hook::set_once();

    const N: usize = PTS / 2;
    const N_SQR: usize = N * N;
    const N2_SQR: usize = N * N * 2;

    assert!(pts.len() == N2_SQR);

    web_sys::console::time();

    let input = pts;
    let mut output1: Vec<f32> = Vec::with_capacity(N2_SQR);
    unsafe { output1.set_len(N2_SQR); }

    for (input_row, output_col) in (0..N).zip_eq(0..N) {
        // linear over row
        let input_stride = FFTStepRange::new(input_row*2*N, input_row*2*N + 2*N, 1);
        // linear over col
        let output_stride = FFTStepRange::new(output_col*2, N2_SQR + output_col*2, 10);

        fft(input, input_stride, &mut output1, output_stride, &TWIDDLE_LOOKUP);
    }

    let output1 = output1;
    let mut output2: Vec<f32> = Vec::with_capacity(N2_SQR);
    unsafe { output2.set_len(N2_SQR); }
    
    for (input_row, output_col) in (0..N).zip_eq(0..N) {
        let input_stride = FFTStepRange::new(input_row*2*N, input_row*2*N + 2*N, 1);
        // linear over col
        let output_stride = FFTStepRange::new(output_col*2, N2_SQR + output_col*2, 10);

        fft(&output1, input_stride, &mut output2, output_stride, &TWIDDLE_LOOKUP);
    }
    
    web_sys::console::time_end();

    output2
}

#[wasm_bindgen]
pub fn test_multiply_cmplx2(a: f32, b: f32, c: f32, d: f32) {
    web_sys::console::log_4(&a.to_string().into(), &b.to_string().into(), &c.to_string().into(), &d.to_string().into());

    let lhs = wasm32::f32x4(a, b, a, b);
    let rhs = wasm32::f32x4(c, d, c, d);
    let res = multiply_complex2_simd(lhs, rhs);
    let (r1, c1, r2, c2) = (
        wasm32::f32x4_extract_lane::<0>(res), 
        wasm32::f32x4_extract_lane::<1>(res), 
        wasm32::f32x4_extract_lane::<2>(res), 
        wasm32::f32x4_extract_lane::<3>(res)
    );

    web_sys::console::log_4(&r1.to_string().into(), &c1.to_string().into(), &r2.to_string().into(), &c2.to_string().into());
}