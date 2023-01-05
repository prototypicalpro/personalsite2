import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
    stripHeader,
    makeDataTexture,
    makeRenderTarget,
    readMultipleRenderTargetPixels,
} from "./GLUtils";
import { WorkerHandlers } from "./wasm_worker_types";
import {
    WIDTH,
    PACKED_SIZE_BYTES,
    PACKED_SIZE_FLOATS,
    FILTER_COUNT,
    PACKED_SIZE,
} from "./wasm_constants";
import MakeTex from "./MakeTex";

import raytraceVert from "./glsl/raytrace.vert.glsl";
import raytraceFrag from "./glsl/raytrace.frag.glsl";

// import Tex from "./img/debug.jpg";
// import Tex from "./img/tex.jpg";
import Tex from "./img/shapes.jpg";

export default class View {
    static readonly waveProps = {
        windows: [5, 17, 150] as [number, number, number],
        segments: 1024,
        depth: 15,
        wind_speed: 5,
        fetch: 500000,
        damping: 3.33,
        swell: 0.5,
        tiling_off: 0.1,
    };

    worker: WorkerHandlers;
    renderer: THREE.WebGLRenderer;
    camera: THREE.Camera;
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

    constructor(
        canvasElem: HTMLCanvasElement,
        tex: THREE.Texture,
        worker: WorkerHandlers,
        memory: [WebAssembly.Memory, number, number]
    ) {
        [this.memory, this.posPtr, this.partPtr] = memory;

        this.worker = worker;
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvasElem,
            stencil: false,
            depth: false,
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

        this.oceanGeo = new THREE.PlaneGeometry(
            View.waveProps.windows[2],
            View.waveProps.windows[2],
            View.waveProps.segments,
            View.waveProps.segments
        );

        const shaderMaterial = new THREE.ShaderMaterial({
            glslVersion: THREE.GLSL3,
            fragmentShader: stripHeader(raytraceFrag),
            vertexShader: stripHeader(raytraceVert),
            uniforms: this.makeRaytraceUniforms(),
        });

        this.oceanMesh = new THREE.Mesh(this.oceanGeo, shaderMaterial);

        this.debugRenderTarget = makeRenderTarget(WIDTH, WIDTH, 4);

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
        const { tiling_off, windows } = View.waveProps;
        const waveTextureMatrix = [];
        for (let i = 0; i < FILTER_COUNT; i++) {
            const child_domain = View.waveProps.windows[i];

            const mat = new THREE.Matrix3().setUvTransform(
                0.5,
                0.5,
                1 / child_domain,
                -1 / child_domain,
                0,
                tiling_off, // TODO: offset
                tiling_off
            );
            waveTextureMatrix.push(mat);
        }

        const floorTextureMatrix = new THREE.Matrix3().setUvTransform(
            0.5,
            0.5,
            1 / windows[2],
            1 / windows[2],
            0,
            0,
            0
        );

        return {
            waveDisplacement: new THREE.Uniform(
                this.makeTex.getDisplacementTexs()
            ),
            waveMoments: new THREE.Uniform(this.makeTex.getFirstMomentTexs()),
            waveSecMoments: new THREE.Uniform(
                this.makeTex.getSecondMomentTexs()
            ),
            waveTextureMatrix: new THREE.Uniform(waveTextureMatrix),
            domain: new THREE.Uniform(View.waveProps.windows[2]),
            floorPosition: new THREE.Uniform(
                new THREE.Vector3(0, 0, -View.waveProps.depth)
            ),
            floorTextureMatrix: new THREE.Uniform(floorTextureMatrix),
            floorTexture: new THREE.Uniform(this.backTex),
            floorSize: new THREE.Uniform(windows[2]),
            floorPixels: new THREE.Uniform(this.backTex.image.width),
        };
    }

    updateGeoBuffers(ptr: number, geoBufs: THREE.BufferAttribute[]) {
        for (let i = 0; i < FILTER_COUNT; i++) {
            const offset = PACKED_SIZE_BYTES * i;
            const floatView = new Float32Array(
                this.memory.buffer,
                ptr + offset,
                PACKED_SIZE_FLOATS
            );
            geoBufs[i].array = floatView;
            geoBufs[i].count = PACKED_SIZE;
            geoBufs[i].needsUpdate = true;
        }
    }

    public async update(secs: number) {
        await this.worker.render({ time: secs });

        this.updateGeoBuffers(this.posPtr, this.wavePosBufs);
        this.updateGeoBuffers(this.partPtr, this.wavePartialBufs);
        this.makeTex.render(this.renderer);

        console.log(this.camera.position);

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
        this.renderer.render(this.oceanMesh, this.camera);

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
