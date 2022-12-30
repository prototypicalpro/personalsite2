import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
    stripHeader,
    makeDataTexture,
    makeRenderTarget,
    readMultipleRenderTargetPixels,
} from "./GLUtils";
import { WorkerHandlers } from "./wasm_worker_types";
import MakeTex from "./MakeTex";

import raytraceVert from "./glsl/raytrace.vert.glsl";
import raytraceFrag from "./glsl/raytrace.frag.glsl";

// import Tex from "./img/debug.jpg";
// import Tex from "./img/tex.jpg";
import Tex from "./img/shapes.jpg";

const POINTS = 512;

export default class View {
    static readonly waveProps = {
        domain: 10,
        depth: 5,
        wind_speed: 5,
        fetch: 5000,
        damping: 3.33,
        swell: 0,
    };

    worker: WorkerHandlers;
    renderer: THREE.WebGLRenderer;
    camera: THREE.Camera;
    waveGeo: THREE.BufferGeometry;
    waveGeoPos: THREE.BufferAttribute;
    waveGeoPart: THREE.BufferAttribute;
    waveMesh: THREE.Mesh;
    controls: OrbitControls;

    private debugRenderTarget: THREE.WebGLRenderTarget;

    makeTex: MakeTex;
    private memory: WebAssembly.Memory;
    private posPtr: number;
    private partPtr: number;
    private bufLen: number;

    backTex: THREE.Texture;

