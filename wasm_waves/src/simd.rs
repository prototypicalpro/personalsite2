use core::{arch::wasm32::*, ops::{Deref, DerefMut}};
use num_complex::Complex;

pub trait WasmSimdNum {
    type VectorType;
    const COMPLEX_PER_VECTOR: usize;
}
impl WasmSimdNum for f32 {
    type VectorType = v128;
    const COMPLEX_PER_VECTOR: usize = 2;
}
impl WasmSimdNum for f64 {
    type VectorType = v128;
    const COMPLEX_PER_VECTOR: usize = 1;
}

/// A trait to handle reading from an array of complex floats into WASM SIMD vectors.
/// WASM works with 128-bit vectors, meaning a vector can hold two complex f32,
/// or a single complex f64.
pub trait WasmSimdArray<T: WasmSimdNum>: Deref {
    /// Load complex numbers from the array to fill a WASM SIMD vector.
    unsafe fn load_complex(&self, index: usize) -> T::VectorType;
    /// Load a single complex number from the array into a WASM SIMD vector, setting the unused elements to zero.
    unsafe fn load_partial1_complex(&self, index: usize) -> T::VectorType;
    /// Load a single complex number from the array, and copy it to all elements of a WASM SIMD vector.
    unsafe fn load1_complex(&self, index: usize) -> T::VectorType;
}

impl<const N: usize> WasmSimdArray<f32> for &[Complex<f32>; N] {
    #[inline(always)]
    unsafe fn load_complex(&self, index: usize) -> <f32 as WasmSimdNum>::VectorType {
        debug_assert!(self.len() >= index + <f32 as WasmSimdNum>::COMPLEX_PER_VECTOR);
        v128_load(self.as_ptr().add(index) as *const v128)
    }

    #[inline(always)]
    unsafe fn load_partial1_complex(&self, index: usize) -> <f32 as WasmSimdNum>::VectorType {
        debug_assert!(self.len() >= index + 1);
        v128_load64_lane::<0>(f32x4_splat(0.0), self.as_ptr().add(index) as *const u64)
    }

    #[inline(always)]
    unsafe fn load1_complex(&self, index: usize) -> <f32 as WasmSimdNum>::VectorType {
        debug_assert!(self.len() >= index + 1);

        v128_load64_splat(self.as_ptr().add(index) as *const u64)
    }
}

impl<const N: usize> WasmSimdArray<f32> for &mut [Complex<f32>; N] {
    #[inline(always)]
    unsafe fn load_complex(&self, index: usize) -> <f32 as WasmSimdNum>::VectorType {
        debug_assert!(self.len() >= index + <f32 as WasmSimdNum>::COMPLEX_PER_VECTOR);
        v128_load(self.as_ptr().add(index) as *const v128)
    }

    #[inline(always)]
    unsafe fn load_partial1_complex(&self, index: usize) -> <f32 as WasmSimdNum>::VectorType {
        debug_assert!(self.len() >= index + 1);
        v128_load64_lane::<0>(f32x4_splat(0.0), self.as_ptr().add(index) as *const u64)
    }

    #[inline(always)]
    unsafe fn load1_complex(&self, index: usize) -> <f32 as WasmSimdNum>::VectorType {
        debug_assert!(self.len() >= index + 1);
        v128_load64_splat(self.as_ptr().add(index) as *const u64)
    }
}

/// A trait to handle writing to an array of complex floats from WASM SIMD vectors.
/// WASM works with 128-bit vectors, meaning a vector can hold two complex f32,
/// or a single complex f64.
pub trait WasmSimdArrayMut<T: WasmSimdNum>: WasmSimdArray<T> + DerefMut {
    /// Store all complex numbers from a WASM SIMD vector to the array.
    unsafe fn store_complex(&mut self, vector: T::VectorType, index: usize);
    /// Store the low complex number from a WASM SIMD vector to the array.
    unsafe fn store_partial_lo_complex(&mut self, vector: T::VectorType, index: usize);
    /// Store the high complex number from a WASM SIMD vector to the array.
    unsafe fn store_partial_hi_complex(&mut self, vector: T::VectorType, index: usize);
}

impl<const N: usize> WasmSimdArrayMut<f32> for &mut [Complex<f32>; N] {
    #[inline(always)]
    unsafe fn store_complex(&mut self, vector: <f32 as WasmSimdNum>::VectorType, index: usize) {
        debug_assert!(self.len() >= index + <f32 as WasmSimdNum>::COMPLEX_PER_VECTOR);
        v128_store(self.as_mut_ptr().add(index) as *mut v128, vector);
    }

    #[inline(always)]
    unsafe fn store_partial_hi_complex(
        &mut self,
        vector: <f32 as WasmSimdNum>::VectorType,
        index: usize,
    ) {
        debug_assert!(self.len() >= index + 1);
        v128_store64_lane::<1>(vector, self.as_mut_ptr().add(index) as *mut u64);
    }

    #[inline(always)]
    unsafe fn store_partial_lo_complex(
        &mut self,
        vector: <f32 as WasmSimdNum>::VectorType,
        index: usize,
    ) {
        debug_assert!(self.len() >= index + 1);
        v128_store64_lane::<0>(vector, self.as_mut_ptr().add(index) as *mut u64);
    }
}

/// Utility functions to rotate complex numbers by 90 degrees
pub struct Rotate90F32 {
    sign_hi: v128,
    sign_both: v128,
}

