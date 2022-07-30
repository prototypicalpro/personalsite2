#version 300 es

/// end-pre-strip ///

precision highp float;
precision highp int;
precision highp sampler2D;

flat in vec4 fragPosition;
flat in vec4 fragPartial;

layout(location = 0) out vec4 position;
layout(location = 1) out vec4 partial;
layout(location = 2) out vec4 normal;

vec3 normalFromPartials(vec4 partials) {
    vec2 slope = partials.zw / (1. + partials.xy);
    return normalize(vec3(-slope, 1.));
}

void main() {
    position = fragPosition;
    partial = fragPartial;
    normal = vec4(normalFromPartials(partial), 0.0);
}
