use core::{arch::wasm32::*, ops::DerefMut};
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
pub trait WasmSimdArray<T: WasmSimdNum> {
    /// Load complex numbers from the array to fill a WASM SIMD vector.
    unsafe fn load(&self) -> T::VectorType;
}

impl WasmSimdArray<f32> for [Complex<f32>; 2] {
    #[inline(always)]
    unsafe fn load(&self) -> <f32 as WasmSimdNum>::VectorType {
        *(self.as_ptr() as *const v128)
    }
}

/// A trait to handle writing to an array of complex floats from WASM SIMD vectors.
/// WASM works with 128-bit vectors, meaning a vector can hold two complex f32,
/// or a single complex f64.
pub trait WasmSimdArrayMut<T: WasmSimdNum>: DerefMut {
    /// Store all complex numbers from a WASM SIMD vector to the array.
    unsafe fn store(self, vector: T::VectorType);
}

impl WasmSimdArrayMut<f32> for &mut [Complex<f32>; 2] {
    #[inline(always)]
    unsafe fn store(self, vector: <f32 as WasmSimdNum>::VectorType) {
        v128_store(self.as_mut_ptr() as *mut v128, vector);
    }
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
