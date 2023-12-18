import * as THREE from "three";
import { readMultipleRenderTargetPixels, stripHeader } from "./GLUtils";
import { WIDTH, FILTER_COUNT } from "./wasm_constants";

import makeTexVert from "./glsl/maketex.vert.glsl";
import makeTexFrag from "./glsl/maketex.frag.glsl";

export default class MakeTex {
    // copy verticies into textures using a render pass
    // figure it's faster than using a manual copy and vertex pulling
    makeTexMat: THREE.RawShaderMaterial;
    makeTexMeshs: THREE.Points[];
    blankCamera: THREE.Camera;
    renderTargets: THREE.WebGLMultipleRenderTargets[];

    constructor(
        posBufs: THREE.BufferAttribute[],
        partBufs: THREE.BufferAttribute[]
    ) {
        this.blankCamera = new THREE.Camera();
        this.blankCamera.position.z = 1;

        this.makeTexMat = new THREE.RawShaderMaterial({
            glslVersion: THREE.GLSL3,
            vertexShader: stripHeader(makeTexVert),
            fragmentShader: stripHeader(makeTexFrag),
        });

        // position is center of every pixel
        const rescale = 2 / WIDTH;
        const off = 1 / WIDTH;
        const coords = new Float32Array({ length: WIDTH ** 2 * 3 });
        let index = 0;
        for (let y = 0; y < WIDTH; y++) {
            for (let x = 0; x < WIDTH; x++) {
                coords[index++] = x * rescale + off - 1;
                coords[index++] = y * rescale + off - 1;
                coords[index++] = 0;
            }
        }

        this.makeTexMeshs = [];
        for (let i = 0; i < FILTER_COUNT; i++) {
            const newGeo = new THREE.BufferGeometry();
            newGeo.setAttribute(
                "position",
                new THREE.BufferAttribute(coords, 3)
            );
            newGeo.setAttribute(`wavePosition`, posBufs[i]);
            newGeo.setAttribute(`wavePartial`, partBufs[i]);
            this.makeTexMeshs.push(new THREE.Points(newGeo, this.makeTexMat));
        }

        this.renderTargets = new Array(FILTER_COUNT).fill(0).map(
            () =>
                new THREE.WebGLMultipleRenderTargets(WIDTH, WIDTH, 3, {
                    magFilter: THREE.LinearFilter,
                    minFilter: THREE.LinearMipmapLinearFilter,
                    depthBuffer: false,
                    stencilBuffer: false,
                    type: THREE.FloatType,
                    format: THREE.RGBAFormat,
                    generateMipmaps: true,
                    wrapS: THREE.RepeatWrapping,
                    wrapT: THREE.RepeatWrapping,
                })
        );
    }

    render(renderer: THREE.WebGLRenderer) {
        // console.log(this.makeTexMeshs);
        if (
            !(
                this.makeTexMeshs[0].geometry.attributes[
                    "wavePosition"
                ] as THREE.BufferAttribute
            ).array
        )
            throw new Error("Geometry attributes not updated!");

        for (let i = 0; i < FILTER_COUNT; i++) {
            renderer.setRenderTarget(this.renderTargets[i]);
            renderer.render(this.makeTexMeshs[i], this.blankCamera);

            // const out = new Float32Array(WIDTH * WIDTH * 4);
            // readMultipleRenderTargetPixels(
            //     renderer,
            //     this.renderTargets[i],
            //     0,
            //     WIDTH,
            //     out
            // );
            // console.log(out);
        }
    }

    getDisplacementTexs() {
        return this.renderTargets.map((r) => r.texture[0]);
    }

    getFirstMomentTexs() {
        return this.renderTargets.map((r) => r.texture[1]);
    }

    getSecondMomentTexs() {
        return this.renderTargets.map((r) => r.texture[2]);
    }
}
