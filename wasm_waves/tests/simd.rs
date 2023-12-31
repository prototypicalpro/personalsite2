extern crate wasm_bindgen;

use rand_distr::num_traits::Zero;
use wasm_bindgen_test::*;
use num_complex::Complex32;
use std::arch::wasm32::*;
use wasm_waves::simd::{mul_complex_f32, splat_complex};
use wasm_waves::simd::{WasmSimdNum, WasmSimdArray, WasmSimdArrayMut};
use web_sys::console;

#[wasm_bindgen_test]
fn pass() {
    assert_eq!(1, 1);
}

macro_rules! console_log {
    // Note that this is using the `log` function imported above during
    // `bare_bones`
    ($($t:tt)*) => (console::log_1(&format_args!($($t)*).to_string().into()))
}


fn pv128(pfx: &str, vec: v128) {
    let r = [
        f32x4_extract_lane::<0>(vec),
        f32x4_extract_lane::<1>(vec),
        f32x4_extract_lane::<2>(vec),
        f32x4_extract_lane::<3>(vec),
    ];
    console_log!("{}: {:?}", pfx, r);
}

#[wasm_bindgen_test]
fn test_simd_pack() {
    let twiddle = Complex32::new(0.1, 0.9);
    let left = [Complex32::new(1., 2.), Complex32::new(1., 2.)];
    let rev_right = [Complex32::new(3., 4.), Complex32::new(3., 4.)];
    let mut leftout = [Complex32::zero(); 2];
    let mut rightout = [Complex32::zero(); 2];

    unsafe {
        // s = x + xr
        // d = x - xr
        // st = s.i*t = (x.i + xr.i)*t.ri
        // mt = (d.r*)*t.ir
        // ot = st + mt 
        // left = (s.re, d.i) - ot
        // right = ((s.re, d.i) + ot)*
        
        let twiddle = splat_complex(&twiddle);

        let real_conj = f32x4(-0., 0., -0., 0.);
        let conj = f32x4(0., -0., 0., -0.);
        
        let vl = (&left).load_complex(0);
        let vr = (&rev_right).load_complex(0);

        pv128("vl", vl); pv128("vr", vr); pv128("t", twiddle);

        let sd = f32x4_add(vl,  v128_xor(vr, real_conj)); // difference in real, sum in imag

        pv128("sd", sd);

        let si = u32x4_shuffle::<1, 1, 3, 3>(sd, sd);
        let dr = u32x4_shuffle::<0, 0, 2, 2>(sd, sd);

        pv128("si", si); pv128("dr", dr);

        let st = f32x4_mul(si, twiddle);
        let twidrev = u32x4_shuffle::<1, 0, 3, 2>(twiddle, twiddle);
        let mt = f32x4_mul(v128_xor(dr, conj), twidrev);
        let ot = f32x4_add(st, mt);

        pv128("st", st); pv128("twr", twidrev); pv128("mt", mt); pv128("ot", ot);

        let sd_2 = f32x4_add(vl,  v128_xor(vr, conj)); // sum in real, difference in imag
        let leftvec = f32x4_sub(sd_2, ot);
        let rightvec = v128_xor(f32x4_add(sd_2, ot), conj);

        pv128("sd2", sd_2);

        (&mut leftout).store_complex(leftvec, 0);
        (&mut rightout).store_complex(rightvec, 0);
    }

    // let twiddle = const_twid::lookup_twiddle(i, WIDTH / 2);
    // // assert!((twiddle - Complex32::from_polar(1.0, std::f32::consts::TAU * (i as f32 / N as f32))).re < 0.0001);
    
    let sum0 = left[0] + rev_right[0];
    let sum1 = left[1] + rev_right[1];
    let diff0 = left[0] - rev_right[0];
    let diff1 = left[1] - rev_right[1];

    // Apply twiddle factors. Theoretically we'd have to load 2 separate twiddle factors here, one for the beginning
    // and one for the end. But the twiddle factor for the end is just the twiddle for the beginning, with the
    // real part negated. Since it's the same twiddle, we can factor out a ton of math ops and cut the number of
    // multiplications in half.
    let twiddled_re_sum0 = sum0 * twiddle.re;
    let twiddled_re_sum1 = sum1 * twiddle.re;
    let twiddled_im_sum0 = sum0 * twiddle.im;
    let twiddled_im_sum1 = sum1 * twiddle.im;
    let twiddled_re_diff0 = diff0 * twiddle.re;
    let twiddled_re_diff1 = diff1 * twiddle.re;
    let twiddled_im_diff0 = diff0 * twiddle.im;
    let twiddled_im_diff1 = diff1 * twiddle.im;

    let output_twiddled_real0 = twiddled_re_sum0.im + twiddled_im_diff0.re;
    let output_twiddled_real1 = twiddled_re_sum1.im + twiddled_im_diff1.re;
    let output_twiddled_im0 = twiddled_im_sum0.im - twiddled_re_diff0.re;
    let output_twiddled_im1 = twiddled_im_sum1.im - twiddled_re_diff1.re;

    console_log!("ot2: ({}, {})", output_twiddled_real0, output_twiddled_im0);

    // We finally have all the data we need to write our preprocessed data back where we got it from.
    let leftout2 = [Complex32::new(
        sum0.re - output_twiddled_real0,
        diff0.im - output_twiddled_im0,
    ),
    Complex32::new(
        sum1.re - output_twiddled_real1,
        diff1.im - output_twiddled_im1,
    )];
    let rightout2 = [Complex32::new(
        sum0.re + output_twiddled_real0,
        -output_twiddled_im0 - diff0.im,
    ),
    Complex32::new(
        sum1.re + output_twiddled_real1,
        -output_twiddled_im1 - diff1.im,
    )];

    assert_eq!(leftout, leftout2);
    assert_eq!(rightout, rightout2);
    assert_eq!(leftout[0], leftout[1]);
    assert_eq!(rightout[0], rightout[1]);
    // assert_eq!(rightout, rightout2);
}

