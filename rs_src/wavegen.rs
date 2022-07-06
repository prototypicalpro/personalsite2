use std::{f32::consts::{PI, TAU}};
use itertools::{Itertools, Product};
use rand::prelude::*;
use rayon::{prelude::*, iter::repeat};
use rand_distr::{Normal, Uniform};
use rayon::iter::{ParallelBridge, IntoParallelIterator};
use arrayvec::ArrayVec;
use crate::{gamma, collect_into_arrayvec::ParCollectArrayVec};
use crate::cmplx::Complex;
use crate::product_exact::ProductExactIteratorTrait;

const GRAVITY: f32 = 9.807;

#[derive(Debug, Clone)]
pub struct WavePoint {
    pos_spec: Complex,
    neg_spec: Complex,
    omega: f32
}

#[derive(Debug, Clone, Default)]
pub struct WaveGen {
    points: usize,
    domain: f32,
    dk: f32,
    capillary_depth: f32,
    jonswap_alpha: f32,
    jonswap_gamma: f32,
    omega_p: f32,
    tma_gain: f32,
    hassleman_raisefactor: f32,
    horvath_swell: f32,
}

enum OceanProp {
    HEIGHT,
    DX,
    DY
}

impl WaveGen {
    /// Create a ocean wave simulation using some parameters
    /// 
    /// # Arguments
    /// 
    /// * `domain` - Ocean size in meters
    /// * `depth` - Ocean depth in meters
    /// * `wind_speed` - Wind speed 10 meters above water in m/s
    /// * `fetch` - Large number (~800000)
    /// * `damping` - Wave damping from 1-6 (start with 3.3)
    /// * `swell` - Wave swell from 0 - 1
    pub fn new(points: usize, domain: f32, depth: f32, wind_speed: f32, fetch: f32, damping: f32, swell: f32) -> WaveGen {
        let alpha = 0.076*(wind_speed.powi(2) / (GRAVITY*fetch)).abs().powf(0.22);
        let omega_p = TAU*3.5*(GRAVITY.powi(2) / (wind_speed*fetch)).powf(0.33);
        let tma_gain = (depth / GRAVITY).sqrt();
        let hassleman_raise = -2.33 - 1.45*((wind_speed*omega_p) / GRAVITY - 1.17);
        let dk = TAU / domain;

        WaveGen { 
            points: points,
            domain: domain,
            dk: dk,
            capillary_depth: depth, 
            jonswap_alpha: alpha, 
            jonswap_gamma: damping, 
            omega_p: omega_p, 
            tma_gain: tma_gain, 
            hassleman_raisefactor: hassleman_raise,
            horvath_swell: swell 
        }
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
        let s = self.hassleman_shape(omega) + swell_shape;
        let normalization = ((2.0*s - 1.0).exp2() / PI)*(gamma::gamma(s + 1.0).powi(2) / gamma::gamma(2.0*s + 1.0));
        normalization*(0.5*theta).cos().abs().powf(2.0*s)
    }

    fn horvath_swell_shape(&self, omega: f32) -> f32 {
        16.0*(omega / self.omega_p).tanh()*self.horvath_swell.powi(2)
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

    fn compute_spectra_impl(&self, k_mag: f32, theta: (f32, f32), rng: &mut ThreadRng) -> WavePoint {
        if k_mag == 0.0 {
            return WavePoint {
                pos_spec: Complex(0.0, 0.0),
                neg_spec: Complex(0.0, 0.0),
                omega: 0.0
            };
        }

        let (omega, domega_dk) = self.capilary_dispersion(k_mag);
        let change_term = self.dk.powi(2)*domega_dk / k_mag;
        
        let power_base = self.jonswap_power(omega)*self.tma_correct(omega)*change_term;
        let swell_shape = self.horvath_swell_shape(omega);
        let pos_power = power_base*self.hassleman_direction(omega, theta.0, swell_shape);
        let neg_power = power_base*self.hassleman_direction(omega, theta.1, swell_shape);
    
        let dist = Normal::new(0.0_f32, 1.0_f32).unwrap();
        let pos_amp = (2.0*pos_power).abs().sqrt()*dist.sample(rng);
        let neg_amp = (2.0*neg_power).abs().sqrt()*dist.sample(rng);

        let distr = Uniform::new(0.0_f32, TAU);
        let pos_cmplx = Complex::from_polar(pos_amp, distr.sample(rng));
        let neg_cmplx = Complex::from_polar(neg_amp, distr.sample(rng));

        WavePoint { pos_spec: pos_cmplx, neg_spec: neg_cmplx, omega: omega }
    }

    fn spectral_iterator(&self) -> impl ExactSizeIterator<Item = ((f32, f32), f32)> + '_ {
        let width = self.points / 2 + 1;

        (0..self.points)
            .product_exact(0..width)
            .map(move |(y, x)| {
                let y_rev = if y <= self.points / 2 { y as isize } else { y as isize - self.points as isize };
                ((
                    (x as f32)*self.dk,
                    (y_rev as f32)*self.dk
                ),
                self.dk*(x as f32).hypot(y_rev as f32))
            })
    }

