use core::f32::consts::{PI, TAU};
use alloc::boxed::Box;

#[cfg(not(target_os = "none"))]
use core::arch::wasm32::*;

use itertools::Itertools;
use rand::prelude::*;
use rand_distr::{Normal, Uniform, num_traits::Zero};
use num_complex::Complex32;
use num_traits::Float;
use strided::{Stride, Strided};
use aligned_array::{Aligned, A16};

use crate::{gamma, const_twid};
use crate::cmplx::*;
use crate::simd::{WasmSimdNum, WasmSimdArray, WasmSimdArrayMut, mul_complex_f32, splat_complex};

const GRAVITY: f32 = 9.807;
pub const FILTER_COUNT: usize = 2;
pub const FACTOR_COUNT: usize = 8;
pub const HALF_FACTOR_COUNT: usize = FACTOR_COUNT / 2;

#[derive(Debug, Clone, Default, Copy)]
pub struct WavePoint {
    pos_spec: Complex32,
    neg_spec: Complex32,
    omega: f32
}

#[derive(Debug, Clone)]
pub struct WaveWindow {
    edge0: f32,
    edge1: f32,
    edge2: f32,
    edge3: f32,
    min: f32,
    invert: bool,
    dk: f32,
}

impl Default for WaveWindow {
    fn default() -> Self {
        WaveWindow { edge0: 0., edge1: 0., edge2: 1000000.0, edge3: 1000000.0, min: 0., invert: false, dk: 0.0 }
    }
}

impl WaveWindow {
    pub fn new_sharp(small_wave_length: f32, big_wave_length: f32) -> WaveWindow {
        Self::new(small_wave_length, big_wave_length, 0.0, 0.0, false)
    }

    pub fn new(small_wave_length: f32, big_wave_length: f32, soft_width: f32, min: f32, invert: bool) -> WaveWindow {
        WaveWindow {
            edge0: small_wave_length - soft_width,
            edge1: small_wave_length,
            edge2: big_wave_length,
            edge3: big_wave_length + soft_width,
            min: min,
            invert: invert,
            dk: TAU / (big_wave_length + soft_width)
        }
    }
    
    fn smoothstep(edge0: f32, edge1: f32, num: f32) -> f32 {
        if num <= edge0 {
            return 0.0;
        } else if num >= edge1 {
            return 1.0;
        } else {
            let t = (num - edge0) / (edge1 - edge0);
            return t*t*(3.0 - (t*2.0));
        }
    }

    pub fn run(&self, k_mag: f32) -> f32 {
        let wavelength: f32 =  TAU / k_mag;
        let stepped = Self::smoothstep(self.edge0, self.edge1, wavelength) - 
            Self::smoothstep(self.edge2, self.edge3, wavelength);
        let clamped = (self.min + (1.0 - self.min)*stepped).clamp(0.0, 1.0);
        
        if self.invert { 1.0 - clamped } else { clamped }
    }

    pub fn get_domain(&self) -> f32 {
        self.edge3
    }

    pub fn get_dk(&self) -> f32 {
        self.dk
    }
}

#[derive(Debug, Clone)]
pub struct WaveBuffers<const N: usize>
    where [(); (N/2 + 1)*N]: {
    static_spectra: Box<Aligned<A16, [WavePoint; (N/2 + 1)*N]>>,
    timevaried_spectra: Box<Aligned<A16, [Complex32; (N/2 + 1)*N]>>,
    factors: [Box<Aligned<A16, [[Complex32; 2]; (N/2 + 1)*N]>>; HALF_FACTOR_COUNT],
}

impl<const N: usize> Default for WaveBuffers<N> 
    where [(); (N/2 + 1)*N]: {
    fn default() -> Self {
        unsafe {
            WaveBuffers { 
                static_spectra: Box::new_uninit().assume_init(),
                timevaried_spectra: Box::new_uninit().assume_init(),
                factors: [(); HALF_FACTOR_COUNT].map(|_| Box::new_uninit().assume_init()),
            }
        }
    }
}

#[derive(Debug, Clone)]
pub struct WaveGen<const N: usize> {
    capillary_depth: f32,
    jonswap_alpha: f32,
    jonswap_gamma: f32,
    omega_p: f32,
    tma_gain: f32,
    hassleman_raisefactor: f32,
    horvath_swell: f32,
    rotation_matrix: (f32, f32),
    filters: [WaveWindow; FILTER_COUNT]
}

