#version 300 es

#define LEADR_SAMPLE_COUNT 3
#define LEADR_SAMPLE_SIZE 1.
#define LEADR_WBAR 1.

/// end-pre-strip ///

#define FILTER_COUNT 3

precision highp float;
precision highp int;
precision highp sampler2D;

const float TWO_PI = 6.28318530717958647693;
const float AIR_REFRACT = 1.;
const float WATER_REFRACT = 4./3.;
const float ETA = AIR_REFRACT / WATER_REFRACT;
const float INV_ETA = WATER_REFRACT / AIR_REFRACT;

// floor position matricies, relative to world space
const vec3 floorNormal = vec3(0., 0., 1.);  // always upwards relative to world
uniform vec3 floorPosition;
uniform mat3 floorTextureMatrix; // world space -> floor texture space
uniform float floorSize; // world space
uniform float floorPixels;
uniform sampler2D floorTexture;

// skybox
uniform samplerCube skyboxTex;

// XYZ of the wave surface, row major
uniform sampler2D waveDisplacement[FILTER_COUNT]; // (dx, dy, dz, dxy)
uniform sampler2D waveMoments[FILTER_COUNT]; // (slopex, slopey)
uniform sampler2D waveSecMoments[FILTER_COUNT]; // (slopex*slopex, slopey*slopey, slopex*slopey)

in vec2 v_wave_tex_uv[FILTER_COUNT];
in float v_wave_blending[FILTER_COUNT];
in vec3 v_position; // world space
in vec3 v_camera_normal;

out vec4 color;

float linePlaneDistance(vec3 linePoint, vec3 lineSlope, vec3 planePoint, vec3 planeNormal) {
    return dot(planePoint - linePoint, planeNormal) / dot(lineSlope, planeNormal);
}

vec3 linePlaneIntersection(vec3 linePoint, vec3 lineSlope, vec3 planePoint, vec3 planeNormal) {
    float d = linePlaneDistance(linePoint, lineSlope, planePoint, planeNormal);
    return linePoint + lineSlope*d;
}

// https://gpuopen.com/gdc-presentations/2019/gdc-2019-agtd6-interactive-water-simulation-in-atlas.pdf

float fresnel(vec3 wi, vec3 wn, vec3 secMoments) {
    const float R = pow(ETA - 1., 2.)/pow(ETA + 1., 2.);
    float alpha_v = sqrt(dot(secMoments.xy, wi.xy*wi.xy));
    return R + (1. - R)*pow(1. - dot(wi, wn), 5.*exp(-2.69*alpha_v)) / (1. + 22.7*pow(alpha_v, 1.5));
}

vec2 combineFirstMoments(vec2 moments[FILTER_COUNT]) {
    return moments[0] + moments[1] + moments[2];
}

vec3 addSecondMoments(vec2 firstMomentLhs, vec3 secMomentsLhs, vec2 firstMomentRhs, vec3 secMomentsRhs) {
    return vec3(
        secMomentsLhs.xy + secMomentsRhs.xy + 2.*firstMomentLhs.xy*firstMomentRhs.xy,
        secMomentsLhs.z + secMomentsRhs.z + firstMomentLhs.x*firstMomentRhs.y + firstMomentLhs.y*firstMomentRhs.x);
}

