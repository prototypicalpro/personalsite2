#version 300 es
#extension GL_GOOGLE_include_directive : enable

#define LEADR_SAMPLE_COUNT 1
#define LEADR_SAMPLE_SIZE 1.
#define LEADR_WEIGHTS vec4(0, 0, 0, 0)
#define SUNSET_COLOR_COUNT 1
#define UNROLLED_LOOP_INDEX 0

#define cameraPosition vec3(0)

// all code above this line removed at runtime
#pragma end_pre_strip

#include "shared/shared_func.glsl"

float linePlaneDistance(vec3 linePoint, vec3 lineSlope, vec3 planePoint, vec3 planeNormal) {
    return dot(planePoint - linePoint, planeNormal) / dot(lineSlope, planeNormal);
}

vec3 linePlaneIntersection(vec3 linePoint, vec3 lineSlope, vec3 planePoint, vec3 planeNormal) {
    float d = linePlaneDistance(linePoint, lineSlope, planePoint, planeNormal);
    return linePoint + lineSlope*d;
}

// TODO: environment map sampling using LEDAR maps for transmitted light
vec3 LEADRCheaper(vec3 worldPosition, vec3 wi, vec2 firstMoments, vec3 secMoments) {
    const float SAMPLE_LENGTH_SIGMA = 2.;
    const float gammaCorrect = 1.;
    const float lodBias = 0.;
    const vec3 macronormal = vec3(0, 0, 1.); // TODO: is this right?
    const vec3 mesonormal = vec3(0, 0, 1.); // TODO: is mesonormal always (0, 0, 1)?

    float floorToPixels = floorPixels/floorSize;

    // instead of sampling multiple values, sample ~1.5sigma using a texture lookup
    vec3 wn = normalize(vec3(-firstMoments.xy, 1.)); 
    // vec3 wn = v_wave_normal;
    // float c = abs(dot(wi, wn));
    // vec3 wt = (ETA*c - sign(dot(wi, macronormal))*sqrt(1. + ETA*ETA*(c*c - 1.)))*wn - ETA*wi;   
    vec3 wt = refract(wi, wn, ETA);
    vec3 wr = reflect(wi, wn);
    float d = linePlaneDistance(worldPosition, wt, floorPosition, floorNormal);

    // Real-time rendering of refracting transmissive objects with multi-scale rough surfaces Equation 4
    vec2 sigma = sqrt(abs(secMoments.xy - firstMoments.xy*firstMoments.xy));
    float A = pow(2.*SAMPLE_LENGTH_SIGMA*max(sigma.x, sigma.y), 2.);
    
    // transmitted component
    float eta_wtwn = INV_ETA*abs(dot(wt, wn));
    float J = (pow(abs(dot(wi, wn)) + eta_wtwn, 2.) / (INV_ETA*abs(eta_wtwn)))*pow(dot(wn, macronormal), 3.);
    float alpha = J*A;
    float solidFootprint = max(alpha*d / abs(dot(wn, wt)), 0.);
    float lod = max(5., lodBias + log2(solidFootprint)); // TODO: remove LOD clamp?
    vec3 floorIntersect = worldPosition + d*wt;
    vec3 floorTex = floorTextureMatrix*vec3(floorIntersect.xy, 1.0);
    vec3 floorPixel = textureProjLod(floorTexture, floorTex, lod).xyz;

    // reflected component
    float J_r = 4.*abs(dot(wn, -wi)*pow(dot(wn, macronormal), 3.));
    float alpha_r = J_r*A;
    // float lod = 0.; // ???
    vec3 skyPixel = texture(skyboxTex, wr).rgb;
    // TODO: generate floor with watercolor effect from https://www.shadertoy.com/view/ttlGDf

    float fresnel = fresnel(-wi, wn, secMoments);
    const float maskingShadowing = 1.; // TODO
    return mix(floorPixel, skyPixel, fresnel)*maskingShadowing*gammaCorrect;
    // return mix(vec3(0., 0., 0.), skyPixel, 1.)*maskingShadowing*gammaCorrect;

    // return vec3(firstMoments, 1.);
}

vec3 sampleRefractLEADR(vec3 wi, vec3 wn, float lodOffset) {
    const vec3 macronormal = vec3(0, 0, 1.);
    const float lodMin = 0.;
    const float lodBias = 0.;
    float floorToPixels = floorPixels/floorSize;

    // Real-time rendering of refracting transmissive objects with multi-scale rough surfaces Equation 4
    vec3 wt = refract(wi, wn, ETA);
    float eta_wtwn = INV_ETA*dot(wt, wn);
    float J = (pow(abs(dot(wi, wn)) + eta_wtwn, 2.) / (INV_ETA*abs(eta_wtwn)))*pow(dot(wn, macronormal), 3.);

    float d = linePlaneDistance(v_position, wt, floorPosition, floorNormal);
    // float solidFootprint = pow(d*floorToPixels, 2.) / abs(dot(wn, wt));
    float lod = 0.72 * log(max(0.0001, J * (0.5 / 1.5))) + lodOffset + lodBias;
    // float lod = max(lodMin, lodBias + log2(solidFootprint)); // TODO: remove LOD clamp?

    vec3 floorIntersect = v_position + d*wt;
    vec3 floorTex = floorTextureMatrix*vec3(floorIntersect.xy, 1.0);
    return textureProjLod(floorTexture, floorTex, lod).xyz;
}

