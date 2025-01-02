#version 300 es
#extension GL_GOOGLE_include_directive : enable

#define SUNSET_COLOR_COUNT 1
#define UNROLLED_LOOP_INDEX 0

#define cameraPosition vec3(0)

// all code above this line removed at runtime
#pragma end_pre_strip

#include "shared/shared_func.glsl"

// All components are in the range [0…1], including hue.
vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 HueWheelSampling(vec3 wi, vec2 firstMoments, vec3 secMoments, float cxy, float off, float spec) {
    // const vec3 macronormal = vec3(0, 0, 1.);
    vec3 wn = normalize(vec3(-firstMoments.xy, 1.));
    vec3 wr = reflect(wi, wn);
    vec2 sigma = sqrt(abs(secMoments.xy - firstMoments.xy*firstMoments.xy));

    float angle = clamp(abs(dot(-normalize(wr.yz), normalize(sunDirection.yz))), 0., 1.);
    angle = mix(angle, 0.8, clamp(sqrt(max(sigma.x, sigma.y)) * 0.6, 0., 1.));
    angle = fract(angle + off);

    // float sigmaTerm = 1. - clamp(sqrt(max(sigma.x, sigma.y))*0.5, 0., 0.5);
    return hsv2rgb(vec3(clamp(angle, 0., 1.), 1. - spec, 1.));
}

void main() {
    #include "shared/compute_moments.glsl"

    float spec = LEADRSpecular(camera_normal, firstMoments, secMoments, cxy);
    vec3 color3 = HueWheelSampling(camera_normal, firstMoments, secMoments, cxy, hueOff, clamp(spec, 0., 1.));

    color = vec4(color3, 1.);
}
