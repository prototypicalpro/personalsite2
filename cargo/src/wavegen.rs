use std::{f32::consts::{PI, TAU}, mem::align_of, mem::size_of};
use itertools::{Itertools};
use rand::prelude::*;
use rayon::{prelude::*};
use rand_distr::{Normal, Uniform, num_traits::Zero};
use rayon::iter::{IntoParallelIterator};
use arrayvec::ArrayVec;
use num_complex::Complex32;
use strided::{Stride, MutStride, Strided, MutStrided};
use crate::{gamma, const_twid};

const GRAVITY: f32 = 9.807;
pub const WIDTH: usize = 256;
const HALF_WIDTH: usize = WIDTH/2 + 1;
const HALF_SIZE: usize = HALF_WIDTH*WIDTH;
pub const SIZE: usize = WIDTH*WIDTH;
pub const FILTER_COUNT: usize = 3;
pub const FACTOR_COUNT: usize = 8;

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
pub struct WaveBuffers {
    static_spectra: Box<[WavePoint; HALF_SIZE]>,
    timevaried_spectra: Box<[Complex32; HALF_SIZE]>,
    factors: [Box<[Complex32; HALF_SIZE]>; 8],
    fft_scratch: [Box<[Complex32; HALF_SIZE]>; 8],
}

impl Default for WaveBuffers {
    fn default() -> Self {
        WaveBuffers { 
            static_spectra: Box::new([Default::default(); HALF_SIZE]),
            timevaried_spectra: Box::new([Default::default(); HALF_SIZE]),
            factors: [(); FACTOR_COUNT].map(|_| Box::new([Default::default(); HALF_SIZE])),
            fft_scratch: [(); FACTOR_COUNT].map(|_| Box::new([Default::default(); HALF_SIZE])),
        }
    }
}

#[derive(Debug, Clone)]
pub struct WaveGen {
    capillary_depth: f32,
    jonswap_alpha: f32,
    jonswap_gamma: f32,
    omega_p: f32,
    tma_gain: f32,
    hassleman_raisefactor: f32,
    horvath_swell: f32,
    filters: [WaveWindow; FILTER_COUNT],
    rand_seed: u64
}

pub enum OceanProp {
    HEIGHT = 0,
    DX = 1,
    DY = 2,
    DXY = 3,
    DXX = 4,
    DYY = 5,
    DZX = 6,
    DZY = 7
}

pub type WaveGenOutput = [[Box<[f32; SIZE]>; FACTOR_COUNT]; FILTER_COUNT];

