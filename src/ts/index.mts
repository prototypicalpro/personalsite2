// import * as Comlink from "comlink";

// import { WorkerHandlersWrap } from "./wasm_worker_types.mjs";
import View from "./View.mjs";

// import WebWorker from "./wasm_worker.mjs?worker";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const backgroundImage = document.getElementById("bg") as HTMLImageElement;

function clamp(x: number, abs: number) {
    return Math.min(Math.max(x, -abs), abs);
}

async function init() {
    // Create a separate thread from wasm-worker.js and get a proxy to its handlers.
    // This is disabled since GitHub pages does not support the correct headers for now
    // const handlers = await Comlink.wrap<WorkerHandlersWrap>(new WebWorker())
    //     .handlers;

    const view = await View.MakeView(canvas, backgroundImage);

    const cb = async (t: DOMHighResTimeStamp) => {
        await view.update(t / 1000.0, true);

        requestAnimationFrame(cb);
    };
    requestAnimationFrame(cb);

    let startBeta: number, startGamma: number;
    window.addEventListener(
        "deviceorientation",
        (e) => {
            if (startBeta === undefined || startGamma === undefined) {
                startBeta = e.beta;
                startGamma = e.gamma;
            }
            console.log(e.beta, e.gamma);

            view.setParallax([
                clamp((e.gamma - startGamma) / 10.0, 1),
                clamp(-(e.beta - startBeta) / 10.0, 1),
            ]);
        },
        true,
    );

    const parent = canvas.parentElement;
    parent.addEventListener("mousemove", (e) => {
        view.setParallax([
            (e.offsetX / parent.clientWidth) * 2 - 1,
            (e.offsetY / parent.clientHeight) * 2 - 1,
        ]);
    });

    parent.addEventListener("mouseleave", () => {
        view.setParallax([0, 0]);
    });
}

init();