pub enum OceanProp {
    DX = 0,
    DY = 1,
    HEIGHT = 2,
    DXY = 3,
    DXX = 4,
    DYY = 5,
    DZX = 6,
    DZY = 7
}

pub trait WaveGenTrait<const N: usize>
    where [(); (N/2 + 1)*N]: {
    type WaveGenOutput;

    fn make_output_buffer() -> Self::WaveGenOutput;
    fn step(&self, time: f32, wavebuffers: &mut [WaveBuffers<N>; FILTER_COUNT], output_buffer: &mut Self::WaveGenOutput);
}

impl<const N: usize> WaveGenTrait<N> for WaveGen<N>
    where [(); (N/2 + 1)*N*f32::COMPLEX_PER_VECTOR*2]: {
    type WaveGenOutput = [[Box<Aligned<A16, [f32; (N/2 + 1)*N*f32::COMPLEX_PER_VECTOR*2]>>; HALF_FACTOR_COUNT]; FILTER_COUNT];

    fn make_output_buffer() -> Self::WaveGenOutput {
        [(); FILTER_COUNT].map(|_| [(); HALF_FACTOR_COUNT].map(|_| unsafe { Box::new_uninit().assume_init() }))
    }

    fn step(&self, time: f32, wavebuffers: &mut [WaveBuffers<N>; FILTER_COUNT], output_buffer: &mut Self::WaveGenOutput) {
        wavebuffers
            .iter_mut()
            .zip_eq(output_buffer.iter_mut())
            .zip_eq(self.filters.iter())
            .for_each(|((wavebuf, outbuf), filter)|
                self.step_one(time, filter, wavebuf, outbuf));
    }
}