impl WaveGen {
    /// Create a ocean wave simulation using some parameters
    /// 
    /// # Arguments
    /// 
    /// * `depth` - Ocean depth in meters
    /// * `wind_speed` - Wind speed 10 meters above water in m/s
    /// * `fetch` - Large number (~800000)
    /// * `damping` - Wave damping from 1-6 (start with 3.3)
    /// * `swell` - Wave swell from 0 - 1
    pub fn new(depth: f32, wind_speed: f32, fetch: f32, damping: f32, swell: f32, windows: &[f32; FILTER_COUNT*2]) -> WaveGen {
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
            filters: [
                WaveWindow::new_sharp(windows[0], windows[1]),
                WaveWindow::new_sharp(windows[2], windows[3]),
                WaveWindow::new_sharp(windows[4], windows[5])
            ],
            rand_seed: thread_rng().next_u64(),
        }
    }

    pub fn domain(&self) -> f32 {
        self.filters.last().unwrap().get_domain()
    }

    pub fn make_output_buffer() -> WaveGenOutput {
        [(); FILTER_COUNT].map(|_| [(); FACTOR_COUNT].map(|_| Box::new([0.0; SIZE])))
    }

    pub fn make_wavebuffers() -> [WaveBuffers; FILTER_COUNT] {
        Default::default()
    }
 
    fn jonswap_power(&self, omega: f32) -> f32 {
        // TODO: should gamma be random?
    
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
        // TODO: better approx that doesn't clip f32 with gamma func
        
        let s = self.hassleman_shape(omega) + swell_shape;
        // assert!(s.is_finite(), "s = {}", s);
        let normalization = ((2.0*s - 1.0).exp2() / PI)*(gamma::gamma(s + 1.0).powi(2) / gamma::gamma(2.0*s + 1.0));
        let norm_f32 = normalization as f32;
        // assert!(norm_f32.is_finite(), "omega = {}, omega_p = {}, swell = {}, norm = {}, s = {}", omega, self.omega_p, swell_shape, normalization, s);
        let ret = norm_f32*(0.5*theta).cos().abs().powf(2.0*(s as f32));
        // assert!(ret.is_finite(), "ret = {}, norm = {}, s = {}", ret, normalization, s);
        ret
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

    fn get_deterministic_rng(&self, i: usize, k_mag: f32) -> (f32, f32, f32, f32) {
        let norm = Normal::new(0.0_f32, 1.0_f32).unwrap();
        let distr = Uniform::new(0.0_f32, TAU);
        // TODO: this is slow, fix it
        // let seed = self.rand_seed.wrapping_add(i as u64).wrapping_add(k_mag.to_bits() as u64);
        // let mut rng = rand::rngs::SmallRng::seed_from_u64(self.rand_seed + (i as u64));
        let mut rng = thread_rng();
        
        (norm.sample(&mut rng), norm.sample(&mut rng), distr.sample(&mut rng), distr.sample(&mut rng))
    }

    fn compute_spectra_impl(&self, dk: f32, k_mag: f32, theta: (f32, f32), filter: f32, i: usize) -> WavePoint {
        if k_mag == 0.0 || filter == 0.0 {
            return WavePoint {
                pos_spec: Complex32::new(0.0, 0.0),
                neg_spec: Complex32::new(0.0, 0.0),
                omega: if filter == 0.0 { 0.0 } else { self.capilary_dispersion(k_mag).0 }
            };
        }

        let (omega, domega_dk) = self.capilary_dispersion(k_mag);
        assert!(omega >= 0.0 && omega.is_finite());
        assert!(domega_dk >= 0.0 && domega_dk.is_finite());

        let change_term = dk.powi(2)*domega_dk / k_mag;
        
        let power_base = self.jonswap_power(omega)*self.tma_correct(omega)*change_term;
        assert!(power_base.is_finite());
        let swell_shape = self.horvath_swell_shape(omega);
        assert!(swell_shape.is_finite());
        let pos_dir = self.hassleman_direction(omega, theta.0, swell_shape);
        let pos_power = power_base*pos_dir;
        let neg_power = power_base*self.hassleman_direction(omega, theta.1, swell_shape);
        assert!(pos_power.is_finite() && neg_power.is_finite(), 
            "power_base = {}, pos_power = {}, neg_power = {}, swell_shape = {}, omega = {}, dir = {}", 
            power_base, pos_power, neg_power, swell_shape, omega, pos_dir);
    
        let rng_sample = self.get_deterministic_rng(i, k_mag);
        let pos_amp = (2.0*pos_power).abs().sqrt()*rng_sample.0*filter;
        let neg_amp = (2.0*neg_power).abs().sqrt()*rng_sample.1*filter;
        let pos_cmplx = Complex32::from_polar(pos_amp, rng_sample.2);
        let neg_cmplx = Complex32::from_polar(neg_amp, rng_sample.3);

        WavePoint { pos_spec: pos_cmplx, neg_spec: neg_cmplx, omega: omega }
    }

    fn par_spectral_iterator(&self, domain: f32) -> impl rayon::iter::IndexedParallelIterator<Item = ((f32, f32), f32, usize)> + '_ {
        (0..HALF_SIZE)
            .into_par_iter()
            .map(move |i| {
                // NOTE: outputs are transposed
                let x = i / WIDTH;
                let y = i % WIDTH;
                let y_rev = if y <= WIDTH / 2 { y as isize } else { y as isize - WIDTH as isize };
                let ki = (x as f32) * TAU / domain;
                let kj = (y_rev as f32) * TAU / domain;
                ((ki, kj), ki.hypot(kj), i)
            })
    }
    
    fn compute_spectra(&self, filter: &WaveWindow, buffer: &mut Box<[WavePoint; HALF_SIZE]>) {     
        let dk = filter.get_dk();   
        let domain = filter.get_domain();
        self.par_spectral_iterator(domain)
            .map(|((x, y), k_mag, i)| (k_mag, ((-y).atan2(x), y.atan2(-x)), filter.run(k_mag), i))
            .map(|(k_mag, theta, filter, i)| self.compute_spectra_impl(dk, k_mag, theta, filter, i))
            .zip_eq(buffer.par_iter_mut())
            .for_each(|(res, elem)| *elem = res);
    }

    fn compute_timevaried(&self, time: f32, in_buffer: &Box<[WavePoint; HALF_SIZE]>, out_buffer: &mut Box<[Complex32; HALF_SIZE]>) {
        in_buffer
            .par_iter()
            // apply time variation
            .map(|w| {
                let omega_t = w.omega * time;
                let bkwd = Complex32::from_polar(1.0, omega_t);
                let fwd = bkwd.conj();
                
                w.pos_spec*fwd + w.neg_spec*bkwd
            })
            .zip_eq(out_buffer.par_iter_mut())
            .for_each(|(res, elem)| *elem = res);
    }

    fn compute_factors(&self, timevaried: &Box<[Complex32; HALF_SIZE]>, domain: f32, dk: f32, out_buffer: &mut [Box<[Complex32; HALF_SIZE]>; 8]) {
        [OceanProp::HEIGHT, OceanProp::DX, OceanProp::DY, OceanProp::DXY, OceanProp::DXX, OceanProp::DYY, OceanProp::DZX, OceanProp::DZY]
            .par_iter()
            .zip_eq(out_buffer)
            .for_each(|(p, buf)| {
                let mapfunc: fn((&Complex32, ((f32, f32), f32))) -> Complex32 = match p {
                    OceanProp::HEIGHT => |(h, _)| h.clone(),
                    OceanProp::DX =>    |(h, ((kx, _), k_mag))| *h*Complex32::new(0.0, -kx/k_mag),
                    OceanProp::DY =>    |(h, ((_, ky), k_mag))| *h*Complex32::new(0.0, -ky/k_mag),
                    OceanProp::DXY =>   |(h, ((kx, ky), k_mag))| -*h*Complex32::new(kx*ky/k_mag, 0.0),
                    OceanProp::DXX =>   |(h, ((kx, _), k_mag))| -*h*Complex32::new(kx.powi(2)/k_mag, 0.0),
                    OceanProp::DYY =>   |(h, ((_, ky), k_mag))| -*h*Complex32::new(ky.powi(2)/k_mag, 0.0),
                    OceanProp::DZX =>   |(h, ((kx, _), _))| *h*Complex32::new(0.0, kx),
                    OceanProp::DZY =>   |(h, ((_, ky), _))| *h*Complex32::new(0.0, ky),
                };

                timevaried
                    .par_iter()
                    .zip_eq(self.par_spectral_iterator(domain))
                    .map(|(h, ((kx, ky), k_mag, _))| 
                        if k_mag != 0.0 { mapfunc((&h, ((kx, ky), k_mag))) } else { Complex32::zero() })
                    .zip_eq(buf.par_iter_mut())
                    .for_each(|(res, elem)| *elem = res);
            });
    }

    fn complex_to_packed_input(input: &mut [Complex32]) {
        // Xe[k] = 0.5(X[k] + X*[N/2-k])
        // Xo[k] = 0.5(X[k] + X*[N/2-k]e^(j2pik/N))
        // Z[k] = Xe[k] + jXo[k]
      
        // first and last imaginary MUST be zero
        input[0].im = 0.0;
        // input[input.len() - 1].im = 0.0;
      
        let (lhs, rhs) = input.split_at_mut(input.len() / 2);
      
        for (i, (left, rev_right)) in lhs.iter_mut().zip(rhs.iter_mut().rev()).enumerate() {
          let twiddle = const_twid::lookup_twiddle(i, WIDTH / 2);
          // assert!((twiddle - Complex32::from_polar(1.0, std::f32::consts::TAU * (i as f32 / N as f32))).re < 0.0001);
          
          let sum = *left + *rev_right;
          let diff = *left - *rev_right;
      
          // Apply twiddle factors. Theoretically we'd have to load 2 separate twiddle factors here, one for the beginning
          // and one for the end. But the twiddle factor for the end is just the twiddle for the beginning, with the
          // real part negated. Since it's the same twiddle, we can factor out a ton of math ops and cut the number of
          // multiplications in half.
          let twiddled_re_sum = sum * twiddle.re;
          let twiddled_im_sum = sum * twiddle.im;
          let twiddled_re_diff = diff * twiddle.re;
          let twiddled_im_diff = diff * twiddle.im;
      
          let output_twiddled_real = twiddled_re_sum.im + twiddled_im_diff.re;
          let output_twiddled_im = twiddled_im_sum.im - twiddled_re_diff.re;
      
          // We finally have all the data we need to write our preprocessed data back where we got it from.
          *left = Complex32::new(
              sum.re - output_twiddled_real,
              diff.im - output_twiddled_im,
          );
          *rev_right = Complex32::new(
              sum.re + output_twiddled_real,
              -output_twiddled_im - diff.im,
          );
        }
      
        // center element
        input[input.len() / 2] = 2.0*input[input.len() / 2].conj();
      
        // note: last element in each row is padding
        input[input.len() - 1] = Complex32::new(0.0, 0.0);
      
    }

    /// Writes the forward DFT of `input` to `output`.
    fn fft_c2c(input: Stride<Complex32>, mut output: MutStride<Complex32>) {
        const J: Complex32 = Complex32::new(0.0, 1.0);
        // check it's a power of two.
        assert!(WIDTH / 2 == const_twid::TWIDDLE_LOOKUP.len());
        assert!(input.len() == output.len() && input.len().count_ones() == 1, "input_stride = {}, output_stride = {}", input.len(), output.len());
        // web_sys::console::log_1(&input.len().to_string().into());

        // break early for a four point butterfly
        // log_stride(&input_stride);
        if input.len() == 4 {
            let m: [Complex32; 4] = [input[0], input[1], input[2], input[3]];
        
            let (m1_j, m3_j) = (J*m[1], J*m[3]);
            output[0] = m[0] + m[1] + m[2] + m[3];
            output[1] = m[0] + m1_j - m[2] - m3_j;
            output[2] = m[0] - m[1] + m[2] - m[3];
            output[3] = m[0] - m1_j - m[2] + m3_j;
            return;
        }

        // split the input into two arrays of alternating elements ("decimate in time")
        let (evens, odds) = input.substrides2();
        // break the output into two halves (front and back, not alternating)
        let (mut start, mut end) = output.split_at_mut(input.len() / 2);
        let half_len = start.len();

        // recursively perform two FFTs on alternating elements of the input, writing the
        // results into the first and second half of the output array respectively.
        Self::fft_c2c(evens, start.reborrow());
        Self::fft_c2c(odds, end.reborrow());

        // combine the subFFTs with the relations:
        //   X_k       = E_k + exp(-2πki/N) * O_k
        //   X_{k+N/2} = E_k - exp(-2πki/N) * O_k
    
        // let twiddle = Complex32::from_polar(1.0, (-2.0 * std::f32::consts::PI / input.len() as f32));
        // let mut factor = Complex32::new(1., 0.);
        for (i, (even, odd)) in start.iter_mut().zip_eq(end.iter_mut()).enumerate() {
            let twiddle = const_twid::lookup_twiddle(i, half_len);
            // assert!((Complex32::from_polar(1.0, std::f32::consts::TAU * (i as f32 / input.len() as f32)) - twiddle).re < 0.0001);
            let e = *even;
            let o = *odd;
            let odd_twiddle = o*twiddle;
    
            *even = e + odd_twiddle;
            *odd = e - odd_twiddle;
        }
    }

    fn compute_fft_2d(input_unpacked: &Box<[Complex32; HALF_SIZE]>, scratch_buffer: &mut Box<[Complex32; HALF_SIZE]>, output_buffer: &mut Box<[f32; SIZE]>) {
         // input_unpacked: N*(N/2+1) (transposed)
        // output_packed:  (N/2+1)*N
        assert!(align_of::<Complex32>() == 4);
        assert!(size_of::<Complex32>() == 8);

        {
            let mut output_strides: ArrayVec<_, WIDTH> = scratch_buffer
                .as_stride_mut()
                .substrides_mut(HALF_WIDTH)
                .collect();

            // pass 1: N/2+1 FFTs which move rows of N -> columns of N
            input_unpacked
                .par_chunks_exact(WIDTH)
                .zip_eq(output_strides.par_iter_mut())
                .for_each(|(input_row, output_col)|
                    Self::fft_c2c(input_row.as_stride(), output_col.reborrow()));
        }

        // pass 2: N DFTS which move rows of N/2+1 -> rows of N real
        let (_, output_as_cmplx, _) = unsafe { output_buffer.align_to_mut::<Complex32>() };
        assert!(output_as_cmplx.len() == SIZE/2);

        {   
            scratch_buffer
                .par_chunks_exact_mut(HALF_WIDTH)
                .zip_eq(output_as_cmplx.par_chunks_exact_mut(WIDTH/2))
                .for_each(|(input_row, output_col)| {
                    // pack complex into N/2 DFT
                    Self::complex_to_packed_input(input_row);
                    // drop last sample 257 -> 256
                    Self::fft_c2c(input_row[0..input_row.len() - 1].as_stride(), output_col.as_stride_mut());
                });
        }
    }

    pub fn precompute_spectra(&self, wavebuffers: &mut [WaveBuffers; FILTER_COUNT]) {
        self.filters
            .par_iter()
            .zip_eq(wavebuffers.par_iter_mut())
            .for_each(|(filter, wavebuf)| 
                self.compute_spectra(&filter, &mut wavebuf.static_spectra))
    }

    fn step_one(&self, time: f32, filter: &WaveWindow, wavebuf: &mut WaveBuffers, output_buffer: &mut [Box<[f32; SIZE]>; FACTOR_COUNT]) {
        self.compute_timevaried(time, &wavebuf.static_spectra, &mut wavebuf.timevaried_spectra);
        self.compute_factors(&wavebuf.timevaried_spectra, filter.get_domain(), filter.get_dk(), &mut wavebuf.factors);
        wavebuf.factors
            .par_iter()
            .zip_eq(wavebuf.fft_scratch.par_iter_mut())
            .zip_eq(output_buffer.par_iter_mut())
            .for_each(|((fac, scratch), out)| 
                Self::compute_fft_2d(&fac, scratch, out));
    }

    pub fn step(&self, time: f32, wavebuffers: &mut [WaveBuffers; FILTER_COUNT], output_buffer: &mut WaveGenOutput) {
        wavebuffers
            .par_iter_mut()
            .zip_eq(output_buffer.par_iter_mut())
            .zip_eq(self.filters.par_iter())
            .for_each(|((wavebuf, outbuf), filter)|
                self.step_one(time, filter, wavebuf, outbuf));
    }
}
