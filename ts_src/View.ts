/*
 * View.ts
 * ===========
 * Topmost Three.js class.
 * Controls scene, cam, renderer, and objects in scene.
 */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const POINTS = 512;
const DOMAIN = 250;

export default class View {
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private waveGeo: THREE.BufferGeometry;
    private waveGeoPos: THREE.BufferAttribute;
    private waveGeoNorm: THREE.BufferAttribute;
    private waveMesh: THREE.Mesh;

    private controls: OrbitControls;

    constructor(canvasElem: HTMLCanvasElement) {
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvasElem,
            stencil: false,
            depth: false,
            powerPreference: "high-performance",
        });
        this.renderer.setSize(POINTS, POINTS);
        this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        // this.camera = new THREE.OrthographicCamera(
        //     -DOMAIN / 2,
        //     DOMAIN / 2,
        //     DOMAIN / 2,
        //     -DOMAIN / 2,
        //     0,
        //     10
        // );
        this.camera.position.z = 300;

        this.controls = new OrbitControls(this.camera, canvasElem);
        this.controls.target.set(0, 0, 0);
        this.controls.update();

        this.scene = new THREE.Scene();

        const sun = new THREE.DirectionalLight(0xffffff, 1);
        sun.position.set(0, 300, 300);
        sun.target.position.set(0, 0, 0);
        this.scene.add(sun);
        this.scene.add(sun.target);

        this.waveGeoPos = new THREE.BufferAttribute(undefined, 3);
        this.waveGeoPos.setUsage(THREE.StreamDrawUsage);
        this.waveGeo = new THREE.BufferGeometry();
        this.waveGeo.setAttribute("position", this.waveGeoPos); // array will be set later

        this.waveGeoNorm = new THREE.BufferAttribute(undefined, 3);
        this.waveGeoNorm.setUsage(THREE.StreamDrawUsage);
        this.waveGeo.setAttribute("normal", this.waveGeoNorm); // array will be set later

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

        this.waveMesh = new THREE.Mesh(
            this.waveGeo,
            new THREE.MeshPhongMaterial({ color: 0x0000ff })
        );

        this.scene.add(this.waveMesh);
    }

    public async update(
        secs: number,
        pos_view: Float32Array,
        norm_view: Float32Array
    ) {
        this.waveGeoPos.array = pos_view;
        this.waveGeoPos.count = pos_view.length / this.waveGeoPos.itemSize;
        this.waveGeoPos.needsUpdate = true;

        this.waveGeoNorm.array = norm_view;
        this.waveGeoNorm.count = norm_view.length / this.waveGeoNorm.itemSize;
        this.waveGeoNorm.needsUpdate = true;

        this.renderer.render(this.scene, this.camera);
    }
}
