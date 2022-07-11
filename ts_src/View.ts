/*
 * View.ts
 * ===========
 * Topmost Three.js class.
 * Controls scene, cam, renderer, and objects in scene.
 */

import * as THREE from "three";

const POINTS = 512;
const DOMAIN = 250;

export default class View {
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private waveGeo: THREE.BufferGeometry;
    private waveGeoPos: THREE.BufferAttribute;
    private waveMesh: THREE.Mesh;

    constructor(canvasElem: HTMLCanvasElement) {
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvasElem,
            stencil: false,
            depth: false,
            powerPreference: "high-performance",
        });
        this.renderer.setSize(POINTS, POINTS);
        // this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        this.camera = new THREE.OrthographicCamera(
            -DOMAIN / 2,
            DOMAIN / 2,
            DOMAIN / 2,
            -DOMAIN / 2,
            0,
            10
        );
        this.camera.position.z = 10;
        this.scene = new THREE.Scene();

        this.waveGeoPos = new THREE.BufferAttribute(undefined, 3);
        this.waveGeoPos.setUsage(THREE.StreamDrawUsage);
        this.waveGeo = new THREE.BufferGeometry();
        this.waveGeo.setAttribute("position", this.waveGeoPos); // array will be set later

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
            new THREE.MeshDepthMaterial({
                side: THREE.FrontSide, // TODO: Front side?
            })
        );

        this.scene.add(this.waveMesh);
    }

    public async update(secs: number, pos_view: Float32Array) {
        this.waveGeoPos.array = pos_view;
        this.waveGeoPos.count = pos_view.length / this.waveGeoPos.itemSize;
        this.waveGeoPos.needsUpdate = true;
        // this.waveGeo.computeVertexNormals();

        this.renderer.render(this.scene, this.camera);
    }
}
