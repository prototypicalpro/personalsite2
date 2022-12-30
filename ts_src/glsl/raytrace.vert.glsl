#version 300 es

// camera/world position matricies
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform vec3 cameraPosition;

in vec4 position; // (x, y, z, dxy)

/// end-pre-strip ///

precision highp float;
precision highp int;
precision highp sampler2D;

const float ROW_SIZE = 512.;

in vec4 partial; // (dxx, dyy, dzx, dzy)

out vec3 v_position;
out vec2 v_wave_texcoords;
out vec3 v_wave_normal;
out vec3 v_camera_normal;

vec3 proj(vec4 a) {
    return a.xyz / a.w;
}

void main() {
    // set GL position based on the provided matricies
	gl_Position = projectionMatrix*modelViewMatrix*vec4(position.xyz, 1.0);
    
    v_position = proj(modelMatrix*vec4(position.xyz, 1.0));
    v_wave_texcoords = vec2(mod(float(gl_VertexID), ROW_SIZE), trunc(float(gl_VertexID) / ROW_SIZE)) / ROW_SIZE;
    vec2 slope = partial.zw / (1. + partial.xy);
    v_wave_normal = normalize(vec3(-slope, 1));
    v_camera_normal = normalize(v_position - cameraPosition);
}
