vec2 firstMomentsList[FILTER_COUNT];
firstMomentsList[0] = waveBlending[0]*textureBicubic(waveMoments[0], v_wave_tex_uv[0]).xy;
firstMomentsList[1] = waveBlending[1]*textureBicubic(waveMoments[1], v_wave_tex_uv[1]).xy;
    
vec3 secMomentsList[FILTER_COUNT];
secMomentsList[0] = waveBlending[0]*textureBicubic(waveSecMoments[0], v_wave_tex_uv[0]).xyz;
secMomentsList[1] = waveBlending[1]*textureBicubic(waveSecMoments[1], v_wave_tex_uv[1]).xyz;

vec2 firstMoments = combineFirstMoments(firstMomentsList);
vec3 secMoments = combineSecondMoments(firstMomentsList, secMomentsList);
float cxy = secMoments.z - firstMoments.x*firstMoments.y;
vec3 camera_normal = normalize(v_position - cameraPosition);
