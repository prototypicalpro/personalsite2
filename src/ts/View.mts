import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { stripHeader } from "./GLUtils.mjs";
// import { WorkerHandlers } from "./wasm_worker_types.mjs";
import WasmWaves from "./WasmWaves.mjs";
import {
    PACKED_SIZE_BYTES,
    PACKED_SIZE_FLOATS,
    FILTER_COUNT,
    PACKED_SIZE,
} from "./wasm_constants.mjs";
import MakeTex from "./MakeTex.mjs";

import oceanVert from "../glsl/ocean_surface/ocean.vert.glsl";
import oilslickFrag from "../glsl/ocean_surface/oilslick.frag.glsl";

// Shaders I wrote but never used
// import hueFrag from "./glsl/ocean_surface/huewheel.frag.glsl";
// import leadrFrag from "./glsl/ocean_surface/leadr.frag.glsl";
// import toonFrag from "./glsl/ocean_surface/toon.frag.glsl";

export default class View {
    static readonly waveProps = {
        windows: [0.13, 5, 5, 10],
        blending: [0.6, 1],
        timeScale: 0.5,
        segments: 128,
        depth: 100,
        visualDepth: 1,
        wind_speed: 5,
        fetch: 2000,
        damping: 3.3,
        swell: 0.7,
        rad_off: (-60 * Math.PI) / 180,
        tiling_off: 0.1,
        LeadrSampleCount: 3,
        LeadrSampleSize: 1.8,
    };

    static readonly sunDirection = new THREE.Vector3(-2, 0, -1).normalize();
    static readonly sunColor = new THREE.Color(1, 0.8, 0.9);

    wasmWaves: WasmWaves;
    renderer: THREE.WebGLRenderer;
    camera: THREE.Camera;
    scene: THREE.Scene;
    wavePosBufs: THREE.BufferAttribute[];
    wavePartialBufs: THREE.BufferAttribute[];
    oceanGeo: THREE.PlaneGeometry;
    oceanMeshList: THREE.Mesh[] = [];
    controls: OrbitControls;
    backTex: THREE.Texture;

    makeTex: MakeTex;
    private posPtr: number;
    private partPtr: number;

    private renderWavesPromise: Promise<void> = Promise.resolve();

    constructor(
        canvasElem: HTMLCanvasElement,
        tex: THREE.Texture,
        wasmWaves: WasmWaves,
        public memory: WebAssembly.Memory,
        ptrs: [number, number],
    ) {
        [this.posPtr, this.partPtr] = ptrs;
        this.wasmWaves = wasmWaves;

        this.renderer = new THREE.WebGLRenderer({
            canvas: canvasElem,
            stencil: false,
            depth: true,
            antialias: true,
            powerPreference: "high-performance",
        });
        this.resizeCanvas();

        this.wavePartialBufs = new Array(FILTER_COUNT)
            .fill(0)
            .map(() => new THREE.BufferAttribute(undefined, 4));
        this.wavePartialBufs.forEach((w) => w.setUsage(THREE.StreamDrawUsage));
        this.wavePosBufs = new Array(FILTER_COUNT)
            .fill(0)
            .map(() => new THREE.BufferAttribute(undefined, 4));
        this.wavePosBufs.forEach((w) => w.setUsage(THREE.StreamDrawUsage));

        this.makeTex = new MakeTex(this.wavePosBufs, this.wavePartialBufs);

        this.camera = new THREE.PerspectiveCamera(50, 1, 0.2, 10000);
        this.scene = new THREE.Scene();

        this.controls = new OrbitControls(this.camera, canvasElem);
        this.camera.position.set(0, 0, 9);
        this.controls.target.set(0, 0, 0);
        this.controls.update();

        this.backTex = tex;
        this.backTex.wrapS = THREE.RepeatWrapping;
        this.backTex.wrapT = THREE.RepeatWrapping;
        this.backTex.magFilter = THREE.LinearFilter;
        this.backTex.minFilter = THREE.LinearMipMapLinearFilter;

        this.oceanGeo = new THREE.PlaneGeometry(
            View.getDomain(),
            View.getDomain(),
            View.waveProps.segments,
            View.waveProps.segments,
        );

        const uniformsBase = this.makeRaytraceUniforms();
        const definesBase = this.makeRaytraceDefines();
        const shaderMaterial = new THREE.ShaderMaterial({
            glslVersion: THREE.GLSL3,
            vertexShader: stripHeader(oceanVert),
            fragmentShader: stripHeader(oilslickFrag),
            uniforms: uniformsBase,
            defines: definesBase,
        });
        const mesh = new THREE.Mesh(this.oceanGeo, shaderMaterial);
        mesh.position.set(0, 0, 0);
        this.scene.add(mesh);
    }

