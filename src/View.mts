import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { stripHeader, makeRenderTarget } from "./GLUtils.mjs";
import { WorkerHandlers } from "./wasm_worker_types.mjs";
import {
    WIDTH,
    PACKED_SIZE_BYTES,
    PACKED_SIZE_FLOATS,
    FILTER_COUNT,
    PACKED_SIZE,
} from "./wasm_constants.mjs";
import MakeTex from "./MakeTex.mjs";

import raytraceVert from "./glsl/raytrace.vert.glsl";
import raytraceFrag from "./glsl/raytrace.frag.glsl";

// import Tex from "./img/debug.jpg";
// import Tex from "./img/tex.jpg";
// import Tex from "./img/shapes.jpg";
// import Tex from "./img/e.png";
// import Tex from "./img/space.jpg";
import Tex from "./img/stars.jpg";
import im00 from "./img/skybox/im00.png";
import im01 from "./img/skybox/im01.png";
import im02 from "./img/skybox/im02.png";
import im10 from "./img/skybox/im10.png";
import im11 from "./img/skybox/im11.png";
import im12 from "./img/skybox/im12.png";
import MakeSkybox from "./MakeSkybox.mjs";

export default class View {
    static readonly waveProps = {
        windows: [0, 0.1, 0.1, 1, 1, 10] as [
            number,
            number,
            number,
            number,
            number,
            number,
        ],
        blending: [0.1, 0.5, 1],
        timeScale: 0.1,
        segments: 2048,
        depth: 10,
        visualDepth: 2,
        wind_speed: 10,
        fetch: 1000000,
        damping: 3.3,
        swell: 0.9,
        tiling_off: 0.1,
        LeadrSampleCount: 5,
        LeadrSampleSize: 1.8,
    };

    static readonly sunDirection = new THREE.Vector3(0, -6, -1).normalize();

    worker: WorkerHandlers;
    renderer: THREE.WebGLRenderer;
    camera: THREE.Camera;
    scene: THREE.Scene;
    wavePosBufs: THREE.BufferAttribute[];
    wavePartialBufs: THREE.BufferAttribute[];

    oceanGeo: THREE.PlaneGeometry;
    oceanMesh: THREE.Mesh;
    controls: OrbitControls;

    private debugRenderTarget: THREE.WebGLRenderTarget;

    makeTex: MakeTex;
    private memory: WebAssembly.Memory;
    private posPtr: number;
    private partPtr: number;

    backTex: THREE.Texture;

    makeSkybox: MakeSkybox;

