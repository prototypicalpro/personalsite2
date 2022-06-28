use wasm_bindgen::{prelude::*, Clamped};
extern crate console_error_panic_hook;
use rayon::prelude::*;
pub use wasm_bindgen_rayon::init_thread_pool;
use core::arch::wasm32;
use itertools::Itertools;
use std::convert::*;
use arrayvec::ArrayVec;

mod bitshuffle;
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

const PTS: usize = 512;

pub fn two_point_dft(pt0: wasm32::v128, pt1: wasm32::v128) -> wasm32::v128 {
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

#[wasm_bindgen]
pub fn fft(pts: &[f32]) -> Vec<f32> {
    const N: usize = PTS;
    assert!(pts.len() == PTS);
    let vec: ArrayVec<f32, N> = pts.try_into().unwrap();
    let tmp: Vec<f32> = vec
        .into_iter()
        // [a, b, ...] -> [{a, b, a, b}, ...]
        .tuples::<(_, _)>()
        .map(|(r, c)| wasm32::f32x4(r, c, r, c))
        // sort by bit reversal
        .shuffle_iterator::<8, 256>()
        // 2-pt DFT on each element -> [{a, b, c, d}, ...]
        .tuples::<(_, _)>()
        .map(|(lhs, rhs)| two_point_dft(lhs, rhs))
        .flat_map(unpack_f32)
        .collect();

    tmp
    // TODO: probably fastest to copy it directly into a GL buffer
}

#[wasm_bindgen]
pub fn bitreverse(n: u32) -> u32 {
    const lookup: [usize; 512] = bitshuffle::get_bitshuffle_lookup::<512>(9);
    lookup[usize::try_from(n).unwrap()].try_into().unwrap()
}