#[wasm_bindgen_test]
fn test_simd_4pt() {
    let input = [
        [Complex32::new(0., 1.), Complex32::new(0., 1.)],
        [Complex32::new(2., 3.), Complex32::new(2., 3.)],
        [Complex32::new(4., 5.), Complex32::new(4., 5.)],
        [Complex32::new(6., 7.), Complex32::new(6., 7.)],
    ];
    let mut output = [[Complex32::zero(); 2]; 4];

    unsafe {
        let m0 = (&input[0]).load_complex(0);
        let m1 = (&input[1]).load_complex(0);
        let m2 = (&input[2]).load_complex(0);
        let m3 = (&input[3]).load_complex(0);

        let conj = f32x4(0., -0., 0., -0.);
        let m1conj = v128_xor(m1, conj);
        let m1_j = u32x4_shuffle::<1, 0, 3, 2>(m1conj, m1conj);
        let m3conj = v128_xor(m3, conj); 
        let m3_j = u32x4_shuffle::<1, 0, 3, 2>(m3conj, m3conj);

        pv128("m1", m1); pv128("m1conj", m1conj); pv128("m1j", m1_j); 

        let o0 = f32x4_add(f32x4_add(m0, m1), f32x4_add(m2, m3));
        let o1 = f32x4_sub(f32x4_add(m0, m1_j), f32x4_add(m2, m3_j));
        let o2 = f32x4_add(f32x4_sub(m0, m1),  f32x4_sub(m2, m3));
        let o3 = f32x4_sub(f32x4_sub(m0, m1_j), f32x4_sub(m2, m3_j));

        (&mut output[0]).store_complex(o0, 0);
        (&mut output[1]).store_complex(o1, 0);
        (&mut output[2]).store_complex(o2, 0);
        (&mut output[3]).store_complex(o3, 0);
    }

    let mut output2 = [Complex32::zero(); 4];
    let m = input;
    let m1_j = m[1][0]*Complex32::i();
    let m3_j = m[3][0]*Complex32::i();

    console_log!("m1j real: {}", m1_j);

    output2[0] = m[0][0] + m[1][0] + m[2][0] + m[3][0];
    output2[1] = m[0][0] + m1_j - m[2][0] - m3_j;
    output2[2] = m[0][0] - m[1][0] + m[2][0] - m[3][0];
    output2[3] = m[0][0] - m1_j - m[2][0] + m3_j;

    let output2_test = [
        [output2[0], output2[0]],
        [output2[1], output2[1]],
        [output2[2], output2[2]],
        [output2[3], output2[3]]
    ];

    assert_eq!(output, output2_test);
}


#[wasm_bindgen_test]
fn test_mul() {
    unsafe {
        let a = Complex32::new(1., 2.);
        let b = Complex32::new(3., 4.);

        let avec = (&[a, a]).load_complex(0);
        let bvev = (&[b, b]).load_complex(0);

        let o = mul_complex_f32(avec, bvev);

        let oreal = a*b;

        let mut of = [Complex32::zero(), Complex32::zero()];
        (&mut of).store_complex(o, 0);

        assert_eq!(oreal, of[0]);
        assert_eq!(oreal, of[1]);
    }
}

fn transpose_rows_to_cols<T: Copy>(matrix: &[T; 12], out: &mut [T; 12]) {
    const BLOCK_SIZE: usize = 1;

    for i in (0..3).step_by(BLOCK_SIZE) {
        for j in (0..4).step_by(BLOCK_SIZE) {
            // transpose the block beginning at [i,j]

            for r in i..std::cmp::min(i + BLOCK_SIZE, 3) {
                for c in j..j + BLOCK_SIZE {
                    unsafe {
                        *out.get_unchecked_mut(r + c*3) = matrix.get_unchecked(c + r*4).clone();
                    }
                }
            }
        }
    }
}

#[wasm_bindgen_test]
fn test_transpose() {
    let test = [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12
    ];

    let mut out = test.clone();

    transpose_rows_to_cols(&test, &mut out);

    let real = [
        1, 5, 9, 
        2, 6, 10,
        3, 7, 11,
        4, 8, 12
    ];

    assert_eq!(out, real);
}
