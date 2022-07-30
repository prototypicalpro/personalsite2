#version 300 es

// camera/world position matricies
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform vec3 cameraPosition;

in vec4 position; // (x, y, z, dxy)

/// end-pre-strip ///

precision highp float;
precision highp int;
precision highp sampler2D;

const float TWO_PI = 6.28318530717958647693;
const float AIR_REFRACT = 1.;
const float WATER_REFRACT = 4./3.;

// floor position matricies, relative to world space
const vec3 floorNormal = vec3(0., 0., 1.);  // always upwards relative to world
uniform vec3 floorPosition;
uniform mat3 floorTextureMatrix; // world space -> floor texture space

// light position relative to world space
uniform vec3 lightNormal;
uniform vec3 lightPosition;

// XYZ of the wave surface, row major
uniform sampler2D wavePosition; // (x, y, z, dxy)
uniform sampler2D wavePartial; // (dxx, dyy, dzx, dzy)
uniform sampler2D waveNormal;
// position and scale of the wave surface (world space)
uniform vec3 wavePositionPoint;
const vec3 wavePositionNormal = vec3(0., 0., 1.); // always upwards relative to world
// matricies to translate world space <-> wave object space
uniform mat4 waveModelMatrix;
uniform mat4 waveModelMatrixInverse;
uniform mat3 waveTextureMatrix; // object space -> texture space
uniform mat3 waveNormalMatrix;
uniform mat3 waveNormalMatrixInverse;

in vec4 partial; // (dxx, dyy, dzx, dzy)

out vec4 v_output; // xyz where the floor intersect occurs

