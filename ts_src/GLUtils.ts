import * as THREE from "three";
import { WebGLMultipleRenderTargets, WebGLRenderer } from "three";

// strip #version 300 es from the shader, since threejs adds it back?
export function stripHeader(shader: string) {
    const search_str = "/// end-pre-strip ///\n";
    const found = shader.indexOf(search_str);
    if (found < 0)
        throw new Error("Invalid shader found when stripping header");
    return shader.slice(found + search_str.length);
}

export function getFormatForChannels(channels: number): THREE.PixelFormat {
    if (channels <= 0 || channels > 4)
        throw new Error(`Illegal channel count ${channels}`);
    switch (channels) {
        case 1:
            return THREE.RedFormat;
        case 2:
            return THREE.RGFormat;
        case 3:
            return THREE.RGBFormat;
        case 4:
            return THREE.RGBAFormat;
    }
}

export function makeDataTexture(
    ray: Float32Array,
    w: number,
    h: number,
    channels: number
) {
    const ret = new THREE.DataTexture(
        ray,
        w,
        h,
        getFormatForChannels(channels),
        THREE.FloatType
    );
    ret.needsUpdate = true;
    return ret;
}

export function allocDataTexture(w: number, h: number, channels: number) {
    return new THREE.DataTexture(
        null,
        w,
        h,
        getFormatForChannels(channels),
        THREE.FloatType
    );
}

export function makeRenderTarget(w: number, h: number, channels: number) {
    const targetOpts: THREE.WebGLRenderTargetOptions = {
        magFilter: THREE.NearestFilter,
        minFilter: THREE.NearestFilter,
        format: getFormatForChannels(channels),
        type: THREE.FloatType,
        depthBuffer: false,
    };
    return new THREE.WebGLRenderTarget(w, h, targetOpts);
}

export function readMultipleRenderTargetPixels(
    renderer: WebGLRenderer,
    target: WebGLMultipleRenderTargets,
    index: number,
    wh: number,
    buffer: any
) {
    const framebuffer: WebGLFramebuffer =
        renderer.properties.get(target).__webglFramebuffer;
    const gl = renderer.getContext() as WebGL2RenderingContext;
    renderer.state.bindFramebuffer(gl.READ_FRAMEBUFFER, framebuffer);
    const texture = renderer.properties.get(
        target.texture[index]
    ).__webglTexture;
    gl.framebufferTexture2D(
        gl.READ_FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0 + index,
        gl.TEXTURE_2D,
        texture,
        0
    );
    gl.readBuffer(gl.COLOR_ATTACHMENT0 + index);
    gl.readPixels(0, 0, wh, wh, gl.RGBA, gl.FLOAT, buffer);

    renderer.state.bindFramebuffer(gl.READ_FRAMEBUFFER, null);
}