impl Rotate90F32 {
    pub fn new(positive: bool) -> Self {
        let sign_hi = if positive {
            f32x4(0.0, 0.0, -0.0, 0.0)
        } else {
            f32x4(0.0, 0.0, 0.0, -0.0)
        };
        let sign_both = if positive {
            f32x4(-0.0, 0.0, -0.0, 0.0)
        } else {
            f32x4(0.0, -0.0, 0.0, -0.0)
        };
        Self { sign_hi, sign_both }
    }

    #[inline(always)]
    pub fn rotate_hi(&self, values: v128) -> v128 {
        v128_xor(u32x4_shuffle::<0, 1, 3, 2>(values, values), self.sign_hi)
    }

    #[inline(always)]
    pub unsafe fn rotate_both(&self, values: v128) -> v128 {
        v128_xor(u32x4_shuffle::<1, 0, 3, 2>(values, values), self.sign_both)
    }
}

/// Pack low (1st) complex
/// left: l1.re, l1.im, l2.re, l2.im
/// right: r1.re, r1.im, r2.re, r2.im
/// --> l1.re, l1.im, r1.re, r1.im
#[inline(always)]
pub fn extract_lo_lo_f32(left: v128, right: v128) -> v128 {
    u32x4_shuffle::<0, 1, 4, 5>(left, right)
}

/// Pack high (2nd) complex
/// left: l1.re, l1.im, l2.re, l2.im
/// right: r1.re, r1.im, r2.re, r2.im
/// --> l2.re, l2.im, r2.re, r2.im
#[inline(always)]
pub fn extract_hi_hi_f32(left: v128, right: v128) -> v128 {
    u32x4_shuffle::<2, 3, 6, 7>(left, right)
}

/// Pack low (1st) and high (2nd) complex
/// left: l1.re, l1.im, l2.re, l2.im
/// right: r1.re, r1.im, r2.re, r2.im
/// --> l1.re, l1.im, r2.re, r2.im
#[inline(always)]
pub fn extract_lo_hi_f32(left: v128, right: v128) -> v128 {
    u32x4_shuffle::<0, 1, 6, 7>(left, right)
}

/// Pack high (2nd) and low (1st) complex
/// left: r1.re, r1.im, r2.re, r2.im
/// right: l1.re, l1.im, l2.re, l2.im
/// --> r2.re, r2.im, l1.re, l1.im
#[inline(always)]
pub fn extract_hi_lo_f32(left: v128, right: v128) -> v128 {
    u32x4_shuffle::<2, 3, 4, 5>(left, right)
}

/// Reverse complex
/// values: a.re, a.im, b.re, b.im
/// --> b.re, b.im, a.re, a.im
#[inline(always)]
pub fn reverse_complex_elements_f32(values: v128) -> v128 {
    u64x2_shuffle::<1, 0>(values, values)
}

/// Reverse complex and then negate hi complex
/// values: a.re, a.im, b.re, b.im
/// --> b.re, b.im, -a.re, -a.im
#[inline(always)]
pub unsafe fn reverse_complex_and_negate_hi_f32(values: v128) -> v128 {
    v128_xor(
        u32x4_shuffle::<2, 3, 0, 1>(values, values),
        f32x4(0.0, 0.0, -0.0, -0.0),
    )
}

// Invert sign of high (2nd) complex
// values: a.re, a.im, b.re, b.im
// -->  a.re, a.im, -b.re, -b.im
//#[inline(always)]
//pub unsafe fn negate_hi_f32(values: float32x4_t) -> float32x4_t {
//    vcombine_f32(vget_low_f32(values), vneg_f32(vget_high_f32(values)))
//}

/// Duplicate low (1st) complex
/// values: a.re, a.im, b.re, b.im
/// --> a.re, a.im, a.re, a.im
#[inline(always)]
pub unsafe fn duplicate_lo_f32(values: v128) -> v128 {
    u64x2_shuffle::<0, 0>(values, values)
}

/// Duplicate high (2nd) complex
/// values: a.re, a.im, b.re, b.im
/// --> b.re, b.im, b.re, b.im
#[inline(always)]
pub unsafe fn duplicate_hi_f32(values: v128) -> v128 {
    u64x2_shuffle::<1, 1>(values, values)
}

/// transpose a 2x2 complex matrix given as [x0, x1], [x2, x3]
/// result is [x0, x2], [x1, x3]
#[inline(always)]
pub unsafe fn transpose_complex_2x2_f32(left: v128, right: v128) -> [v128; 2] {
    let temp02 = extract_lo_lo_f32(left, right);
    let temp13 = extract_hi_hi_f32(left, right);
    [temp02, temp13]
}

/// Complex multiplication.
/// Each input contains two complex values, which are multiplied in parallel.
#[inline(always)]
pub unsafe fn mul_complex_f32(left: v128, right: v128) -> v128 {
    let temp1 = u32x4_shuffle::<0, 4, 2, 6>(right, right);
    let temp2 = u32x4_shuffle::<1, 5, 3, 7>(right, f32x4_neg(right));
    let temp3 = f32x4_mul(temp2, left);
    let temp4 = u32x4_shuffle::<1, 0, 3, 2>(temp3, temp3);
    let temp5 = f32x4_mul(temp1, left);
    f32x4_add(temp4, temp5)
}

#[inline(always)]
pub unsafe fn splat_complex(num: &Complex<f32>) -> v128 {
    let tptr: *const Complex<f32> = num;
    v128_load64_splat(tptr as *const u64)
}
