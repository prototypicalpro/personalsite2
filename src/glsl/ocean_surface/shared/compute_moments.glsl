vec2 firstMomentsList[FILTER_COUNT] = vec2[FILTER_COUNT](
    waveBlending[0]*textureBicubic(waveMoments[0], v_wave_tex_uv[0]).xy,
    waveBlending[1]*textureBicubic(waveMoments[1], v_wave_tex_uv[1]).xy,
    waveBlending[2]*textureBicubic(waveMoments[2], v_wave_tex_uv[2]).xy
);
vec3 secMomentsList[FILTER_COUNT] = vec3[FILTER_COUNT](
    waveBlending[0]*textureBicubic(waveSecMoments[0], v_wave_tex_uv[0]).xyz,
    waveBlending[1]*textureBicubic(waveSecMoments[1], v_wave_tex_uv[1]).xyz,
    waveBlending[2]*textureBicubic(waveSecMoments[2], v_wave_tex_uv[2]).xyz
);

vec2 firstMoments = combineFirstMoments(firstMomentsList);
vec3 secMoments = combineSecondMoments(firstMomentsList, secMomentsList);
float cxy = secMoments.z - firstMoments.x*firstMoments.y;
vec3 camera_normal = normalize(v_position - cameraPosition);