vec3 linePlaneIntersection(vec3 linePoint, vec3 lineSlope, vec3 planePoint, vec3 planeNormal) {
    float d = dot(planePoint - linePoint, planeNormal) / dot(lineSlope, planeNormal);
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

void main() {
    // rays are shot from the camera into a light or the great beyond
    // they refract/reflect once on the ocean surface, bounce against the floor, and refract again on the surface. 

    // set GL position based on the provided matricies
	gl_Position = projectionMatrix*modelViewMatrix*vec4( position.xyz, 1.0 );
    vec3 modelPosition = proj(waveModelMatrix*vec4( position.xyz, 1.0 ));

    // determine surface normal by lookup
    // assume surface uses xy coordinates in object space
    vec3 normal = normalFromPartials(partial);

    // compute camera normal using camera position
    vec3 cameraNormal = normalize(modelPosition.xyz - cameraPosition)*vec3(-1, -1, 1); // TODO: why reverse X and Y?

    // determine normal of transmitted light ray from ocean surface
    // use the world space for calculations
    const float refractIdx = AIR_REFRACT / WATER_REFRACT;
    vec3 surfNormal = waveNormalMatrix*normal;
    // float dotProd = -surfNormal.x; // (0, 0, -1) dot surfNormal
    // float crossProdLen = length(surfNormal.xy); // |(0, 0, -1) cross surfNormal|
    // float factor = sqrt(1. - refractIdx*refractIdx*crossProdLen*crossProdLen);
    // float gamma = refractIdx*dotProd + (dotProd >= 0. ? factor : -factor);
    // vec3 surfTransmitNormal = vec3(0, 0, -refractIdx) + gamma*surfNormal;
    // TODO: cameraNormal needs to be projected according to perspective
    vec3 surfTransmitVector = refract(cameraNormal, surfNormal, refractIdx);

    // determine the normal of the reflected light ray from the ocean floor
    vec3 floorReflectVector = reflect(surfTransmitVector, floorNormal);

    // find the point where the reflection occurs
    vec3 floorIntersect = linePlaneIntersection(modelPosition, surfTransmitVector, floorPosition, floorNormal);

    // assume floor vector points straight up

    // debug
    // vec3 intersectObj = proj(waveModelMatrixInverse*vec4(floorIntersect, 1.));
    // v_output = vec4(waveTextureMatrix*vec3(intersectObj.xy, 1.), 1.);

    // guess an intersection with the wave surface
    vec3 intersectGuess = linePlaneIntersection(floorIntersect, floorReflectVector, wavePositionPoint, wavePositionNormal);
    vec3 intersectGuessObj = proj(waveModelMatrixInverse*vec4(intersectGuess, 1.0));
    vec3 floorReflectVectorObj = waveNormalMatrixInverse*floorReflectVector;
    vec3 floorIntersectObj = proj(waveModelMatrixInverse*vec4(floorIntersect, 1.0));
    
    // use newtons method to refine guess
    // vec3 pointTex = waveTextureMatrix*vec3(intersectGuessObj.xy, 1.0);
    // vec4 waveSurfaceGuessObj = textureProj(wavePosition, pointTex);
    // vec4 waveSurfaceGuessPartials = textureProj(wavePartial, pointTex);
    // // compute inverse jacobian
    // float dxx = waveSurfaceGuessPartials.x; float dyy = waveSurfaceGuessPartials.y; float dzx = waveSurfaceGuessPartials.z; float dzy = waveSurfaceGuessPartials.w;
    // float dxy = waveSurfaceGuessObj.w;
    // float dx = floorReflectVectorObj.x; float dy = floorReflectVectorObj.y; float dz = floorReflectVectorObj.z;
    // mat2 dxdzmat = dy*mat2(dxx, dzx, dxy, dzy);
    // mat2 dymat = mat2(dx*dxy, dz*dxy, dx*dyy, dz*dyy);
    // mat2 invJacobian = inverse(dxdzmat - dymat);
   
    // // compute next point using newtons method
    // vec4 lineEq = (waveSurfaceGuessObj.xyz - floorIntersectObj).xyzy*vec4(dy, dx, dy, dz);
    // vec2 fx = lineEq.xz - lineEq.yw;
    // vec2 guessTwo = intersectGuessObj.xy - invJacobian*fx;

    // todo: we could refine x and y to subvertex level
    vec3 pointTex = waveTextureMatrix*vec3(intersectGuessObj.xy, 1.0);
    vec4 waveSurfaceIntersectObject = textureProj(wavePosition, pointTex);
    // refine guess by moving based in the XY displacement (should be small)
    vec2 newGuess = intersectGuessObj.xy - (waveSurfaceIntersectObject.xy - intersectGuessObj.xy);
    // addiionally, move the guess forward based on the height
    float heightDiff = waveSurfaceIntersectObject.z - wavePositionPoint.z;
    newGuess += floorReflectVectorObj.xy*(heightDiff / floorReflectVectorObj.z);
    
    vec3 pointTex2 = waveTextureMatrix*vec3(newGuess, 1.0);
    waveSurfaceIntersectObject = textureProj(wavePosition, pointTex2);
    vec4 waveSurfaceOutIntersectPartials = textureProj(wavePartial, pointTex2);
    vec3 waveSurfaceOutIntersect = proj(waveModelMatrix*vec4(waveSurfaceIntersectObject.xyz, 1.0));
    vec3 waveSurfaceOutNormal = waveNormalMatrix*normalFromPartials(waveSurfaceOutIntersectPartials);
    
    // using the normal and position of the outgoing ray, compute what the ray will hit after it leaves the water
    // do not compute another reflection
    vec3 surfOutTransmitVector = refract(floorReflectVector, waveSurfaceOutNormal, 1. / refractIdx);

    vec3 lightIntersection = linePlaneIntersection(waveSurfaceOutIntersect, surfOutTransmitVector, lightPosition, lightNormal);
    float distanceTraveled = distance(waveSurfaceOutIntersect, lightIntersection);
    // do nothing with distance travelled for now, maybe alpha mask?
    

    // TODO: lighting, reflection, other stuff

    // debug: output the wave surface out normal in texture coordinates
    vec3 debugInstersectObj = proj(waveModelMatrixInverse*vec4(floorIntersect, 1.));
    v_output = vec4(floorTextureMatrix*vec3(debugInstersectObj.xy, 1.), 1.);
    
}
