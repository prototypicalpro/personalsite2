#![feature(new_uninit)]

extern crate console_error_panic_hook;

use wasm_bindgen::{prelude::*};
use itertools::Itertools;
use std::arch::wasm32::*;
use std::{pin::Pin, convert::TryFrom};

mod const_twid;
mod wavegen;
mod gamma;
pub mod simd;

use wavegen::{WaveGen, SIZE, FILTER_COUNT, WaveGenOutput, WaveBuffers, HALF_FACTOR_COUNT, HALF_SIZE};
use crate::simd::{WasmSimdNum};

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

const PACKED_SIZE: usize = SIZE*4;

#[wasm_bindgen]
pub struct RetBuf {
    #[wasm_bindgen(skip)]
    pub field: Option<Box<WaveGen>>,
    #[wasm_bindgen(skip)]
    pub wavebuffers: [WaveBuffers; FILTER_COUNT],
    #[wasm_bindgen(skip)]
    pub fft_out: WaveGenOutput,
    #[wasm_bindgen(skip)]
    pub pos_out: Pin<Box<[[f32; PACKED_SIZE]; FILTER_COUNT]>>,
    #[wasm_bindgen(skip)]
    pub partial_out: Pin<Box<[[f32; PACKED_SIZE]; FILTER_COUNT]>>
}

#[wasm_bindgen]
impl RetBuf {
    #[wasm_bindgen(constructor)]
    pub fn new() -> RetBuf {
        RetBuf{
            field: None,
            wavebuffers: WaveGen::make_wavebuffers(),
            fft_out: WaveGen::make_output_buffer(),
            pos_out: Pin::new(unsafe { Box::new_uninit().assume_init() }),
            partial_out: Pin::new(unsafe { Box::new_uninit().assume_init() }),
        }
    }

    pub fn get_pos_out_ptr(&self) -> *const f32 {
        self.pos_out.as_ptr() as *const f32
    }

    pub fn get_partial_out_ptr(&self) -> *const f32 {
        self.partial_out.as_ptr() as *const f32
    }
}

#[wasm_bindgen(start)]
pub fn main_fn() {
    console_error_panic_hook::set_once();
}

#[wasm_bindgen]
pub fn gen_wavefield(depth: f32, wind_speed: f32, fetch: f32, damping: f32, swell: f32, swell_off: f32, windows: &[f32], output: &mut RetBuf) {
    let windows = <[f32; FILTER_COUNT*2]>::try_from(windows).unwrap();

    let wavefield = Box::new(WaveGen::new(depth, wind_speed, fetch, damping, swell, swell_off, &windows));
    wavefield.precompute_spectra(&mut output.wavebuffers);
    output.field = Some(wavefield);
}

fn pack_result(fft_out: &[Box<[f32; HALF_SIZE*f32::COMPLEX_PER_VECTOR*2]>; HALF_FACTOR_COUNT], pos_out: &mut [f32; PACKED_SIZE], partial_out: &mut [f32; PACKED_SIZE]) {
    for i in (0..SIZE).step_by(2) {
        unsafe {
            let dxdy = v128_load(fft_out[0].as_ptr().add(i*2) as *const v128); // let (dx0, dx1, dy0, dy1)
            let hdxy = v128_load(fft_out[1].as_ptr().add(i*2) as *const v128); // let (h0, h1, dxy0, dxy1)

            let lhs = u32x4_shuffle::<0, 2, 4, 6>(dxdy, hdxy);
            let rhs = u32x4_shuffle::<1, 3, 5, 7>(dxdy, hdxy);

            v128_store(pos_out.as_mut_ptr().add(i*4) as *mut v128, lhs);
            v128_store(pos_out.as_mut_ptr().add(i*4 + 4) as *mut v128, rhs);
        }
    }

    for i in (0..SIZE).step_by(2) {
        unsafe {
            let dxxdyy = v128_load(fft_out[2].as_ptr().add(i*2) as *const v128); // let (dx0, dx1, dy0, dy1)
            let dzxdzy = v128_load(fft_out[3].as_ptr().add(i*2) as *const v128); // let (h0, h1, dxy0, dxy1)

            let lhs = u32x4_shuffle::<0, 2, 4, 6>(dxxdyy, dzxdzy);
            let rhs = u32x4_shuffle::<1, 3, 5, 7>(dxxdyy, dzxdzy);

            v128_store(partial_out.as_mut_ptr().add(i*4) as *mut v128, lhs);
            v128_store(partial_out.as_mut_ptr().add(i*4 + 4) as *mut v128, rhs);
        }
    }
}

#[wasm_bindgen]
pub fn gen_and_paint_height_field(time: f32, wavefield: &mut RetBuf) {
    web_sys::console::time_with_label(&"height_field");

    let wavegen = wavefield.field.as_mut().unwrap();
    let wavebuffers = &mut wavefield.wavebuffers;
    let fft_out = &mut wavefield.fft_out;
    let pos_out = &mut *wavefield.pos_out;
    let partial_out = &mut *wavefield.partial_out;

    wavegen.step(time, wavebuffers, fft_out);

    fft_out.iter()
        .zip_eq(pos_out.iter_mut())
        .zip_eq(partial_out.iter_mut())
        .for_each(|((fft_slice, pos), partial)| 
            pack_result(fft_slice, pos, partial));
    
    web_sys::console::time_end_with_label(&"height_field");
}