    constructor(
        canvasElem: HTMLCanvasElement,
        tex: THREE.Texture,
        cubeTex: THREE.CubeTexture,
        worker: WorkerHandlers,
        memory: [WebAssembly.Memory, number, number],
    ) {
        [this.memory, this.posPtr, this.partPtr] = memory;

        this.worker = worker;
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvasElem,
            stencil: false,
            depth: false,
            antialias: true,
            powerPreference: "high-performance",
        });

        this.wavePartialBufs = new Array(FILTER_COUNT)
            .fill(0)
            .map(() => new THREE.BufferAttribute(undefined, 4));
        this.wavePartialBufs.forEach((w) => w.setUsage(THREE.StreamDrawUsage));
        this.wavePosBufs = new Array(FILTER_COUNT)
            .fill(0)
            .map(() => new THREE.BufferAttribute(undefined, 4));
        this.wavePosBufs.forEach((w) => w.setUsage(THREE.StreamDrawUsage));

        this.makeTex = new MakeTex(this.wavePosBufs, this.wavePartialBufs);

        this.camera = new THREE.PerspectiveCamera(90, 1, 0.1, 10000);
        this.camera.position.z = 1;

        this.makeSkybox = new MakeSkybox(View.sunDirection);

        this.scene = new THREE.Scene();

        this.controls = new OrbitControls(this.camera, canvasElem);
        this.controls.target.set(0, 0, 0);
        this.controls.update();

        this.backTex = tex;
        this.backTex.wrapS = THREE.RepeatWrapping;
        this.backTex.wrapT = THREE.RepeatWrapping;
        this.backTex.magFilter = THREE.LinearFilter;
        this.backTex.minFilter = THREE.LinearMipMapNearestFilter;

        // this.scene.background = this.makeSkybox.renderTarget.texture;
        this.scene.background = cubeTex;

        this.oceanGeo = new THREE.PlaneGeometry(
            View.waveProps.windows[5],
            View.waveProps.windows[5],
            View.waveProps.segments,
            View.waveProps.segments,
        );

        const shaderMaterial = new THREE.ShaderMaterial({
            glslVersion: THREE.GLSL3,
            fragmentShader: stripHeader(raytraceFrag),
            vertexShader: stripHeader(raytraceVert),
            uniforms: this.makeRaytraceUniforms(),
            defines: this.makeRaytraceDefines(),
        });

        this.oceanMesh = new THREE.Mesh(this.oceanGeo, shaderMaterial);
        this.scene.add(this.oceanMesh);

        this.debugRenderTarget = makeRenderTarget(WIDTH, WIDTH, 4);

        // dudv map
        // fresnel reflection
        // scattering/attenuation
        // shadows?
        // https://gpuopen.com/gdc-presentations/2019/gdc-2019-agtd6-interactive-water-simulation-in-atlas.pdf
    }

    static async MakeView(
        canvasElem: HTMLCanvasElement,
        worker: WorkerHandlers,
    ) {
        const mem = await worker.memoryView();
        await worker.setup(View.waveProps);
        const tex = await new THREE.TextureLoader().loadAsync(Tex);
        const cubeTex = await new THREE.CubeTextureLoader().loadAsync([
            // im12,
            // im10,
            // im01,
            // im00,
            // im11,
            // im02,
            im10, // px (270) clockwise
            im12, // nx (90)
            im11, // py (180)
            im02, // ny
            im01, // pz (180)
            im00, // nz
        ]);

        return new View(canvasElem, tex, cubeTex, worker, mem);
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
        const { tiling_off, windows, blending } = View.waveProps;
        const waveTextureMatrix = [];
        for (let i = 0; i < FILTER_COUNT; i++) {
            const child_domain = View.waveProps.windows[i * 2 + 1];

            const mat = new THREE.Matrix3().setUvTransform(
                0.5,
                0.5,
                1 / child_domain,
                -1 / child_domain,
                0,
                tiling_off, // TODO: offset
                tiling_off,
            );
            waveTextureMatrix.push(mat);
        }

        const floorTextureMatrix = new THREE.Matrix3().setUvTransform(
            0.5,
            0.5,
            1 / windows[5],
            1 / windows[5],
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
            waveTextureMatrix: new THREE.Uniform(waveTextureMatrix),
            domain: new THREE.Uniform(View.waveProps.windows[5]),
            floorPosition: new THREE.Uniform(
                new THREE.Vector3(0, 0, -View.waveProps.visualDepth),
            ),
            floorTextureMatrix: new THREE.Uniform(floorTextureMatrix),
            floorTexture: new THREE.Uniform(this.backTex),
            floorSize: new THREE.Uniform(windows[5]),
            floorPixels: new THREE.Uniform(this.backTex.image.width),
            sunDirection: new THREE.Uniform(View.sunDirection),
            sunColor: new THREE.Uniform(new THREE.Vector3(1, 1, 1)),
            // skyboxTex: new THREE.Uniform(this.makeSkybox.renderTarget.texture),
            skyboxTex: new THREE.Uniform(this.scene.background),
            waveBlending: new THREE.Uniform(blending),
        };
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

    public async update(secs: number) {
        // this.makeSkybox.render(this.renderer, secs);

        await this.worker.render({ time: secs * View.waveProps.timeScale });

        this.updateGeoBuffers(this.posPtr, this.wavePosBufs);
        this.updateGeoBuffers(this.partPtr, this.wavePartialBufs);
        this.makeTex.render(this.renderer);

        // const out = new Float32Array(PACKED_SIZE_FLOATS);
        // readMultipleRenderTargetPixels(
        //     this.renderer,
        //     this.makeTex.renderTargets,
        //     0,
        //     POINTS,
        //     out
        // );
        // console.log(out);

        this.renderer.setRenderTarget(null);
        this.renderer.render(this.scene, this.camera);

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
