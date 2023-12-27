#version 300 es

// all code above this line removed at runtime
#pragma end_pre_strip

precision highp float;
precision highp int;
precision highp sampler2D;

flat in vec4 fragPosition; // (dz, dx, dy, dxy)
flat in vec4 fragPartial; // (dxx, dyy, dzx, dzy)

layout(location = 0) out vec4 position; // (x, y, z, dxy)
layout(location = 1) out vec4 firstMoments; // (slopex, slopey)
layout(location = 2) out vec4 secondMoments; // (slopex*slopex, slopey*slopey, slopex*slopey)

void main() {
    // TODO: add foam/displacement J
    position = fragPosition;
    firstMoments = vec4(fragPartial.zw / (1. + fragPartial.xy), 0, 0);
    secondMoments = vec4(firstMoments.xyx * firstMoments.xyy, 0);
}
