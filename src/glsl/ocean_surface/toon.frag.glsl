#version 300 es
#extension GL_GOOGLE_include_directive : enable

#define SUNSET_COLOR_COUNT 1
#define UNROLLED_LOOP_INDEX 0

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

    // rays are shot from the camera into a light or the great beyond
    // they refract/reflect once on the ocean surface, bounce against the floor, and refract again on the surface. 

    // vec4 color = vec4(LEADRCheaper(v_position, v_camera_normal, firstMoments, secMoments), 1.);
    // color = vec4(, 1.);

    vec3 color3 = SamuraiReflectionSampling(camera_normal, firstMoments, secMoments, cxy);

    // vec2 positive = smoothstep(-0.8, 0.8, v_position.xy);
    // vec2 negative = 1. - positive;
    // vec3 color3 = samurai3*negative.x*positive.y;
    // vec3 color3 = hue3;

    // the closer we are to the camera in the y plane, the darker the color should be to mimic sunset vibes
    // color3 = color3 * smoothstep(0.8, 1., gl_FragCoord.z);

    // vec3 spec3 = 0.3*LEADRSpecular(v_camera_normal, firstMoments, secMoments, cxy);
    // color = vec4(color3 + spec3, 1.);
    color = vec4(color3, 1.);

    // color = vec4(0., 0., (v_position.z)*4., 1.);
    // color = vec4(mod(v_wave_tex_uv[2], 1.), 0., 1.);
    // color = vec4(v_wave_blending[0], v_wave_blending[1], 0.5, 1.);

    // vec3 intersect = linePlaneIntersection(v_position, v_camera_normal, floorPosition, floorNormal);
    // vec3 texCoords = floorTextureMatrix*vec3(intersect.xy, 1.);
    // color = textureProjLod(floorTexture, texCoords, 8.);
}
