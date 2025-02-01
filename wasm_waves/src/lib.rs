#![feature(generic_const_exprs)]
#![no_std]

extern crate alloc;

use core::arch::wasm32::*;
use core::{pin::Pin, convert::TryFrom};
use aligned_array::{Aligned, A16};
use alloc::boxed::Box;

use rand::SeedableRng;
use wasm_bindgen::prelude::*;
use itertools::Itertools;
use talc::*;
use spin::Mutex;
use rand::rngs::SmallRng;

mod panic_hook;
mod cmplx;
mod const_twid;
mod wavegen;
mod gamma;
pub mod simd;

use wavegen::{WaveBuffers, WaveGen, WaveGenTrait, FILTER_COUNT, HALF_FACTOR_COUNT};
use crate::simd::WasmSimdNum;

static mut ARENA: [u8; 20971520] = [0; 20971520]; // 20MB
#[global_allocator]
static ALLOCATOR: Talck<Mutex<()>, ClaimOnOom> = Talc::new(unsafe {
    // if we're in a hosted environment, the Rust runtime may allocate before
    // main() is called, so we need to initialize the arena automatically
    ClaimOnOom::new(Span::from_const_array(core::ptr::addr_of!(ARENA)))
}).lock();

struct WasmScratch<const N: usize>
    where [(); (N/2 + 1)*N]:,
    [(); (N/2 + 1)*N*f32::COMPLEX_PER_VECTOR*2]:,
    [(); N*N*4]: {

    pub field: Option<Box<WaveGen<N>>>,
    pub wavebuffers: [WaveBuffers<N>; FILTER_COUNT],
    pub fft_out: <WaveGen<N> as WaveGenTrait<N>>::WaveGenOutput,
    pub pos_out: Pin<Box<[[f32; N*N*4]; FILTER_COUNT]>>,
    pub partial_out: Pin<Box<[[f32; N*N*4]; FILTER_COUNT]>>
}

impl<const N: usize> WasmScratch<N>
    where [(); (N/2 + 1)*N]:,
    [(); (N/2 + 1)*N*f32::COMPLEX_PER_VECTOR*2]:,
    [(); N*N*4]: {
    pub fn new() -> WasmScratch<N> {
        WasmScratch {
            field: None,
            wavebuffers: WaveGen::make_wavebuffers(),
            fft_out: WaveGen::make_output_buffer(),
            pos_out: Pin::new(unsafe { Box::new_uninit().assume_init() }),
            partial_out: Pin::new(unsafe { Box::new_uninit().assume_init() }),
        }
    }
}

trait RetBufTrait<const N: usize>
    where [(); (N/2 + 1)*N]:,
    [(); (N/2 + 1)*N*f32::COMPLEX_PER_VECTOR*2]:,
    [(); N*N*4]: {

    fn scratch_mut(&mut self) -> (&mut WasmScratch<N>, &mut SmallRng);
    fn scratch(&self) -> &WasmScratch<N>;

    fn get_partial_out_ptr_base(&self) -> *const f32 {
        return self.scratch().partial_out.as_ptr() as *const f32;
    }

    fn get_pos_out_ptr_base(&self) -> *const f32 {
        return self.scratch().pos_out.as_ptr() as *const f32;
    }
}

#[wasm_bindgen]
pub struct RetBuf256 {
    scratch: WasmScratch<256>,
    rng: SmallRng
}

impl RetBufTrait<256> for RetBuf256 {
    fn scratch(&self) -> &WasmScratch<256> { &self.scratch }
    fn scratch_mut(&mut self) -> (&mut WasmScratch<256>, &mut SmallRng) { (&mut self.scratch, &mut self.rng) }
}

#[wasm_bindgen]
impl RetBuf256 {
    #[wasm_bindgen(constructor)]
    pub fn new(rand_seed: &[u8]) -> RetBuf256 {
        RetBuf256 {
            scratch: WasmScratch::new(),
            rng: SmallRng::from_seed(rand_seed.try_into().unwrap())
        }
    }

    pub fn get_pos_out_ptr(&self) -> *const f32 {
        self.get_pos_out_ptr_base()
    }

    pub fn get_partial_out_ptr(&self) -> *const f32 {
        self.get_partial_out_ptr_base()
    }
}

#[wasm_bindgen]
pub struct RetBuf128 {
    scratch: WasmScratch<128>,
    rng: rand::rngs::SmallRng,
}

