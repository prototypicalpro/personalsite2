import * as THREE from "three";
import { stripHeader } from "./GLUtils";

import makeTexVert from "./glsl/maketex.vert.glsl";
import makeTexFrag from "./glsl/maketex.frag.glsl";

export default class MakeTex {
    // copy verticies into textures using a render pass
    // figure it's faster than using a manual copy and vertex pulling

    readonly pts: number;

    makeTexMat: THREE.RawShaderMaterial;
    makeTexMesh: THREE.Points;
    blankCamera: THREE.Camera;
    renderTargets: THREE.WebGLMultipleRenderTargets;

    constructor(
        pts: number,
        posBufAt: THREE.BufferAttribute,
        partBufAt: THREE.BufferAttribute
    ) {
        this.pts = pts;

        this.blankCamera = new THREE.Camera();
        this.blankCamera.position.z = 1;

        this.makeTexMat = new THREE.RawShaderMaterial({
            glslVersion: THREE.GLSL3,
            vertexShader: stripHeader(makeTexVert),
            fragmentShader: stripHeader(makeTexFrag),
        });

        const geo = new THREE.BufferGeometry();

        // position is center of every pixel
        const rescale = 2 / pts;
        const off = 1 / pts;
        const coords = new Float32Array({ length: pts ** 2 * 3 });
        let index = 0;
        for (let y = 0; y < pts; y++) {
            for (let x = 0; x < pts; x++) {
                coords[index++] = x * rescale + off - 1;
                coords[index++] = y * rescale + off - 1;
                coords[index++] = 0;
            }
        }

        geo.setAttribute("position", new THREE.BufferAttribute(coords, 3));
        geo.setAttribute("wavePosition", posBufAt);
        geo.setAttribute("wavePartial", partBufAt);

        this.makeTexMesh = new THREE.Points(geo, this.makeTexMat);

        this.renderTargets = new THREE.WebGLMultipleRenderTargets(pts, pts, 3, {
            magFilter: THREE.NearestFilter,
            minFilter: THREE.NearestFilter,
            depthBuffer: false,
            type: THREE.FloatType,
            format: THREE.RGBAFormat,
        });
        this.renderTargets.texture[0].name = "position";
        this.renderTargets.texture[1].name = "partial";
        this.renderTargets.texture[2].name = "normal";
    }

    render(renderer: THREE.WebGLRenderer) {
        if (!this.makeTexMesh.geometry.attributes["wavePosition"].array)
            throw new Error("Geometry attributes not updated!");

        renderer.setRenderTarget(this.renderTargets);
        renderer.render(this.makeTexMesh, this.blankCamera);
    }

    getPositionTex() {
        return this.renderTargets.texture[0];
    }

    getPartialTex() {
        return this.renderTargets.texture[1];
    }

    getNormalTex() {
        return this.renderTargets.texture[2];
    }
}
