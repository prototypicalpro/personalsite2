#version 300 es
#extension GL_GOOGLE_include_directive : enable

#define SUNSET_COLOR_COUNT 1
#define UNROLLED_LOOP_INDEX 0

// all code above this line removed at runtime
#pragma end_pre_strip

#include "shared/shared_func.glsl"

// https://www.shadertoy.com/view/ls2Bz1
float saturate (float x)
{
    return clamp(x, 0., 1.);
}
vec3 saturate (vec3 x)
{
    return clamp(x, 0., 1.);
}

vec3 bump3y (vec3 x, vec3 yoffset)
{
	vec3 y = vec3(1.,1.,1.) - x * x;
	y = saturate(y-yoffset);
	return y;
}

vec3 spectral_zucconi6 (float w)
{
	// w: [400, 700]
	// x: [0,   1]
	float x = saturate((w - 400.0)/ 300.0);

	const vec3 c1 = vec3(3.54585104, 2.93225262, 2.41593945);
	const vec3 x1 = vec3(0.69549072, 0.49228336, 0.27699880);
	const vec3 y1 = vec3(0.02312639, 0.15225084, 0.52607955);

	const vec3 c2 = vec3(3.90307140, 3.21182957, 3.96587128);
	const vec3 x2 = vec3(0.11748627, 0.86755042, 0.66077860);
	const vec3 y2 = vec3(0.84897130, 0.88445281, 0.73949448);

	return
		bump3y(c1 * (x - x1), y1) +
		bump3y(c2 * (x - x2), y2) ;
}

float smoothstep_spectral(float w) {
    return smoothstep(300., 400., w)*(1. - smoothstep(700., 800., w));
}

vec3 sample_slick(float w) {
    return spectral_zucconi6(w)*smoothstep_spectral(w);
}

vec3 OilSlickSampling(vec3 wi, vec2 firstMoments, vec3 secMoments) {
    vec2 sigma = sqrt(abs(secMoments.xy - firstMoments.xy*firstMoments.xy));
    float oil_thickness = max(sigma.x, sigma.y)*500. + 100.;
    // float oil_thickness = position.z*1000. + 200.;  // + max(sigma.x, sigma.y)*400.;
    // float oil_thickness = 200.;

    vec3 wn = normalize(vec3(-firstMoments.xy, 1.));
    vec3 wp = refract(wi, wn, AIR_REFRACT / OIL_REFRACT);
    float lambda_base = 2.*OIL_REFRACT*oil_thickness*abs(dot(wp, wn));

    vec3 color3 = vec3(0);

#pragma unroll_loop_start
    for (int i = 0; i < 3; i++) {
        color3 = color3 + sample_slick(lambda_base / float(UNROLLED_LOOP_INDEX));
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

    // vec3 ledar3 = LEADREnvironmentMapSampling(v_camera_normal, firstMoments, secMoments, cxy);
    vec3 color3 = OilSlickSampling(camera_normal, firstMoments, secMoments);

    // vec2 positive = smoothstep(-0.8, 0.8, v_position.xy);
    // vec2 negative = 1. - positive;
    // vec3 color3 = slick3*positive.x*negative.y;
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
