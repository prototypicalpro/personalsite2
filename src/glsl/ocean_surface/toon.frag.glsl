#version 300 es
#extension GL_GOOGLE_include_directive : enable

#define SUNSET_COLOR_COUNT 1
#define UNROLLED_LOOP_INDEX 0

#define cameraPosition vec3(0)

// all code above this line removed at runtime
#pragma end_pre_strip

#include "shared/shared_func.glsl"

vec3 SamuraiReflectionSampling(vec3 wi, vec2 firstMoments, vec3 secMoments, float cxy) {
    // const vec3 macronormal = vec3(0, 0, 1.);
    const float steps = 8.;
    vec3 wn = normalize(vec3(-firstMoments.xy, 1.));
    vec3 wr = reflect(wi, wn);
    vec2 sigma = sqrt(abs(secMoments.xy - firstMoments.xy*firstMoments.xy));

    float angle = abs(dot(-normalize(wr.yz), normalize(sunDirection.yz)));
    angle = mix(angle, 0.8, clamp(sqrt(max(sigma.x, sigma.y)) * 0.01, 0., 1.));

    vec3 color3 = vec3(0);
#pragma unroll_loop_start
    for (int i = 0; i < SUNSET_COLOR_COUNT; i++) {
        color3 = color3 + sunsetColorTable[i].rgb*step(sunsetColorTable[i].a, angle);
    }
#pragma unroll_loop_end
    return color3;
}

void main() {
    #include "shared/compute_moments.glsl"

    vec3 color3 = SamuraiReflectionSampling(camera_normal, firstMoments, secMoments, cxy);
    vec3 spec3 = sunColor*LEADRSpecular(camera_normal, firstMoments, secMoments, cxy);
    color = vec4(color3 + spec3, 1.);
}
