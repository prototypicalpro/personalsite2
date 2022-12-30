#version 300 es

/// end-pre-strip ///

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

// light position relative to world space
uniform vec3 lightNormal;
uniform vec3 lightPosition;

// XYZ of the wave surface, row major
uniform sampler2D wavePosition; // (x, y, z, dxy)
uniform sampler2D waveMoments; // (slopex, slopey)
uniform sampler2D waveSecMoments; // (slopex*slopex, slopey*slopey, slopex*slopey)

// position and scale of the wave surface (world space)
uniform vec3 wavePositionPoint;
const vec3 wavePositionNormal = vec3(0., 0., 1.); // always upwards relative to world
// matricies to translate world space <-> wave object space
uniform mat4 waveModelMatrix;
uniform mat4 waveModelMatrixInverse;
uniform mat3 waveTextureMatrix; // object space -> texture space
uniform mat3 waveNormalMatrix;
uniform mat3 waveNormalMatrixInverse;

uniform float timeSec;

in vec3 v_position; // world space
in vec2 v_wave_texcoords;
in vec3 v_wave_normal;
in vec3 v_camera_normal;

out vec4 color;

// vec3 computeColorProj(vec3 textureCoordProj, float lod) {
//     vec2 textureCoord = textureCoordProj.xy / textureCoord.z;
// }

float linePlaneDistance(vec3 linePoint, vec3 lineSlope, vec3 planePoint, vec3 planeNormal) {
    return dot(planePoint - linePoint, planeNormal) / dot(lineSlope, planeNormal);
}

vec3 linePlaneIntersection(vec3 linePoint, vec3 lineSlope, vec3 planePoint, vec3 planeNormal) {
    float d = linePlaneDistance(linePoint, lineSlope, planePoint, planeNormal);
    return linePoint + lineSlope*d;
}


vec3 proj(vec4 a) {
    return a.xyz / a.w;
}

vec3 normalFromPartials(vec4 partials) {
    vec2 slope = partials.zw / (1. + partials.xy);
    vec3 normal = normalize(vec3(-slope, 1.));
    return faceforward(normal, -wavePositionNormal, normal); // TODO: is this nessecary?
}

// https://gpuopen.com/gdc-presentations/2019/gdc-2019-agtd6-interactive-water-simulation-in-atlas.pdf

float fresnel(vec3 wi, vec3 wn, vec3 secMoments) {
    const float R = pow(ETA - 1., 2.)/pow(ETA + 1., 2.);
    float alpha_v = sqrt(dot(secMoments.xy, wi.xy*wi.xy));
    return R + (1. - R)*pow(1. - dot(wi, wn), 5.*exp(-2.69*alpha_v)) / (1. + 22.7*pow(alpha_v, 1.5));
}

// TODO: environment map sampling using LEDAR maps for transmitted light
vec3 LEDAREnvironmentMapSampling(vec2 texcoords, vec3 worldPosition, vec3 wi) {
    const int SAMPLES = 3;
    const float SAMPLE_LENGTH = 0.9*3./5.;
    const float gammaCorrect = 0.3;
    const vec3 macronormal = vec3(0, 0, 1.); // TODO: is this right?
    const vec3 mesonormal = vec3(0, 0, 1.); // TODO: is mesonormal always (0, 0, 1)?

    vec2 firstMoments = texture(waveMoments, texcoords).xy;
    vec3 secMoments = texture(waveSecMoments, texcoords).xyz;

    vec2 sigma = sqrt(abs(secMoments.xy - firstMoments.xy*firstMoments.xy));
    float cxy = secMoments.z - firstMoments.x*firstMoments.y;
    float rxy = cxy/(sigma.x*sigma.y);
    float rxyTerm = sqrt(1. - rxy*rxy);
    float A = pow(2.*SAMPLE_LENGTH*max(sigma.x, sigma.y)/float(SAMPLES), 2.);

    float floorToPixels = floorPixels/floorSize;

    vec3 I = vec3(0, 0, 0);
    float S = 0.;

    for (int j = 0; j < SAMPLES; j++) {
        for (int k = 0; k < SAMPLES; k++) {
            float pj = float(j)*SAMPLE_LENGTH - SAMPLE_LENGTH*float((SAMPLES - 1) / 2);
            float pk = float(k)*SAMPLE_LENGTH - SAMPLE_LENGTH*float((SAMPLES - 1) / 2);
            float x = firstMoments.x + pj*sigma.x;
            float y = (rxy*pj + rxyTerm*pk)*sigma.y + firstMoments.y;
            vec3 wn = normalize(vec3(-x, -y, 1)); // micronormal
            float c = abs(dot(wi, wn));
            vec3 wt = (ETA*c - sign(dot(wi, macronormal))*sqrt(1. + ETA*ETA*(c*c - 1.)))*wn - ETA*wi; // transmitted direction (use refract?)
            wt = normalize(wt); // TODO: needed?
            // Real-time rendering of refracting transmissive objects with multi-scale rough surfaces Equation 4
            float eta_wtwn = INV_ETA*dot(wt, wn);
            float J = (pow(dot(wi, wn) + eta_wtwn, 2.) / (INV_ETA*abs(eta_wtwn)))*pow(dot(wn, macronormal), 3.);
            float alpha = J*A;

            const float maskingShadowing = 1.; // TODO

            vec2 W = exp(-0.5*pow(vec2(pj, pk), vec2(2., 2.)));
            float fresnel = 1. - fresnel(wi, wn, secMoments);
            float S_ = max(0., dot(wi, wn)) / dot(wn, macronormal);

            float d = linePlaneDistance(worldPosition, wt, floorPosition, floorNormal);
            float cos_theta = 1. - alpha / TWO_PI; // solid angle to half viewing angle
            float sin_theta = sqrt(1. - cos_theta*cos_theta);
            float cos_v = dot(wt, vec3(0, 0, -1.));
            float sin_v = length(cross(wt, vec3(0, 0, -1.)));
            // alpha*d^2*cos(theta)/cos(v - theta)
            float r_ratio = cos_v / (sin_v*sin_theta + cos_v*cos_theta);
            float projectedSolidAngle = alpha*d*d*r_ratio*r_ratio;
            float LOD = clamp(log2(projectedSolidAngle*floorToPixels*floorToPixels), 0., 8.);

            vec3 floorIntersect = worldPosition + d*wt;
            vec3 floorTex = floorTextureMatrix*vec3(floorIntersect.xy, 1.0);
            vec3 tex = textureProjLod(floorTexture, floorTex, LOD).xyz;
            // vec3 tex = textureProjLod(floorTexture, floorTex, 0.).xyz;

            S += W.x*W.y*S_;
            I += W.x*W.y*S*fresnel*maskingShadowing*tex;
        }
    }

    // return I / S;
    return (I / S)*gammaCorrect;
}

