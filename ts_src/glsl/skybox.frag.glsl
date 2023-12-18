#version 300 es
#define UNROLLED_LOOP_INDEX 0

/// end-pre-strip ///

precision highp float;

in vec2 fragNormal;
in float fragRad;

uniform float radThresh;
uniform float speed;
uniform float scale;
uniform float time;

out vec4 color;

void main() {
    if (fragRad > radThresh) {
        color = vec4(0, 0, 0, 1.);
        return;
    }

    vec2 p = scale*fragNormal;
    float timeSpeed = time*speed;
    
#pragma unroll_loop_start
    for (int i = 0; i < 10; i++) {
        p.x += 0.3/float( UNROLLED_LOOP_INDEX + 1 )*sin(float( UNROLLED_LOOP_INDEX + 1 )*3.*p.y+timeSpeed);
        p.y += 0.3/float( UNROLLED_LOOP_INDEX + 1 )*cos(float( UNROLLED_LOOP_INDEX + 1 )*3.*p.x+timeSpeed);
    }
#pragma unroll_loop_end

    vec3 colorOut = 0.5 + 0.5*cos(timeSpeed+p.xyx+vec3(0, 2, 4));
    colorOut /= max(max(colorOut.x, colorOut.y), colorOut.z);
    colorOut = pow(colorOut, vec3(0.4545));

    color = clamp(vec4(colorOut, 1.), 0., 1.);
    // color = clamp(vec4(p.xy, 0., 1.), 0., 1.);
}
