import * as THREE from "three";
import { stripHeader } from "./GLUtils.mjs";

import makeTexVert from "../glsl/maketex.vert.glsl";
import makeTexFrag from "../glsl/maketex.frag.glsl";

export const enum TextureType {
    Displacement = 0,
    FirstMoment = 1,
    SecondMoment = 2,
}

export default class MakeTex {
    makeTexMat: THREE.RawShaderMaterial;
    makeTexMeshs: THREE.Points[];
    blankCamera: THREE.Camera;
    renderTargets: THREE.WebGLRenderTarget<THREE.Texture>[];

    constructor(
        posBufs: THREE.BufferAttribute[],
        partBufs: THREE.BufferAttribute[],
        private readonly width: number,
        private readonly filterCount: number,
        hasLinearTextures: boolean,
    ) {
        this.blankCamera = new THREE.Camera();
        this.blankCamera.position.z = 1;

        this.makeTexMat = new THREE.RawShaderMaterial({
            glslVersion: THREE.GLSL3,
            vertexShader: stripHeader(makeTexVert),
            fragmentShader: stripHeader(makeTexFrag),
        });

        // position is center of every pixel
        const rescale = 2 / this.width;
        const off = 1 / this.width;
        const coords = new Float32Array({ length: this.width ** 2 * 3 });
        let index = 0;
        for (let y = 0; y < this.width; y++) {
            for (let x = 0; x < this.width; x++) {
                coords[index++] = x * rescale + off - 1;
                coords[index++] = y * rescale + off - 1;
                coords[index++] = 0;
            }
        }

        this.makeTexMeshs = [];
        for (let i = 0; i < this.filterCount; i++) {
            const newGeo = new THREE.BufferGeometry();
            newGeo.setAttribute(
                "position",
                new THREE.BufferAttribute(coords, 3),
            );
            newGeo.setAttribute(`wavePosition`, posBufs[i]);
            newGeo.setAttribute(`wavePartial`, partBufs[i]);
            this.makeTexMeshs.push(new THREE.Points(newGeo, this.makeTexMat));
        }

        this.renderTargets = new Array(this.filterCount).fill(0).map(
            () =>
                new THREE.WebGLRenderTarget(this.width, this.width, {
                    count: 3,
                    magFilter: hasLinearTextures
                        ? THREE.LinearFilter
                        : THREE.NearestFilter,
                    minFilter: THREE.NearestFilter,
                    depthBuffer: false,
                    stencilBuffer: false,
                    type: THREE.FloatType,
                    generateMipmaps: true,
                    wrapS: THREE.RepeatWrapping,
                    wrapT: THREE.RepeatWrapping,
                    format: THREE.RGBAFormat,
                }),
        );
    }

    render(renderer: THREE.WebGLRenderer) {
        if (
            !(
                this.makeTexMeshs[0].geometry.attributes[
                    "wavePosition"
                ] as THREE.BufferAttribute
            ).array
        )
            throw new Error("Geometry attributes not updated!");

        for (let i = 0; i < this.filterCount; i++) {
            renderer.setRenderTarget(this.renderTargets[i]);
            renderer.render(this.makeTexMeshs[i], this.blankCamera);
        }
    }

    getDisplacementTexs() {
        return this.renderTargets.map(
            (r) => r.textures[TextureType.Displacement],
        );
    }

    getFirstMomentTexs() {
        return this.renderTargets.map(
            (r) => r.textures[TextureType.FirstMoment],
        );
    }

    getSecondMomentTexs() {
        return this.renderTargets.map(
            (r) => r.textures[TextureType.SecondMoment],
        );
    }
}