// TODO: environment map sampling using LEDAR maps for transmitted light
vec3 LEDARCheaper(vec2 texcoords, vec3 worldPosition, vec3 wi) {
    const float SAMPLE_LENGTH_SIGMA = 2.;
    const float gammaCorrect = 1.;
    const float lodBias = 4.;
    const vec3 macronormal = vec3(0, 0, 1.); // TODO: is this right?
    const vec3 mesonormal = vec3(0, 0, 1.); // TODO: is mesonormal always (0, 0, 1)?

    vec2 firstMoments = texture(waveMoments, texcoords).xy;
    vec3 secMoments = texture(waveSecMoments, texcoords).xyz;

    vec2 sigma = sqrt(abs(secMoments.xy - firstMoments.xy*firstMoments.xy));

    float floorToPixels = floorPixels/floorSize;

    // instead of sampling multiple values, sample ~1.5sigma using a texture lookup
    vec3 wn = normalize(vec3(-firstMoments.xy, 1.)); 
    // vec3 wn = v_wave_normal;
    // float c = abs(dot(wi, wn));
    // vec3 wt = (ETA*c - sign(dot(wi, macronormal))*sqrt(1. + ETA*ETA*(c*c - 1.)))*wn - ETA*wi;   
    vec3 wt = refract(wi, wn, ETA);

    float d = linePlaneDistance(worldPosition, wt, floorPosition, floorNormal);

    // Real-time rendering of refracting transmissive objects with multi-scale rough surfaces Equation 4
    float A = pow(2.*SAMPLE_LENGTH_SIGMA*max(sigma.x, sigma.y), 2.);
    float eta_wtwn = INV_ETA*abs(dot(wt, wn));
    // float J = pow(abs(dot(wi, wn)) + eta_wtwn, 2.) / (INV_ETA*eta_wtwn);
    float J = (pow(abs(dot(wi, wn)) + eta_wtwn, 2.) / (INV_ETA*abs(eta_wtwn)))*pow(dot(wn, macronormal), 3.);
    float alpha = J*A;
    
    float solidFootprint = max(alpha*d / abs(dot(wn, wt)), 0.);
    float lod = max(5., lodBias + log2(solidFootprint));

    // TODO: artifacting? (remove LOD clamp once fixed)
    vec3 floorIntersect = worldPosition + d*wt;
    vec3 floorTex = floorTextureMatrix*vec3(floorIntersect.xy, 1.0);
    vec3 tex = textureProjLod(floorTexture, floorTex, lod).xyz;

    float fresnel = 1. - fresnel(-wi, wn, secMoments);
    const float maskingShadowing = 1.; // TODO
    return tex*fresnel*maskingShadowing*gammaCorrect;

    // return vec3(firstMoments, 1.);
}

void main() {
    // rays are shot from the camera into a light or the great beyond
    // they refract/reflect once on the ocean surface, bounce against the floor, and refract again on the surface. 

    color = vec4(LEDARCheaper(v_wave_texcoords, v_position, v_camera_normal), 1.);
   
    // vec3 intersect = linePlaneIntersection(v_position, v_camera_normal, floorPosition, floorNormal);
    // vec3 texCoords = floorTextureMatrix*vec3(intersect.xy, 1.);
    // color = textureProjLod(floorTexture, texCoords, 8.);
}
