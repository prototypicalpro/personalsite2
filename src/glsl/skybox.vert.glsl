#version 300 es

precision highp float;

// camera/world position matricies
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform vec3 cameraPosition;

in vec3 position;
in vec3 normal;
in vec2 uv;

// all code above this line removed at runtime
#pragma end_pre_strip

uniform vec3 sunDirection; // points from sun to earth
uniform mat3 sunRotation; // rotation matrix from sun to (1, 0, 0)

out vec2 fragNormal;
out float fragRad;

void main() {
    gl_Position = projectionMatrix*modelViewMatrix*vec4(position, 1.);
    fragNormal = (sunRotation*normal).xy;
    fragRad = length(fragNormal);
}