    constructor(
        canvasElem: HTMLCanvasElement,
        tex: THREE.Texture,
        worker: WorkerHandlers,
        memory: [WebAssembly.Memory, number, number, number]
    ) {
        [this.memory, this.posPtr, this.partPtr, this.bufLen] = memory;

        this.worker = worker;
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvasElem,
            stencil: false,
            depth: false,
            powerPreference: "high-performance",
        });
        this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000);
        this.camera.position.z = 130;

        this.controls = new OrbitControls(this.camera, canvasElem);
        this.controls.target.set(0, 0, 0);
        this.controls.update();

        this.backTex = tex;
        this.backTex.wrapS = THREE.RepeatWrapping;
        this.backTex.wrapT = THREE.RepeatWrapping;
        this.backTex.magFilter = THREE.LinearFilter;
        this.backTex.minFilter = THREE.LinearMipMapLinearFilter;

        this.waveGeoPos = new THREE.BufferAttribute(undefined, 4);
        this.waveGeoPos.setUsage(THREE.StreamDrawUsage);
        this.waveGeo = new THREE.BufferGeometry();
        this.waveGeo.setAttribute("position", this.waveGeoPos); // array will be set later

        this.waveGeoPart = new THREE.BufferAttribute(undefined, 4);
        this.waveGeoPart.setUsage(THREE.StreamDrawUsage);
        this.waveGeo.setAttribute("partial", this.waveGeoPart); // array will be set later

        this.makeTex = new MakeTex(POINTS, this.waveGeoPos, this.waveGeoPart);

        const indices = [];
        for (let iy = 0; iy < POINTS - 1; iy++) {
            for (let ix = 0; ix < POINTS - 1; ix++) {
                const a = ix + POINTS * iy;
                const b = ix + POINTS * (iy + 1);
                const c = ix + 1 + POINTS * (iy + 1);
                const d = ix + 1 + POINTS * iy;

                indices.push(a, b, d);
                indices.push(b, c, d);
            }
        }
        this.waveGeo.setIndex(indices);

        const shaderMaterial = new THREE.ShaderMaterial({
            glslVersion: THREE.GLSL3,
            fragmentShader: stripHeader(raytraceFrag),
            vertexShader: stripHeader(raytraceVert),
            uniforms: this.makeRaytraceUniforms(),
        });

        this.waveMesh = new THREE.Mesh(this.waveGeo, shaderMaterial);

        this.debugRenderTarget = makeRenderTarget(POINTS, POINTS, 4);

        // dudv map
        // fresnel reflection
        // scattering/attenuation
        // shadows?
        // https://gpuopen.com/gdc-presentations/2019/gdc-2019-agtd6-interactive-water-simulation-in-atlas.pdf
    }

    static async MakeView(
        canvasElem: HTMLCanvasElement,
        worker: WorkerHandlers
    ) {
        const mem = await worker.memoryView();
        await worker.setup(View.waveProps);
        const tex = await new THREE.TextureLoader().loadAsync(Tex);

        return new View(canvasElem, tex, worker, mem);
    }

    private makeRaytraceUniforms() {
        const wavePosition = new THREE.Object3D();
        wavePosition.position.set(0, 0, 0);
        wavePosition.lookAt(0, 0, 1);

        const waveNormalMatrix = new THREE.Matrix3().getNormalMatrix(
            wavePosition.matrixWorld
        );
        const waveNormalInverse = waveNormalMatrix.invert();
        const waveTextureMatrix = new THREE.Matrix3().setUvTransform(
            0.5,
            0.5,
            1 / View.waveProps.domain,
            -1 / View.waveProps.domain,
            0,
            0,
            0
        );
        const floorTextureMatrix = new THREE.Matrix3().setUvTransform(
            0.5,
            0.5,
            1 / View.waveProps.domain,
            1 / View.waveProps.domain,
            0,
            0,
            0
        );
        const light = new THREE.Object3D();
        light.position.set(2, 2, 2);
        light.lookAt(0, 0, 0);
        const lightNormal = new THREE.Vector3();
        light.getWorldDirection(lightNormal);

        const waveUniforms = {
            wavePosition: new THREE.Uniform(this.makeTex.getPositionTex()),
            waveMoments: new THREE.Uniform(this.makeTex.getFirstMomentsTex()),
            waveSecMoments: new THREE.Uniform(this.makeTex.getSecMomentsTex()),
            wavePositionPoint: new THREE.Uniform(wavePosition.position),
            waveModelMatrix: new THREE.Uniform(wavePosition.matrixWorld),
            waveModelMatrixInverse: new THREE.Uniform(
                wavePosition.matrixWorld.invert()
            ),
            waveTextureMatrix: new THREE.Uniform(waveTextureMatrix),
            waveNormalMatrix: new THREE.Uniform(waveNormalMatrix),
            waveNormalMatrixInverse: new THREE.Uniform(waveNormalInverse),
        };

        return {
            ...waveUniforms,

            floorPosition: new THREE.Uniform(
                new THREE.Vector3(0, 0, -View.waveProps.depth)
            ),
            floorTextureMatrix: new THREE.Uniform(floorTextureMatrix),
            floorTexture: new THREE.Uniform(this.backTex),
            floorSize: new THREE.Uniform(View.waveProps.domain),
            floorPixels: new THREE.Uniform(this.backTex.image.width),

            lightNormal: new THREE.Uniform(light.position),
            lightPosition: new THREE.Uniform(lightNormal),
        };
    }

    public async update(secs: number) {
        await this.worker.render({ time: secs });

        const posView = new Float32Array(
            this.memory.buffer,
            this.posPtr,
            this.bufLen / Float32Array.BYTES_PER_ELEMENT
        );
        const partView = new Float32Array(
            this.memory.buffer,
            this.partPtr,
            this.bufLen / Float32Array.BYTES_PER_ELEMENT
        );

        this.waveGeoPos.array = posView;
        this.waveGeoPos.count = posView.length / this.waveGeoPos.itemSize;
        this.waveGeoPos.needsUpdate = true;

        this.waveGeoPart.array = partView;
        this.waveGeoPart.count = partView.length / this.waveGeoPart.itemSize;
        this.waveGeoPart.needsUpdate = true;

        this.makeTex.render(this.renderer);

        const out = new Float32Array(POINTS ** 2 * 4);
        // readMultipleRenderTargetPixels(
        //     this.renderer,
        //     this.makeTex.renderTargets,
        //     0,
        //     POINTS,
        //     out
        // );
        // console.log(out);

        this.renderer.setRenderTarget(null);
        this.renderer.render(this.waveMesh, this.camera);

        // this.renderer.setRenderTarget(this.debugRenderTarget);
        // this.renderer.render(this.waveMesh, this.camera);
        // this.renderer.readRenderTargetPixels(
        //     this.debugRenderTarget,
        //     0,
        //     0,
        //     512,
        //     512,
        //     out
        // );
        // console.log(out);
    }
}
