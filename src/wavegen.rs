use std::{f32::consts::{PI, TAU}, convert::TryInto, iter::repeat};
use itertools::Itertools;
use rand::prelude::*;
use rayon::prelude::*;
use rand_distr::{Normal, Uniform};
use rayon::iter::{ParallelBridge, IntoParallelIterator};
use crate::gamma;
use crate::cmplx::Complex;

const GRAVITY: f32 = 9.807;

#[derive(Debug, Clone)]
struct WavePoint {
    pos_spec: Complex,
    neg_spec: Complex,
    omega: f32
}

struct WaveGen {
    domain: f32,
    capillary_depth: f32,
    jonswap_alpha: f32,
    jonswap_gamma: f32,
    omega_p: f32,
    tma_gain: f32,
    hassleman_raisefactor: f32,
    horvath_swell: f32,
}

impl WaveGen {
    fn jonswap_power(&self, omega: f32) -> f32 {
        // TODO: should gamma be random?
    
        let sigma: f32 = if omega <= self.omega_p { 0.07 } else { 0.09 };
        let r = (-(omega - self.omega_p).powi(2) / (2.0*self.omega_p.powi(2)*sigma.powi(2))).exp();
        (self.jonswap_alpha*GRAVITY*GRAVITY / omega.powi(5))*(-1.25*(self.omega_p/omega).powi(4)).exp()*self.jonswap_gamma.powf(r)
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
        let normalization = ((2.0*s - 1.0).exp2() / PI)*(gamma::gamma(s + 1.).powi(2) / gamma::gamma(2.0*s + 1.));
        normalization*(0.5*theta).cos().abs().powf(2.0*s)
    }

    fn horvath_swell_shape(&self, omega: f32) -> f32 {
        16.0*(omega / self.omega_p).tanh()*self.horvath_swell.powi(2)
    }

    fn capilary_dispersion(&self, k_mag: f32) -> (f32, f32) {
        // translated from https://github.com/blackencino/EncinoWaves/blob/b7db46962e8405e2c7fb91b3eb7fda03d78489d4/src/EncinoWaves/Dispersion.h#L157-L168

        const SIGMA_OVER_RHO: f32 = 0.074 / 1000.0;
        let hk = self.capillary_depth * k_mag;
        let k2s = k_mag*k_mag*SIGMA_OVER_RHO;
        let gpk2s = GRAVITY + k2s;
        let omega = (k_mag*gpk2s*hk.tanh()).abs().sqrt();
    
        let number = (gpk2s + k2s + k2s)*hk.tanh() + hk*gpk2s/hk.cosh().powi(2);
        let domega_dk = number.abs() / (2.0*omega);
    
        (omega, domega_dk)
    }

    fn compute_spectra_impl(&self, dk: f32, k_mag: f32, theta: (f32, f32), rng: &mut SmallRng) -> WavePoint {
        let (omega, domega_dk) = self.capilary_dispersion(k_mag);
        let change_term = dk.powi(2)*domega_dk / k_mag;
        
        let power_base = self.jonswap_power(omega)*self.tma_correct(omega)*change_term;
        let pos_power = self.hassleman_direction(omega, theta.0, self.horvath_swell_shape(omega));
        let neg_power = self.hassleman_direction(omega, theta.1, self.horvath_swell_shape(omega));
    
        let dist = Normal::new(0.0_f32, 1.0_f32).unwrap();
        let pos_amp = (2.0*pos_power).abs().sqrt()*dist.sample(rng);
        let neg_amp = (2.0*neg_power).abs().sqrt()*dist.sample(rng);

        let distr = Uniform::new(0.0_f32, TAU);
        let pos_cmplx = Complex::from_amp_phase(pos_amp, distr.sample(rng));
        let neg_cmplx =  Complex::from_amp_phase(neg_amp, distr.sample(rng));

        WavePoint { pos_spec: pos_cmplx, neg_spec: neg_cmplx, omega: omega }
    }
    
    pub fn compute_spectra<const G: usize>(&self) -> Box<[WavePoint]> {
        let rng = SmallRng::from_entropy();
        let dk = TAU / self.domain;
        let vec: Vec<WavePoint> = (0..G)
            .cartesian_product(0..G)
            .map(|(y, x)| (x as f32, y as f32))
            .zip(repeat(rng))
            .par_bridge()
            .into_par_iter()
            .map(|((y, x), rng)| (dk, dk*x.hypot(y), ((-y).atan2(x), y.atan2(-x)), rng))
            .map(|(dk, k_mag, theta, rng)| self.compute_spectra_impl(dk, k_mag, theta, &mut rng.clone()))
            .collect();
        vec.into_boxed_slice()
    }

    pub fn compute_timevaried(&self, slice: &[WavePoint], time: f32, out: &mut Vec<Complex>) {
        slice
            .into_par_iter()
            .map(|w| {
                let omega_t = w.omega * time;
                let bkwd = Complex::from_amp_phase(1.0, omega_t);
                let fwd = Complex(bkwd.0, -bkwd.1);
                
                w.pos_spec*fwd + w.neg_spec*bkwd
            })
            .collect_into_vec(out);
    }
}




