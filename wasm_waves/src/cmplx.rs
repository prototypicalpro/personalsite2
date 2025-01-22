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