use std::ops::{Add, Mul, Sub, Neg};

#[derive(Clone, Copy, Debug, Default)]
pub struct Complex(pub f32, pub f32);

unsafe impl Send for Complex {}
unsafe impl Sync for Complex {}

impl Complex {
    #[inline]
    pub fn from_amp_phase(amp: f32, phase: f32) -> Complex {
        let cmplx = phase.sin_cos();
        Complex(cmplx.1 * amp, cmplx.0 * amp)
    }
}

impl Add<Complex> for Complex {
    type Output = Complex;
    #[inline]
    fn add(self, rhs: Complex) -> Complex {
        Complex(self.0 + rhs.0, self.1 + rhs.1)
    }
}

impl Mul<Complex> for Complex {
    type Output = Complex;
    #[inline]
    fn mul(self, rhs: Complex) -> Complex {
        Complex(self.0*rhs.0 - self.1*rhs.1, self.1*rhs.0 + self.0*rhs.1)
    }
}

impl Mul<f32> for Complex {
    type Output = Complex;
    #[inline]
    fn mul(self, rhs: f32) -> Complex {
        Complex(self.0*rhs, self.1*rhs)
    }
}

impl Sub<Complex> for Complex {
    type Output = Complex;
    #[inline]
    fn sub(self, rhs: Complex) -> Complex {
        Complex(self.0 - rhs.0, self.1 - rhs.1)
    }
}

impl Neg for Complex {
    type Output = Complex;
    #[inline]
    fn neg(self) -> Complex {
        Complex(-self.0, -self.1)
    }
}