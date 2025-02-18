use core::f32::consts::{E, PI};
use num_traits::Float;

const GAMMA_R: f32 = 10.900511;
const GAMMA_DK: &[f32] = &[
    2.48574089138753565546e-5,
    1.05142378581721974210,
    -3.45687097222016235469,
    4.51227709466894823700,
    -2.98285225323576655721,
    1.05639711577126713077,
    -1.95428773191645869583e-1,
    1.70970543404441224307e-2,
    -5.71926117404305781283e-4,
    4.63399473359905636708e-6,
    -2.71994908488607703910e-9,
];
const TWO_SQRT_E_OVER_PI: f32 = 1.8603827342052657173362492472666631120594218414085755;

/// Computes the gamma function with an accuracy
/// of 16 floating point digits. The implementation
/// is derived from "An Analysis of the Lanczos Gamma Approximation",
/// Glendon Ralph Pugh, 2004 p. 116
/// https://docs.rs/statrs/latest/src/statrs/function/gamma.rs.html#64-86
pub fn gamma(x: f32) -> f32 {
  if x < 0.5 {
      let s = GAMMA_DK
          .iter()
          .enumerate()
          .skip(1)
          .fold(GAMMA_DK[0], |s, t| s + t.1 / (t.0 as f32 - x));

      PI
          / ((PI * x).sin()
              * s
              * TWO_SQRT_E_OVER_PI
              * ((0.5 - x + GAMMA_R) / E).powf(0.5 - x))
  } else {
      let s = GAMMA_DK
          .iter()
          .enumerate()
          .skip(1)
          .fold(GAMMA_DK[0], |s, t| s + t.1 / (x + t.0 as f32 - 1.0));

      s * TWO_SQRT_E_OVER_PI * ((x - 0.5 + GAMMA_R) / E).powf(x - 0.5)
  }
}
