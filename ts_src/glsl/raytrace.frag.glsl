#version 300 es

/// end-pre-strip ///

precision highp float;
precision highp int;
precision highp sampler2D;

const float TWO_PI = 6.28318530717958647693;

uniform sampler2D floorTexture;

// xyzw coordinates where floor intersect occurs, in floor texture space
in vec4 v_output;

out vec4 color;

void main() {
    // color = v_output;
	color = textureProj(floorTexture, v_output.xyz);
}
