#![feature(int_log)]
#![feature(const_trait_impl)]
#![feature(const_mut_refs)]
#![feature(const_fn_floating_point_arithmetic)]

use wasm_bindgen::{prelude::*, Clamped};
extern crate console_error_panic_hook;
use rayon::prelude::*;
pub use wasm_bindgen_rayon::init_thread_pool;
use core::arch::wasm32;
use itertools::Itertools;
use std::{convert::*, f32::consts::{TAU, PI}};
use arrayvec::ArrayVec;

mod bitshuffle;
mod const_twid;

use bitshuffle::BitShuffleIteratorTrait;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;



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

fn multiply_complex(ab: (f32, f32), cd: (f32, f32)) -> (f32, f32) {
    let (a, b) = ab;
    let (c, d) = cd;
    ((a*c - b*d), (b*c + a*d))
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

fn two_point_dft(pt0: wasm32::v128, pt1: wasm32::v128) -> wasm32::v128 {
    // pt0 and pt1 are (a, bJ, a, bj)
    let pt1_neg = wasm32::f32x4_mul(pt1, wasm32::f32x4(1.0, 1.0, -1.0, -1.0));
    wasm32::f32x4_add(pt0, pt1_neg)
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

fn lookup_twiddle(idx: usize, half_n: usize, twiddles: &[(f32, f32)]) -> wasm32::v128 {
    // convert to unpacked values
    let real_idx = idx * 2;
    // lookup and return the vector
    let step = twiddles.len() / (half_n);
    let (ar, ac) = twiddles[real_idx * step];
    let (br, bc) = twiddles[(real_idx + 1) * step];
    wasm32::f32x4(ar, ac, br, bc)
}

fn n_point_butterfly(ray: &mut [wasm32::v128], twiddles: &[(f32, f32)]) {
    // N_packed because each v128 vector contains two complex numbers
    let N_packed = ray.len();
    let (even_half, odd_half) = ray.split_at_mut(N_packed/2);

    assert!(even_half.len() == odd_half.len());

    for idx in 0..even_half.len() {
        let even = even_half[idx];
        let odd = odd_half[idx];
        let twiddle = lookup_twiddle(idx, N_packed, twiddles);
        let odd_mult = multiply_complex2_simd(odd, twiddle);

        even_half[idx] = wasm32::f32x4_add(even, odd_mult);
        odd_half[idx] = wasm32::f32x4_sub(even, odd_mult);
    }
}

const PTS: usize = 512;

#[wasm_bindgen]
pub fn fft(pts: &[f32]) -> Vec<f32> {
    const N: usize = PTS / 2;
    const ITERATIONS: usize = N.log2() as usize;
    const N_2: usize = N / 2;
    const TWIDDLES: [(f32, f32); N_2] = const_twid::TWIDDLE_LOOKUP;
    assert!(pts.len() == PTS);

    let vec: ArrayVec<f32, PTS> = pts.try_into().unwrap();
    let mut pass: ArrayVec<wasm32::v128, N_2> = vec
        .into_iter()
        // [a, b, ...] -> [{a, b, a, b}, ...]
        .tuples::<(_, _)>()
        .map(|(r, c)| wasm32::f32x4(r, c, r, c))
        // sort by bit reversal
        .shuffle_iterator::<ITERATIONS, N>()
        // 2-pt DFT on each element -> [{a, b, c, d}, ...]
        .tuples::<(_, _)>()
        .map(|(lhs, rhs)| two_point_dft(lhs, rhs))
        .collect();

    for i in 1..ITERATIONS {
        let chunk_size = 2_usize.pow(i as u32);
        // for every chunk compute butterfly sum
        web_sys::console::log_2(&"Pass:".into(), &chunk_size.to_string().into());
        for chunk in pass.chunks_exact_mut(chunk_size) {
            assert!(chunk.len() > 1);
            n_point_butterfly(chunk, &TWIDDLES);
        }
    }

    pass
        .into_iter()
        .map(|v| wasm32::f32x4_div(v, wasm32::f32x4_splat(N as f32)))
        .flat_map(unpack_f32)
        .collect()
    // TODO: probably fastest to copy it directly into a GL buffer
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