#version 300 es

/// end-pre-strip ///

precision highp float;
precision highp int;
precision highp sampler2D;

flat in vec4 fragPosition;
flat in vec4 fragPartial; // (dxx, dyy, dzx, dzy)

layout(location = 0) out vec4 position; // (x, y, z, dxy)
layout(location = 1) out vec4 firstMoments; // (slopex, slopey)
layout(location = 2) out vec4 secondMoments; // (slopex*slopex, slopey*slopey, slopex*slopey)


void main() {
    // TODO: fix moments to use slopes instead of partials
    position = fragPosition;
    firstMoments = vec4(fragPartial.zw / (1. + fragPartial.xy), 0, 0);
    secondMoments = vec4(firstMoments.xyx * firstMoments.xyy, 0);
}
