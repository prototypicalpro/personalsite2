import * as THREE from "three";
import makeSkyboxVert from "./glsl/skybox.vert.glsl";
import makeSkyboxFrag from "./glsl/skybox.frag.glsl";
import { stripHeader } from "./GLUtils";

export default class MakeSkybox {
    static readonly skyboxOpts = {
        radThresh: 1,
        speed: 1,
        scale: 1,
    };

    makeSkyboxMat: THREE.RawShaderMaterial;
    makeSkyboxMesh: THREE.Mesh;
    cubeCamera: THREE.CubeCamera;
    renderTarget: THREE.WebGLCubeRenderTarget;

    static makeRotationFromSunDirection(sunDirection: THREE.Vector3) {
        const xVec = sunDirection;
        const yVec = new THREE.Vector3(1, 0, 0).cross(xVec).normalize();
        const xRow = xVec;
        const zRow = xVec.clone().cross(yVec).normalize();
        const yRow = zRow.clone().cross(xVec).normalize();

        return new THREE.Matrix3().set(
            xRow.x,
            yRow.x,
            zRow.x,
            xRow.y,
            yRow.y,
            zRow.y,
            xRow.z,
            yRow.z,
            zRow.z
        );
    }

    constructor(sunDirection: THREE.Vector3) {
        this.makeSkyboxMat = new THREE.ShaderMaterial({
            glslVersion: THREE.GLSL3,
            vertexShader: stripHeader(makeSkyboxVert),
            fragmentShader: stripHeader(makeSkyboxFrag),
            uniforms: {
                sunDirection: new THREE.Uniform(sunDirection),
                sunRotation: new THREE.Uniform(
                    MakeSkybox.makeRotationFromSunDirection(sunDirection)
                ),
                radThresh: new THREE.Uniform(MakeSkybox.skyboxOpts.radThresh),
                speed: new THREE.Uniform(MakeSkybox.skyboxOpts.speed),
                scale: new THREE.Uniform(MakeSkybox.skyboxOpts.scale),
                time: new THREE.Uniform(0),
            },
            side: THREE.DoubleSide,
        });
        debugger;
        this.makeSkyboxMesh = new THREE.Mesh(
            new THREE.SphereGeometry(10, 256, 128),
            this.makeSkyboxMat
        );
        this.renderTarget = new THREE.WebGLCubeRenderTarget(1024, {
            generateMipmaps: true,
            type: THREE.HalfFloatType,
            depthBuffer: false,
            stencilBuffer: false,
        });

        this.cubeCamera = new THREE.CubeCamera(1, 100000, this.renderTarget);
    }

    render(renderer: THREE.WebGLRenderer, timeSecs: number) {
        this.makeSkyboxMat.uniforms.time.value = timeSecs;
        renderer.setRenderTarget(this.renderTarget);
        this.cubeCamera.update(renderer, this.makeSkyboxMesh as any);
    }
}