    static async MakeView(
        canvasElem: HTMLCanvasElement,
        image: HTMLImageElement,
    ) {
        console.log(image);
        const tex = new THREE.Texture(image);
        tex.needsUpdate = true;
        const worker = await WasmWaves.MakeWasmWaves(View.waveProps);
        const wasmWavesMem = worker.memory;
        const ptrs = worker.getPtrs();

        return new View(canvasElem, tex, worker, wasmWavesMem, ptrs);
    }

    private static makeWaveTextureUvTransform(
        domainFrac: [number, number],
        offset: [number, number],
    ) {
        const waveTextureMatrix = [];
        for (let i = 0; i < FILTER_COUNT; i++) {
            const tile_off = View.waveProps.tiling_off * Math.pow(10, -i);
            const child_domain = View.waveProps.windows[i * 2 + 1];
            waveTextureMatrix.push(
                new THREE.Matrix3().setUvTransform(
                    offset[0] + tile_off,
                    offset[1] + tile_off,
                    domainFrac[0] / child_domain,
                    domainFrac[1] / child_domain,
                    0,
                    0,
                    0,
                ),
            );
        }
        return waveTextureMatrix;
    }

    static getDomain() {
        return View.waveProps.windows[View.waveProps.windows.length - 1];
    }

    private makeRaytraceDefines() {
        const { LeadrSampleCount, LeadrSampleSize } = View.waveProps;

        const halfSpace = (LeadrSampleSize * (LeadrSampleCount - 1)) / 2;
        const pRay = Array.from(
            { length: LeadrSampleCount },
            (_v, i) => LeadrSampleSize * i - halfSpace,
        );
        const weights = pRay.map((p) => Math.exp(-0.5 * p * p));
        const preinitVals = pRay.flatMap((pj, j) =>
            pRay.map(
                (pi, i) => `vec4(${pj}, ${pi}, ${weights[j]}, ${weights[i]})`,
            ),
        );

        return {
            LEADR_SAMPLE_COUNT: LeadrSampleCount,
            LEADR_SAMPLE_SIZE: LeadrSampleSize.toPrecision(21),
            LEADR_WEIGHTS: preinitVals.join(", "),
        };
    }

    private makeRaytraceUniforms() {
        const { windows, blending } = View.waveProps;

        const floorTextureMatrix = new THREE.Matrix3().setUvTransform(
            0.5,
            0.5,
            1 / View.getDomain(),
            1 / View.getDomain(),
            0,
            0,
            0,
        );

        return {
            waveDisplacement: new THREE.Uniform(
                this.makeTex.getDisplacementTexs(),
            ),
            waveMoments: new THREE.Uniform(this.makeTex.getFirstMomentTexs()),
            waveSecMoments: new THREE.Uniform(
                this.makeTex.getSecondMomentTexs(),
            ),
            waveTextureMatrix: new THREE.Uniform(
                View.makeWaveTextureUvTransform([1, -1], [1, 1]),
            ),
            domain: new THREE.Uniform(View.getDomain()),
            floorPosition: new THREE.Uniform(
                new THREE.Vector3(0, 0, -View.waveProps.visualDepth),
            ),
            floorTextureMatrix: new THREE.Uniform(floorTextureMatrix),
            floorTexture: new THREE.Uniform(this.backTex),
            floorSize: new THREE.Uniform(View.getDomain()),
            floorPixels: new THREE.Uniform(this.backTex.image.width),
            sunDirection: new THREE.Uniform(View.sunDirection),
            sunColor: new THREE.Uniform(View.sunColor),
            skyboxTex: new THREE.Uniform(this.scene.background),
            waveBlending: new THREE.Uniform(blending),
        };
    }

    resizeCanvas() {
        const width = Math.min(
            window.visualViewport.width,
            window.visualViewport.height,
        );
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(width, width);
    }

    updateGeoBuffers(ptr: number, geoBufs: THREE.BufferAttribute[]) {
        for (let i = 0; i < FILTER_COUNT; i++) {
            const offset = PACKED_SIZE_BYTES * i;
            const floatView = new Float32Array(
                this.memory.buffer,
                ptr + offset,
                PACKED_SIZE_FLOATS,
            );
            geoBufs[i].array = floatView;
            (geoBufs[i].count as number) = PACKED_SIZE;
            geoBufs[i].needsUpdate = true;
        }
    }

    public async update(secs: number, updateWaves: boolean = true) {
        if (updateWaves) {
            await this.renderWavesPromise;
            this.updateGeoBuffers(this.posPtr, this.wavePosBufs);
            this.updateGeoBuffers(this.partPtr, this.wavePartialBufs);

            this.renderWavesPromise = this.renderWavesPromise.then(() =>
                this.wasmWaves.render({
                    time: secs * View.waveProps.timeScale,
                }),
            );

            this.makeTex.render(this.renderer);
        }

        this.controls.update();

        this.renderer.setRenderTarget(null);
        this.renderer.render(this.scene, this.camera);
    }
}