vec3 sampleReflectLEADR(vec3 wi, vec3 wn, float lodOffset) {
    const vec3 macronormal = vec3(0, 0, 1.);
    const float lodMin = 0.;
    const float lodBias = 0.;

    vec3 wr = reflect(wi, wn);
    float wnz_bar = abs(wn.z);
    float J = 4.*abs(dot(wi, wn))*wnz_bar*wnz_bar*wnz_bar;

    float lod = 0.72 * log(max(0.0001, J * (0.5 / 1.5))) + lodOffset + lodBias;
    lod = max(lodMin, lod); // TODO: remove LOD clamp?

    return textureLod(skyboxTex, wr, lod).xyz;
}

// TODO: environment map sampling using LEDAR maps for transmitted light
vec3 LEADREnvironmentMapSampling(vec3 wi, vec2 firstMoments, vec3 secMoments, float cxy) {
    const vec3 macronormal = vec3(0, 0, 1.);
    // pj, pi, Wj, Wi
    const vec4[LEADR_SAMPLE_COUNT*LEADR_SAMPLE_COUNT] weights = vec4[] (
        LEADR_WEIGHTS
    );

    vec2 sigma = sqrt(abs(secMoments.xy - firstMoments.xy*firstMoments.xy));
    float lodOffset = -1.0 + log2(LEADR_SAMPLE_SIZE * (0.5 / 1.5) * max(sigma.x, sigma.y) * 2048.0);
    float rxy = cxy/(sigma.x*sigma.y);
    float rxyTerm = sqrt(1. - rxy*rxy);
    // float A = pow(2.*LEADR_SAMPLE_SIZE*max(sigma.x, sigma.y)/float(LEADR_SAMPLE_COUNT), 2.);

    // LEADR mapping supplimental algorithm 1
    vec3 I = vec3(0, 0, 0);
    vec3 S = vec3(0, 0, 0);

    for (int i = 0; i < LEADR_SAMPLE_COUNT*LEADR_SAMPLE_COUNT; i++) {
        vec4 wvec = weights[i];

        float x = firstMoments.x + wvec.x*sigma.x;
        float y = (rxy*wvec.x + rxyTerm*wvec.y)*sigma.y + firstMoments.y;
        vec3 wn = normalize(vec3(-x, -y, 1.)); // micronormal
        float c = abs(dot(wi, wn));

        float Wn = wvec.z*wvec.w;
        float proj = max(0., dot(wn, -wi)) / wn.z;
        float f = 1. - fresnel(-wi, wn, secMoments);

        // vec3 ftex = sampleReflectLEADR(wi, wn, lodOffset);
        vec3 ftex = sampleRefractLEADR(wi, wn, lodOffset);
        // vec3 tex = rtex + 0.7*ftex;

        I += Wn*proj*ftex*f;
        S += Wn*proj;
    }

    // add small micronormal to fix black artifacts
    const float BIAS = 1.01;
    const float WEIGHT = 0.00001;
    vec3 mesonormal = normalize(vec3(-firstMoments, 1.)); 
    vec3 wnfix = normalize(mesonormal - dot(mesonormal, -wi)*1.01*(-wi));
    float fixproj = max(0., dot(wnfix, -wi)) / dot(wnfix, macronormal);
    float fbar = 1. - fresnel(-wi, wnfix, secMoments);
    vec3 texbar = sampleReflectLEADR(wi, wnfix, lodOffset);
    I += WEIGHT*fixproj*fbar*texbar;
    S += WEIGHT*fixproj;

    // vec3 wn = normalize(vec3(-firstMoments.xy, 1.));
    // return wn.z*I/dot(wn, -wi); 
    return I / S;
}

void main() {
    #include "shared/compute_moments.glsl"

    // rays are shot from the camera into a light or the great beyond
    // they refract/reflect once on the ocean surface, bounce against the floor, and refract again on the surface. 

    // vec4 color = vec4(LEADRCheaper(v_position, v_camera_normal, firstMoments, secMoments), 1.);
    // color = vec4(, 1.);

    vec3 color3 = LEADREnvironmentMapSampling(camera_normal, firstMoments, secMoments, cxy);

    // vec2 positive = smoothstep(-0.8, 0.8, v_position.xy);
    // vec2 negative = 1. - positive;
    // vec3 color3 = ledar3*negative.y*negative.y;
    // vec3 color3 = hue3;

    // the closer we are to the camera in the y plane, the darker the color should be to mimic sunset vibes
    // color3 = color3 * smoothstep(0.8, 1., gl_FragCoord.z);

    // vec3 spec3 = sunColor*LEADRSpecular(camera_normal, firstMoments, secMoments, cxy);
    // color = vec4(color3 + spec3, 1.);
    color = vec4(color3, 1.);

    // color = vec4(0., 0., (v_position.z)*4., 1.);
    // color = vec4(mod(v_wave_tex_uv[2], 1.), 0., 1.);
    // color = vec4(v_wave_blending[0], v_wave_blending[1], 0.5, 1.);

    // vec3 intersect = linePlaneIntersection(v_position, v_camera_normal, floorPosition, floorNormal);
    // vec3 texCoords = floorTextureMatrix*vec3(intersect.xy, 1.);
    // color = textureProjLod(floorTexture, texCoords, 8.);
}
