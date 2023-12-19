#![feature(const_trait_impl)]
#![feature(const_mut_refs)]
#![feature(const_fn_floating_point_arithmetic)]
#![feature(iter_collect_into)]
#![feature(new_uninit)]

use wasm_bindgen::{prelude::*};
extern crate console_error_panic_hook;
use rayon::prelude::*;
pub use wasm_bindgen_rayon::init_thread_pool;
use itertools::{Itertools, izip};
use web_sys::console;
use std::{pin::Pin, convert::TryFrom};

mod const_twid;
mod tuples_exact;
mod wavegen;
mod gamma;
mod cmplx;
mod product_exact;
mod collect_into_arrayvec;
mod util;

use wavegen::{WaveGen, OceanProp, SIZE, FILTER_COUNT, WaveWindow, WaveGenOutput, FACTOR_COUNT, WaveBuffers};

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
            pos_out: Pin::new(Box::new([[0.0; PACKED_SIZE]; FILTER_COUNT])),
            partial_out: Pin::new(Box::new([[0.0; PACKED_SIZE]; FILTER_COUNT])),
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
pub fn main() {
    console_error_panic_hook::set_once();
}

#[wasm_bindgen]
pub fn gen_wavefield(depth: f32, wind_speed: f32, fetch: f32, damping: f32, swell: f32, windows: &[f32], output: &mut RetBuf) {
    let windows = <[f32; FILTER_COUNT]>::try_from(windows).unwrap();

    let wavefield = Box::new(WaveGen::new(depth, wind_speed, fetch, damping, swell, &windows));
    wavefield.precompute_spectra(&mut output.wavebuffers);
    output.field = Some(wavefield);
}

fn pack_result(fft_out: &[Box<[f32; SIZE]>; FACTOR_COUNT], pos_out: &mut [f32; PACKED_SIZE], partial_out: &mut [f32; PACKED_SIZE]) {
    izip!(
        fft_out[OceanProp::HEIGHT as usize].iter(), 
        fft_out[OceanProp::DX as usize].iter(), 
        fft_out[OceanProp::DY as usize].iter(), 
        fft_out[OceanProp::DXY as usize].iter())
        .flat_map(|(h, x, y, xy)| [x.clone(), y.clone(), h.clone(), xy.clone()])
        .zip_eq(pos_out.iter_mut())
        .for_each(|(res, elem)| *elem = res);

    izip!(
        fft_out[OceanProp::DXX as usize].iter(), 
        fft_out[OceanProp::DYY as usize].iter(),
        fft_out[OceanProp::DZX as usize].iter(), 
        fft_out[OceanProp::DZY as usize].iter())
        .flat_map(|(dxx, dyy, dzx, dzy)| [dxx.clone(), dyy.clone(), dzx.clone(), dzy.clone()])
        .zip_eq(partial_out.iter_mut())
        .for_each(|(res, elem)| *elem = res);
}

#[wasm_bindgen]
pub fn gen_and_paint_height_field(wavefield: &mut RetBuf, time: f32) {
    web_sys::console::time_with_label(&"height_field");

    let wavegen = wavefield.field.as_mut().unwrap();
    let wavebuffers = &mut wavefield.wavebuffers;
    let fft_out = &mut wavefield.fft_out;
    let pos_out = &mut *wavefield.pos_out;
    let partial_out = &mut *wavefield.partial_out;

    wavegen.step(time, wavebuffers, fft_out);

    fft_out
        .par_iter()
        .zip_eq(pos_out.par_iter_mut())
        .zip_eq(partial_out.par_iter_mut())
        .for_each(|((fft_slice, pos), partial)| 
            pack_result(fft_slice, pos, partial));

    // let normalize = |c: f32| ((c + 2.0) / 4.0 * 255.0).clamp(0.0, 255.0) as u8;
    // let pix_out: Vec<u8> = fft_out[0]
    //     .par_iter()
    //     .zip_eq(&*fft_out[1])
    //     .zip_eq(&*fft_out[2])
    //     .flat_map_iter(|((h, x), y)| [normalize(h.clone()), /* normalize(x.0), normalize(y.0) */ 0_u8, 0_u8, 255_u8])
    //     .collect();
    
    // let minmax = fft_out[1].as_slice().into_iter().map(|c| c.0).minmax().into_option().unwrap();
    // web_sys::console::log_2(&minmax.0.to_string().into(), &minmax.1.to_string().into());
    
    web_sys::console::time_end_with_label(&"height_field");

    // Clamped(pix_out)
    // ret
}
