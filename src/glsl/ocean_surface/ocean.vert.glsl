#version 300 es

// camera/world position matricies
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform vec3 cameraPosition;

in vec3 position; // (x, y, z) of render plane

// patch for syntax highlighting
#define UNROLLED_LOOP_INDEX 0

// all code above this line removed at runtime
#pragma end_pre_strip

#define FILTER_COUNT 2

precision highp float;
precision highp int;
precision highp sampler2D;

const float WIDTH = 256.;

uniform sampler2D waveDisplacement[FILTER_COUNT];
uniform mat3 waveTextureMatrix[FILTER_COUNT]; // render object -> wave texture
uniform float domain;
uniform float waveBlending[FILTER_COUNT];

out vec2 v_wave_tex_uv[FILTER_COUNT]; // texture coordinates for each filtering grain
// out float v_wave_blending[FILTER_COUNT]; // blending factor to use for each cascade, helps filter tiling
out vec3 v_position; // position in world space

vec3 proj(vec4 a) {
    return a.xyz / a.w;
}

void main() {
    vec3 positionTmp = position.xyz;

    // i < FILTER_COUNT
    vec3 waveTexCoords;
    float scale;
#pragma unroll_loop_start
    for (int i = 0; i < 2; i++) {
        scale = domain * waveTextureMatrix[i][0][0];

        waveTexCoords = waveTextureMatrix[i]*vec3(position.xy, 1.0);
        v_wave_tex_uv[i] = waveTexCoords.xy / waveTexCoords.z;
        positionTmp += waveBlending[i]*texture(waveDisplacement[UNROLLED_LOOP_INDEX], v_wave_tex_uv[i]).xyz;
    }
#pragma unroll_loop_end
    v_position = proj(modelMatrix*vec4(positionTmp, 1.));
	gl_Position = projectionMatrix*modelViewMatrix*vec4(positionTmp, 1.);
}