    fn par_spectral_iterator(&self) -> impl rayon::iter::IndexedParallelIterator<Item = ((f32, f32), f32)> + '_ {
        let width = self.points / 2 + 1;

        (0..self.points*width)
            .into_par_iter()
            .map(move |i| {
                let x = i % width;
                let y = i / width;
                let y_rev = if y <= self.points / 2 { y as isize } else { y as isize - self.points as isize };
                // let y_rev = (y as isize) - (self.points / 2) as isize;
                // let x_rev = (x as isize) - (self.points / 2) as isize;
                (
                    (
                        (x as f32)*self.dk,
                        (y_rev as f32)*self.dk
                    ),
                    self.dk*(x as f32).hypot(y_rev as f32)
                )
            })
    }
    
    pub fn compute_spectra(&self) -> Box<[WavePoint]> {
        let vec: Vec<WavePoint> = self.par_spectral_iterator()
            .map(|((x, y), k_mag)| (k_mag, ((-y).atan2(x), y.atan2(-x))))
            .map_init(rand::thread_rng, |rng, (k_mag, theta)| self.compute_spectra_impl(k_mag, theta, rng))
            .collect();

        vec.into_boxed_slice()
    }

    pub fn compute_timevaried(&self, slice: &[WavePoint], time: f32) -> ArrayVec<Vec<Complex>, 3> {
        let width = self.points / 2 + 1;
        assert!(slice.len() == width * self.points);

        let timevaried: Vec<Complex> = slice
            .into_iter()
            // apply time variation
            .map(|w| {
                let omega_t = w.omega * time;
                let bkwd = Complex::from_polar(1.0, omega_t);
                let fwd = bkwd.conj();
                
                w.pos_spec*fwd + w.neg_spec*bkwd
            })
            .collect();
        
        let mut ret: ArrayVec<Vec<Complex>, 3> = ArrayVec::new_const();
        [OceanProp::HEIGHT, OceanProp::DX, OceanProp::DY]
            .into_par_iter()
            .map(|p| {
                return timevaried
                    .as_slice()
                    .into_par_iter()
                    .zip_eq(self.par_spectral_iterator())
                    .map(move |(h, ((kx, ky), k_mag))| {
                        if k_mag == 0.0 {
                            return (*h).clone()
                        }
                        return match p {
                            OceanProp::HEIGHT => (*h).clone(),
                            OceanProp::DX => *h*Complex(0.0, -kx/k_mag),
                            OceanProp::DY => *h*Complex(0.0, -ky/k_mag),
                        }})
            })
            .map(|r| {
                r
                    .chunks(width)
                    .flat_map_iter(|w_chunk| {
                        let w_varied_conj = w_chunk[1..w_chunk.len() - 1]
                            .iter()
                            .map(|c| c.conj())
                            .rev();
                        w_chunk
                            .iter()
                            .map(|c| c.to_owned())
                            .chain(w_varied_conj)
                            .collect::<ArrayVec<_, 512>>() // TODO: make this not a magic number
                    })
                    .collect::<Vec<Complex>>()
            })
            .collect_into_arrayvec(&mut ret);
        ret
    }


}



