use num_complex::Complex;
use num_traits::Float;

pub trait FromPolar<T: Float> {
    fn from_polar(r: T, theta: T) -> Self;
}

impl<T: Float> FromPolar<T> for Complex<T> { 
    #[inline]
    fn from_polar(r: T, theta: T) -> Self {
        Self::new(r * theta.cos(), r * theta.sin())
    }
}

pub trait MulByJ<T: Float> {
    fn mul_j(&self) -> Self;
}

impl<T: Float> MulByJ<T> for Complex<T> {
    #[inline]
    fn mul_j(&self) -> Self {
        Self::new(-self.im, self.re)
    }
}

pub trait NegReal<T: Float> {
    fn neg_real(&self) -> Self;
}

impl<T: Float> NegReal<T> for Complex<T> {
    #[inline]
    fn neg_real(&self) -> Self {
        Self::new(-self.re, self.im)
    }
}