impl<const N: usize> WaveGen<N> 
    where [(); (N/2 + 1)*N]: {

    const HALF_SIZE: usize = (N/2 + 1)*N;
    
    /// Create a ocean wave simulation using some parameters
    /// 
    /// # Arguments
    /// 
    /// * `depth` - Ocean depth in meters
    /// * `wind_speed` - Wind speed 10 meters above water in m/s
    /// * `fetch` - Large number (~800000)
    /// * `damping` - Wave damping from 1-6 (start with 3.3)
    /// * `swell` - Wave swell from 0 - 1
    /// * `rad_offset` - canvas rotation in radians
    /// * `windows` - list of wavelength "windows" in meters that sub-FFTs should be performed
    pub fn new(depth: f32, wind_speed: f32, fetch: f32, damping: f32, swell: f32, rad_offset: f32, windows: &[f32; FILTER_COUNT*2]) -> WaveGen<N> {
        let alpha = 0.076*(wind_speed.powi(2) / (GRAVITY*fetch)).abs().powf(0.22);
        let dimless_fetch = GRAVITY*fetch / wind_speed.powi(2);
        let omega_p = TAU*3.5*(GRAVITY / wind_speed)*dimless_fetch.powf(-0.33);
        let tma_gain = (depth / GRAVITY).sqrt();
        let hassleman_raise = -2.33 - 1.45*((wind_speed*omega_p) / GRAVITY - 1.17);
            
        WaveGen { 
            capillary_depth: depth, 
            jonswap_alpha: alpha, 
            jonswap_gamma: damping, 
            omega_p: omega_p, 
            tma_gain: tma_gain, 
            hassleman_raisefactor: hassleman_raise,
            horvath_swell: swell,
            rotation_matrix: (rad_offset.cos(), rad_offset.sin()),
            filters: [
                WaveWindow::new_sharp(windows[0], windows[1]),
                WaveWindow::new_sharp(windows[2], windows[3]),
            ]
        }
    }

    pub fn make_wavebuffers() -> [WaveBuffers<N>; FILTER_COUNT] {
        Default::default()
    }
 
    fn jonswap_power(&self, omega: f32) -> f32 {    
        let sigma: f32 = if omega <= self.omega_p { 0.07 } else { 0.09 };
        let r = (-((omega - self.omega_p) / (self.omega_p.powi(2)*sigma.powi(2))).powi(2) / 2.0).exp();
        (self.jonswap_alpha*GRAVITY.powi(2) / omega.powi(5))*(-1.25*(self.omega_p/omega).powi(4)).exp()*self.jonswap_gamma.powf(r)
    }

    fn tma_correct(&self, omega: f32) -> f32 {
        let omega_h = omega * self.tma_gain;
        0.5 + 0.5*(1.8*(omega_h - 1.125)).tanh()
    }

    fn hassleman_shape(&self, omega: f32) -> f32 {
        if omega <= self.omega_p {
            6.97*(omega / self.omega_p).powf(4.06)
        } else {
            9.77*(omega / self.omega_p).powf(self.hassleman_raisefactor)
        }
    }

    fn hassleman_direction(&self, omega: f32, theta: f32, swell_shape: f32) -> f32 {        
        let s = self.hassleman_shape(omega) + swell_shape;
        let normalization = ((2.0*s - 1.0).exp2() / PI)*(gamma::gamma(s + 1.0).powi(2) / gamma::gamma(2.0*s + 1.0));
        let norm_f32 = normalization as f32;
        norm_f32*(0.5*theta).cos().abs().powf(2.0*(s as f32))
    }

    fn horvath_swell_shape(&self, omega: f32) -> f32 {
        16.*(self.omega_p / omega).tanh()*self.horvath_swell.powi(2)
    }

    fn capilary_dispersion(&self, k_mag: f32) -> (f32, f32) {
        // translated from https://github.com/blackencino/EncinoWaves/blob/b7db46962e8405e2c7fb91b3eb7fda03d78489d4/src/EncinoWaves/Dispersion.h#L157-L168

        const SIGMA_OVER_RHO: f32 = 0.074 / 1000.0;
        let hk = self.capillary_depth*k_mag;
        let k2s = k_mag.powi(2)*SIGMA_OVER_RHO;
        let gpk2s = GRAVITY + k2s;
        let omega = (k_mag*gpk2s*hk.tanh()).abs().sqrt();
    
        let number = (gpk2s + k2s + k2s)*hk.tanh() + hk*gpk2s/hk.cosh().powi(2);
        let domega_dk = number.abs() / (2.0*omega);
    
        (omega, domega_dk)
    }

    fn get_rand_power_angle(rng: &mut SmallRng) -> (f32, f32, f32, f32) {
        let norm = Normal::new(0.0_f32, 1.0_f32).unwrap();
        let distr = Uniform::new(0.0_f32, TAU);

        (norm.sample(rng), norm.sample(rng), distr.sample(rng), distr.sample(rng))
    }

    fn compute_spectra_impl(&self, dk: f32, k_mag: f32, theta: (f32, f32), filter: f32, rng: &mut SmallRng) -> WavePoint {
        if k_mag == 0.0 || filter == 0.0 {
            return WavePoint {
                pos_spec: Complex32::new(0.0, 0.0),
                neg_spec: Complex32::new(0.0, 0.0),
                omega: if filter == 0.0 { 0.0 } else { self.capilary_dispersion(k_mag).0 }
            };
        }

        let (omega, domega_dk) = self.capilary_dispersion(k_mag);

        let change_term = dk.powi(2)*domega_dk / k_mag;
        
        let power_base = self.jonswap_power(omega)*self.tma_correct(omega)*change_term;
        let swell_shape = self.horvath_swell_shape(omega);
        let pos_dir = self.hassleman_direction(omega, theta.0, swell_shape);
        let pos_power = power_base*pos_dir;
        let neg_power = power_base*self.hassleman_direction(omega, theta.1, swell_shape);
    
        let rng_sample = Self::get_rand_power_angle(rng);
        let pos_amp = (2.0*pos_power).abs().sqrt()*rng_sample.0*filter;
        let neg_amp = (2.0*neg_power).abs().sqrt()*rng_sample.1*filter;
        let pos_cmplx = Complex32::from_polar(pos_amp, rng_sample.2);
        let neg_cmplx = Complex32::from_polar(neg_amp, rng_sample.3);

        WavePoint { pos_spec: pos_cmplx, neg_spec: neg_cmplx, omega: omega }
    }

    fn f32_minmax(f1: f32, f2: f32) -> (f32, f32) {
        if f1 < f2 {
            return (f1, f2);
        }
        (f2, f1)
    }

    fn hypot_approx(f1: f32, f2: f32) -> f32 {
        if f1.is_zero() || f2.is_zero() {
            return 0.
        }

        let (a, b) = Self::f32_minmax(f1.abs(), f2.abs());
        b + 0.428 * a * a / b
    }

    fn spectral_iterator(&self, domain: f32, use_approx: bool) -> impl ExactSizeIterator<Item=((f32, f32), f32, usize)> + '_ {
        (0..Self::HALF_SIZE)
            .into_iter()
            .map(move |i| {
                // NOTE: outputs are transposed
                let x = i / N;
                let y = i % N;
                let y_rev = if y <= N / 2 { y as isize } else { y as isize - N as isize };
                let ki = (x as f32) * TAU / domain;
                let kj = (y_rev as f32) * TAU / domain;
                let rki = ki*self.rotation_matrix.0 - kj*self.rotation_matrix.1;
                let rkj = ki*self.rotation_matrix.1 + kj*self.rotation_matrix.0;

                ((rki, rkj), if use_approx { Self::hypot_approx(rki, rkj) } else { rki.hypot(rkj) }, i)
            })
    }
    
    fn compute_spectra(&self, filter: &WaveWindow, rng: &mut SmallRng, buffer: &mut Box<Aligned<A16, [WavePoint; (N/2 + 1)*N]>>) {     
        let dk = filter.get_dk();   
        let domain = filter.get_domain();
        self.spectral_iterator(domain, false)
            .map(|((x, y), k_mag, _i)| (k_mag, ((-y).atan2(x), y.atan2(-x)), filter.run(k_mag)))
            .map(|(k_mag, theta, filter)| self.compute_spectra_impl(dk, k_mag, theta, filter, rng))
            .zip_eq(buffer.iter_mut())
            .for_each(|(res, elem)| *elem = res);
    }

    fn compute_timevaried(&self, time: f32, in_buffer: &Box<Aligned<A16, [WavePoint; (N/2 + 1)*N]>>, out_buffer: &mut Box<Aligned<A16, [Complex32; (N/2 + 1)*N]>>) {
        in_buffer
            .iter()
            .map(|w| {
                let omega_t = w.omega * time;
                let bkwd = Complex32::from_polar(1.0, omega_t);
                let fwd = bkwd.conj();
                
                w.pos_spec*fwd + w.neg_spec*bkwd
            })
            .zip_eq(out_buffer.iter_mut())
            .for_each(|(res, elem)| *elem = res);
    }

    fn get_factor_func(p: &OceanProp) -> fn(&Complex32, f32, f32, f32) -> Complex32 {
        match p {
            OceanProp::DX =>    |h, kx, _ky, k_mag| *h*Complex32::new(0.0, -kx/k_mag),
            OceanProp::DY =>    |h, _kx, ky, k_mag| *h*Complex32::new(0.0, -ky/k_mag),
            OceanProp::HEIGHT =>|h, _kx, _ky, _k_mag| h.clone(),
            OceanProp::DXY =>   |h, kx, ky, k_mag| -*h*Complex32::new(kx*ky/k_mag, 0.0),
            OceanProp::DXX =>   |h, kx, _ky, k_mag| -*h*Complex32::new(kx.powi(2)/k_mag, 0.0),
            OceanProp::DYY =>   |h, _kx, ky, k_mag| -*h*Complex32::new(ky.powi(2)/k_mag, 0.0),
            OceanProp::DZX =>   |h, kx, _ky, _k_mag| *h*Complex32::new(0.0, kx),
            OceanProp::DZY =>   |h, _kx, ky, _k_mag| *h*Complex32::new(0.0, ky),
        }
    }

    fn compute_factors(&self, timevaried: &Box<Aligned<A16, [Complex32; (N/2 + 1)*N]>>, domain: f32, out_buffer: &mut [Box<Aligned<A16, [[Complex32; 2]; (N/2 + 1)*N]>>; HALF_FACTOR_COUNT]) {
        [[OceanProp::DX, OceanProp::DY], [OceanProp::HEIGHT, OceanProp::DXY], [OceanProp::DXX, OceanProp::DYY], [OceanProp::DZX, OceanProp::DZY]]
            .iter()
            .zip_eq(out_buffer)
            .for_each(|(p, buf)| {
                let mapfunc0 = Self::get_factor_func(&p[0]);
                let mapfunc1 = Self::get_factor_func(&p[1]);

                timevaried
                    .iter()
                    .zip_eq(self.spectral_iterator(domain, true))
                    .map(|(h, ((kx, ky), k_mag, _))| {
                        if k_mag != 0.0 
                        { 
                            [mapfunc0(&h, kx, ky, k_mag), mapfunc1(&h, kx, ky, k_mag)]
                        } else { 
                            [Complex32::zero(), Complex32::zero()]
                        }
                    })
                    .zip_eq(buf.iter_mut())
                    .for_each(|(res, elem)| *elem = res);
            });
    }

    #[cfg(not(target_os = "none"))]
    unsafe fn complex_to_packed_input_impl(left: &mut [Complex32; 2], rev_right: &mut [Complex32; 2], i: usize) {
        const REAL_CONJ: v128 = f32x4(-0., 0., -0., 0.);
        const CONJ: v128 = f32x4(0., -0., 0., -0.);

        let vl = left.load();
        let vr = rev_right.load();
        let twiddle = splat_complex(&const_twid::lookup_twiddle(i, N / 2));
        let vr_conj = v128_xor(vr, CONJ);
        let xe = f32x4_add(vl, vr_conj);
        let xo = f32x4_sub(vl, vr_conj);
        let xo_twid = mul_complex_f32(xo, twiddle);

        let xo_twid_conj = v128_xor(xo_twid, CONJ);
        let xo_twid_j = u32x4_shuffle::<1, 0, 3, 2>(xo_twid_conj, xo_twid_conj);
        let leftvec = f32x4_add(xe, xo_twid_j);
        left.store(leftvec);

        let right_conj = f32x4_sub(xe, xo_twid_j);
        let rightvec = v128_xor(right_conj, CONJ);
        rev_right.store(rightvec);

        // *left = xe + (-xo_twid.im, xo_twid.re) => (xe.re - xo_twid.im, xe.im + xo_twid.re)
        // *rev_right = (xe.re, -xe.im) + (xo_twid.im, xo_twid.re) => (xe.re + xo_twid.im, -xe.im + xo_twid.re)   
    }

    #[cfg(target_os = "none")]
    unsafe fn complex_to_packed_input_impl(left: &mut [Complex32; 2], rev_right: &mut [Complex32; 2], i: usize) {
        // Xe[k] = 0.5(X[k] + X*[N/2-k])
        // Xo[k] = 0.5(X[k] + X*[N/2-k]e^(j2pik/N))
        // Z[k] = Xe[k] + jXo[k]

        let twid = const_twid::lookup_twiddle(i, N / 2);
        let xe = [left[0] + rev_right[0].conj(), left[1] + rev_right[1].conj()];
        let xo = [left[0] - rev_right[0].conj(), left[1] - rev_right[1].conj()];
        let xo_twid = [xo[0]*twid, xo[1]*twid];
        let twid_r = twid.neg_real();
        let xer = [xe[0].conj(), xe[1].conj()]; // [rev_right[0] + left[0].conj(), rev_right[1] + left[1].conj()];
        let xor = [xo_twid[0].conj(), xo_twid[1].conj()]; // [xo[0].neg_real()*twid_r, xo[1].neg_real()*twid_r]; // [(rev_right[0] - left[0].conj())*twid_r, (rev_right[1] - left[1].conj())*twid_r];

        *left = [xe[0] + xo_twid[0].mul_j(), xe[1] + xo_twid[1].mul_j()];
        *rev_right = [xer[0] + xor[0].mul_j(), xer[1] + xor[1].mul_j()];
    }

    unsafe fn complex_to_packed_input(input: &mut [[Complex32; 2]]) {
        // first and last imaginary MUST be zero
        input[0][0].im = 0.0;
        input[0][1].im = 0.0;
      
        let (lhs, rhs) = input.split_at_mut_unchecked(input.len() / 2);
      
        for (i, (left, rev_right)) in lhs.iter_mut().zip(rhs.iter_mut().rev()).enumerate() {
           Self::complex_to_packed_input_impl(left, rev_right, i);
        }
      
        // center element
        input[input.len() / 2][0] = 2.0*input[input.len() / 2][0].conj();
        input[input.len() / 2][1] = 2.0*input[input.len() / 2][1].conj();
      
        // note: last element in each row is padding
        input[input.len() - 1] = [Complex32::new(0.0, 0.0); 2];
      
    }

    #[cfg(not(target_os = "none"))]
    unsafe fn fourpt_dft(input: Stride<[Complex32; 2]>, output: &mut [[Complex32; 2]]) {
        const CONJ: v128 = f32x4(0., -0., 0., -0.);

        let m0 = (&input[0]).load();
        let m2 = (&input[2]).load();
        let o0 = f32x4_add(m0, m2);
        let o1 = f32x4_sub(m0, m2);

        let m1 = (&input[1]).load();
        let m3 = (&input[3]).load();
        let o2 = f32x4_add(m1, m3);
        let o3conj = v128_xor(f32x4_sub(m1, m3), CONJ);
        let o3_j = u32x4_shuffle::<1, 0, 3, 2>(o3conj, o3conj);
    
        output.get_unchecked_mut(0).store(f32x4_add(o0, o2));
        output.get_unchecked_mut(2).store(f32x4_sub(o0, o2));
        output.get_unchecked_mut(1).store(f32x4_add(o1, o3_j));
        output.get_unchecked_mut(3).store(f32x4_sub(o1, o3_j));

        // output[0] = m[0] + m[1] + m[2] + m[3];
        // output[1] = m[0] + m1_j - m[2] - m3_j;
        // output[2] = m[0] - m[1] + m[2] - m[3];
        // output[3] = m[0] - m1_j - m[2] + m3_j;
    }

    #[cfg(target_os = "none")]
    unsafe fn fourpt_dft(input: Stride<[Complex32; 2]>, output: &mut [[Complex32; 2]]) {
        let m0 = input[0];
        let m1 = input[1];
        let m2 = input[2];
        let m3 = input[3];

        *output.get_unchecked_mut(0) = [m0[0] + m1[0] + m2[0] + m3[0], m0[1] + m1[1] + m2[1] + m3[1]];
        *output.get_unchecked_mut(1) = [m0[0] + m1[0].mul_j() - m2[0] - m3[0].mul_j(), m0[1] + m1[1].mul_j() - m2[1] - m3[1].mul_j()];
        *output.get_unchecked_mut(2) = [m0[0] - m1[0] + m2[0] - m3[0], m0[1] - m1[1] + m2[1] - m3[1]];
        *output.get_unchecked_mut(3) = [m0[0] - m1[0].mul_j() - m2[0] + m3[0].mul_j(), m0[1] - m1[1].mul_j() - m2[1] + m3[1].mul_j()];

        // output[0] = m[0] + m[1] + m[2] + m[3];
        // output[1] = m[0] + m1_j - m[2] - m3_j;
        // output[2] = m[0] - m[1] + m[2] - m[3];
        // output[3] = m[0] - m1_j - m[2] + m3_j;
    }

    #[cfg(not(target_os = "none"))]
    unsafe fn combine_fft(even: &mut [Complex32; 2], odd: &mut [Complex32; 2], i: usize, half_n: usize) {
        let twiddle = splat_complex(&const_twid::lookup_twiddle(i, half_n));
        let o = odd.load();
        let odd_twiddle = mul_complex_f32(o, twiddle);

        let e = even.load();
        even.store(f32x4_add(e, odd_twiddle));
        odd.store(f32x4_sub(e,  odd_twiddle));
    }

    #[cfg(target_os = "none")]
    unsafe fn combine_fft(even: &mut [Complex32; 2], odd: &mut [Complex32; 2], i: usize, half_n: usize) {
        let twiddle = const_twid::lookup_twiddle(i, half_n);
        let odd_twiddle = [odd[0] * twiddle, odd[1] * twiddle];
        let even_c = even.clone();

        *even = [even_c[0] + odd_twiddle[0], even_c[1] + odd_twiddle[1]];
        *odd = [even_c[0] - odd_twiddle[0], even_c[1] - odd_twiddle[1]];
    }

    /// Writes the forward DFT of `input` to `output`.
    unsafe fn fft_c2c_2x(input: Stride<[Complex32; 2]>, output: &mut [[Complex32; 2]]) {
        // break early for a four point butterfly
        if input.len() == 4 {
            Self::fourpt_dft(input, output);
            return;
        }

        // split the input into two arrays of alternating elements ("decimate in time")
        let (evens, odds) = input.substrides2();
        // break the output into two halves (front and back, not alternating)
        let (start, end) = output.split_at_mut_unchecked(input.len() / 2);
        let half_len = start.len();

        // recursively perform two FFTs on alternating elements of the input, writing the
        // results into the first and second half of the output array respectively.
        Self::fft_c2c_2x(evens, start);
        Self::fft_c2c_2x(odds, end);

        // combine the subFFTs with the relations:
        //   X_k       = E_k + exp(-2πki/N) * O_k
        //   X_{k+N/2} = E_k - exp(-2πki/N) * O_k
    
        // let twiddle = Complex32::from_polar(1.0, (-2.0 * std::f32::consts::PI / input.len() as f32));
        for (i, (even, odd)) in start.iter_mut().zip_eq(end.iter_mut()).enumerate() {
            Self::combine_fft(even, odd, i, half_len);
        }
    }

    fn transpose_rows_to_cols<T: Copy>(matrix: &[T; (N/2 + 1)*N], out: &mut [T; (N/2 + 1)*N]) {
        const BLOCK_SIZE: usize = 8;

        for i in (0..N / 2 + 1).step_by(BLOCK_SIZE) {
            for j in (0..N).step_by(BLOCK_SIZE) {
                // transpose the block beginning at [i,j]
                for r in i..core::cmp::min(i + BLOCK_SIZE, N / 2 + 1) {
                    for c in j..j + BLOCK_SIZE {
                        unsafe {
                            *out.get_unchecked_mut(r + c*(N / 2 + 1)) = matrix.get_unchecked(c + r*N).clone();
                        }
                    }
                }
            }
        }
    }

    fn compute_fft_2d_2x(input_unpacked: &mut Box<Aligned<A16, [[Complex32; 2]; (N/2 + 1)*N]>>, output_buffer: &mut Box<Aligned<A16, [f32; (N/2 + 1)*N*f32::COMPLEX_PER_VECTOR*2]>>) {
        // input_unpacked: N*(N/2+1) (transposed)
        // output_packed:  (N/2+1)*N

        let output_as_cmplx = unsafe { core::mem::transmute::<_, &mut [[Complex32; 2]; (N/2 + 1)*N]>(output_buffer.as_mut()) };

        // pass 1: N/2+1 FFTs which move rows of N -> rows of N
        input_unpacked
            .chunks_exact(N)
            .zip_eq(output_as_cmplx.chunks_exact_mut(N))
            .for_each(|(input_row, output_row)|
                unsafe { Self::fft_c2c_2x(input_row.as_stride(), output_row) });

        // Transpose rows of N -> columns of N
        Self::transpose_rows_to_cols(output_as_cmplx, input_unpacked);

        // pass 2: N FFTs which move rows of N/2+1 -> rows of N real
        input_unpacked
            .chunks_exact_mut(N/2 + 1)
            .zip_eq(output_as_cmplx[0..(N/2 * N)].chunks_exact_mut(N/2))
            .for_each(|(input_row, output_row)| {
                unsafe {
                    // add conjugated signal to itself so F(i) = (x[0], x[1]), (x[2], x[3]) 
                    Self::complex_to_packed_input(input_row);
                    // drop last sample 257 -> 256
                    Self::fft_c2c_2x(input_row[0..input_row.len() - 1].as_stride(), output_row);
                }
            });
    }

    pub fn precompute_spectra(&self, rng: &mut SmallRng, wavebuffers: &mut [WaveBuffers<N>; FILTER_COUNT]) {
        self.filters
            .iter()
            .zip_eq(wavebuffers.iter_mut())
            .for_each(|(filter, wavebuf)| 
                self.compute_spectra(&filter, rng, &mut wavebuf.static_spectra))
    }

    fn step_one(&self, time: f32, filter: &WaveWindow, wavebuf: &mut WaveBuffers<N>, output_buffer: &mut [Box<Aligned<A16, [f32; (N/2 + 1)*N*f32::COMPLEX_PER_VECTOR*2]>>; HALF_FACTOR_COUNT]) {
        self.compute_timevaried(time, &wavebuf.static_spectra, &mut wavebuf.timevaried_spectra);
        self.compute_factors(&wavebuf.timevaried_spectra, filter.get_domain(), &mut wavebuf.factors);

        wavebuf.factors
            .iter_mut()
            .zip_eq(output_buffer.iter_mut())
            .for_each(|(fac, out)| 
                Self::compute_fft_2d_2x(fac, out));
    }
}