impl RetBufTrait<128> for RetBuf128 {
    fn scratch(&self) -> &WasmScratch<128> { &self.scratch }
    fn scratch_mut(&mut self) -> (&mut WasmScratch<128>, &mut SmallRng) { (&mut self.scratch, &mut self.rng) }
}

#[wasm_bindgen]
impl RetBuf128 {
    #[wasm_bindgen(constructor)]
    pub fn new(rand_seed: &[u8]) -> RetBuf128 {
        RetBuf128 {
            scratch: WasmScratch::new(),
            rng: SmallRng::from_seed(rand_seed.try_into().unwrap())
        }
    }

    pub fn get_pos_out_ptr(&self) -> *const f32 {
        self.get_pos_out_ptr_base()
    }

    pub fn get_partial_out_ptr(&self) -> *const f32 {
        self.get_partial_out_ptr_base()
    }
}

fn gen_wavefield_base<const N: usize> (depth: f32, wind_speed: f32, fetch: f32, damping: f32, swell: f32, swell_off: f32, windows: &[f32], rng: &mut SmallRng, output: &mut WasmScratch<N>) 
    where [(); (N/2 + 1)*N]:,
    [(); (N/2 + 1)*N*f32::COMPLEX_PER_VECTOR*2]:,
    [(); N*N*4]: {

    let windows = <[f32; FILTER_COUNT*2]>::try_from(windows).unwrap();

    let wavefield = Box::new(WaveGen::new(depth, wind_speed, fetch, damping, swell, swell_off, &windows));
    wavefield.precompute_spectra(rng, &mut output.wavebuffers);
    output.field = Some(wavefield);
}

#[wasm_bindgen]
pub fn gen_wavefield_128(depth: f32, wind_speed: f32, fetch: f32, damping: f32, swell: f32, swell_off: f32, windows: &[f32], output: &mut RetBuf128) {
    let (output, rng) = output.scratch_mut();
    gen_wavefield_base(depth, wind_speed, fetch, damping, swell, swell_off, windows, rng, output);
}

#[wasm_bindgen]
pub fn gen_wavefield_256(depth: f32, wind_speed: f32, fetch: f32, damping: f32, swell: f32, swell_off: f32, windows: &[f32], output: &mut RetBuf256) {
    let (output, rng) = output.scratch_mut();
    gen_wavefield_base(depth, wind_speed, fetch, damping, swell, swell_off, windows, rng, output);
}

fn pack_result<const N: usize>(fft_out: &[Box<Aligned<A16, [f32; (N/2 + 1)*N*f32::COMPLEX_PER_VECTOR*2]>>; HALF_FACTOR_COUNT], pos_out: &mut [f32; N*N*4], partial_out: &mut [f32; N*N*4]) {
    for i in (0..N*N).step_by(2) {
        unsafe {
            let dxdy = v128_load(fft_out[0].as_ptr().add(i*2) as *const v128); // let (dx0, dx1, dy0, dy1)
            let hdxy = v128_load(fft_out[1].as_ptr().add(i*2) as *const v128); // let (h0, h1, dxy0, dxy1)

            let lhs = u32x4_shuffle::<0, 2, 4, 6>(dxdy, hdxy);
            let rhs = u32x4_shuffle::<1, 3, 5, 7>(dxdy, hdxy);

            v128_store(pos_out.as_mut_ptr().add(i*4) as *mut v128, lhs);
            v128_store(pos_out.as_mut_ptr().add(i*4 + 4) as *mut v128, rhs);
        }
    }

    for i in (0..N*N).step_by(2) {
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

fn gen_and_paint_height_field_base<const N: usize>(time: f32, wavefield: &mut WasmScratch<N>) 
    where [(); (N/2 + 1)*N]:,
    [(); (N/2 + 1)*N*f32::COMPLEX_PER_VECTOR*2]:,
    [(); N*N*4]: {

    // web_sys::console::time_with_label(&"height_field");

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
    
    // web_sys::console::time_end_with_label(&"height_field");
}

#[wasm_bindgen]
pub fn gen_and_paint_height_field_256(time: f32, retbuf: &mut RetBuf256) {
    gen_and_paint_height_field_base(time, retbuf.scratch_mut().0);
}

#[wasm_bindgen]
pub fn gen_and_paint_height_field_128(time: f32, retbuf: &mut RetBuf128) {
    gen_and_paint_height_field_base(time, retbuf.scratch_mut().0);
}
