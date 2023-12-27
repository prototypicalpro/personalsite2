#version 300 es

// all code above this line removed at runtime
#pragma end_pre_strip

in vec3 position;
in vec4 wavePosition;
in vec4 wavePartial;

flat out vec4 fragPosition;
flat out vec4 fragPartial;

void main() {
    gl_Position = vec4(position, 1.0);
    gl_PointSize = 1.0;
    fragPosition = wavePosition;
    fragPartial = wavePartial;
}