vec3 combineSecondMoments(vec2 moments[FILTER_COUNT], vec3 secMoments[FILTER_COUNT]) {
    vec2 moments01 = moments[0] + moments[1];
    vec3 secMoments01 = addSecondMoments(moments[0], secMoments[0], moments[1], secMoments[1]);
    return addSecondMoments(moments01, secMoments01, moments[2], secMoments[2]);
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

vec3 sampleRefractLEADR(vec3 wi, vec3 wn, float A) {
    const vec3 macronormal = vec3(0, 0, 1.);
    const float lodMin = 0.;
    const float lodBias = 0.;
    float floorToPixels = floorPixels/floorSize;

    // Real-time rendering of refracting transmissive objects with multi-scale rough surfaces Equation 4
    vec3 wt = refract(wi, wn, ETA);
    float eta_wtwn = INV_ETA*dot(wt, wn);
    float J = (pow(abs(dot(wi, wn)) + eta_wtwn, 2.) / (INV_ETA*abs(eta_wtwn)))*pow(dot(wn, macronormal), 3.);
    float alpha = J*A;

    float d = linePlaneDistance(v_position, wt, floorPosition, floorNormal);
    float solidFootprint = alpha*pow(d*floorToPixels, 2.) / abs(dot(wn, wt));
    float lod = max(lodMin, lodBias + log2(solidFootprint)); // TODO: remove LOD clamp?

    vec3 floorIntersect = v_position + d*wt;
    vec3 floorTex = floorTextureMatrix*vec3(floorIntersect.xy, 1.0);
    return textureProjLod(floorTexture, floorTex, lod).xyz;
}

// TODO: environment map sampling using LEDAR maps for transmitted light
vec3 LEADREnvironmentMapSampling(vec3 wi, vec2 firstMoments, vec3 secMoments) {
    const int sampleCount = LEADR_SAMPLE_COUNT;
    const float sampleLength = LEADR_SAMPLE_SIZE;
    const float Wbar = LEADR_WBAR;
    const vec3 macronormal = vec3(0, 0, 1.);

    vec2 sigma = sqrt(abs(secMoments.xy - firstMoments.xy*firstMoments.xy));

    float cxy = secMoments.z - firstMoments.x*firstMoments.y;
    float rxy = cxy/(sigma.x*sigma.y);
    float rxyTerm = sqrt(1. - rxy*rxy);
    float A = pow(2.*sampleLength*max(sigma.x, sigma.y)/float(sampleCount), 2.);

    // LEADR mapping supplimental algorithm 1
    vec3 I = vec3(0, 0, 0);
    vec3 S = vec3(0, 0, 0);

    for (int j = 0; j < sampleCount; j++) {
        float pj = float(j)*sampleLength - sampleLength*float((sampleCount - 1) / 2);
        float Wj = exp(-0.5*pow(pj, 2.)) / Wbar;

        for (int k = 0; k < sampleCount; k++) {
            float pk = float(k)*sampleLength - sampleLength*float((sampleCount - 1) / 2);
            float Wk = exp(-0.5*pow(pk, 2.)) / Wbar;

            float x = firstMoments.x + pj*sigma.x;
            float y = (rxy*pj + rxyTerm*pk)*sigma.y + firstMoments.y;
            vec3 wn = normalize(vec3(-x, -y, 1.)); // micronormal
            float c = abs(dot(wi, wn));
            // vec3 wt = (ETA*c - sign(dot(wi, macronormal))*sqrt(1. + ETA*ETA*(c*c - 1.)))*wn - ETA*wi; // transmitted direction (use refract?)
            // wt = normalize(wt); // TODO: needed?

            float Wn = Wj*Wk;
            float proj = max(0., dot(wn, -wi)) / dot(wn, macronormal);
            float f = 1. - fresnel(-wi, wn, secMoments);

            vec3 tex = sampleRefractLEADR(wi, wn, A);

            I += Wn*proj*tex*f;
            S += Wn*proj;
        }
    }

    // add small micronormal to fix black artifacts
    const float BIAS = 1.01;
    const float WEIGHT = 0.00001;
    vec3 mesonormal = normalize(vec3(-firstMoments.xy, 1.)); 
    vec3 wnfix = normalize(mesonormal - dot(mesonormal, -wi)*1.01*(-wi));
    float fixproj = max(0., dot(wnfix, -wi)) / dot(wnfix, macronormal);
    float f = 1. - fresnel(-wi, wnfix, secMoments);
    vec3 tex = sampleRefractLEADR(wi, wnfix, A);
    I += WEIGHT*fixproj*f*tex;
    S += WEIGHT*fixproj;

    return I / S; 
}


void main() {
    // TODO: should I compute an LOD for these lookups?
    vec2 firstMomentsList[FILTER_COUNT] = vec2[FILTER_COUNT](
        v_wave_blending[0]*texture(waveMoments[0], v_wave_tex_uv[0]).xy,
        v_wave_blending[1]*texture(waveMoments[1], v_wave_tex_uv[1]).xy,
        v_wave_blending[2]*texture(waveMoments[2], v_wave_tex_uv[2]).xy
    );
    vec3 secMomentsList[FILTER_COUNT] = vec3[FILTER_COUNT](
        v_wave_blending[0]*texture(waveSecMoments[0], v_wave_tex_uv[0]).xyz,
        v_wave_blending[1]*texture(waveSecMoments[1], v_wave_tex_uv[1]).xyz,
        v_wave_blending[2]*texture(waveSecMoments[2], v_wave_tex_uv[2]).xyz
    );

    vec2 firstMoments = combineFirstMoments(firstMomentsList);
    vec3 secMoments = combineSecondMoments(firstMomentsList, secMomentsList);

    // rays are shot from the camera into a light or the great beyond
    // they refract/reflect once on the ocean surface, bounce against the floor, and refract again on the surface. 

    // color = vec4(LEADRCheaper(v_position, v_camera_normal, firstMoments, secMoments), 1.);
    color = vec4(LEADREnvironmentMapSampling(v_camera_normal, firstMoments, secMoments), 1.);

    // color = vec4(0., 0., (v_position.z)*4., 1.);
    // color = vec4(mod(v_wave_tex_uv[2], 1.), 0., 1.);
    // color = vec4(v_wave_blending[0], v_wave_blending[1], 0.5, 1.);

    // vec3 intersect = linePlaneIntersection(v_position, v_camera_normal, floorPosition, floorNormal);
    // vec3 texCoords = floorTextureMatrix*vec3(intersect.xy, 1.);
    // color = textureProjLod(floorTexture, texCoords, 8.);
}
