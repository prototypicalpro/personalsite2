// import * as Comlink from "comlink";

// import { WorkerHandlersWrap } from "./wasm_worker_types.mjs";
import View from "./View.mjs";

// import WebWorker from "./wasm_worker.mjs?worker";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const backgroundImage = document.getElementById("bg") as HTMLImageElement;

function clamp(x: number, abs: number) {
    return Math.min(Math.max(x, -abs), abs);
}

function angleDiff(a: number, b: number) {
    let diff = (b - a + 180) % 360;
    if (diff < 0) diff += 360;
    return diff - 180;
}

async function init() {
    // Create a separate thread from wasm-worker.js and get a proxy to its handlers.
    // This is disabled since GitHub pages does not support the correct headers for now
    // const handlers = await Comlink.wrap<WorkerHandlersWrap>(new WebWorker())
    //     .handlers;

    // Test device width, for lg displays assume higher performance
    const perfCheck = window.matchMedia("(max-width: 768px)");
    console.log("Performance check", perfCheck);

    const view = await View.MakeView(
        canvas,
        backgroundImage,
        perfCheck.matches,
    );

    const cb = async (t: DOMHighResTimeStamp) => {
        await view.update(t / 1000.0, true);

        requestAnimationFrame(cb);
    };
    requestAnimationFrame(cb);

    let startBeta: number, startGamma: number;
    window.addEventListener(
        "deviceorientation",
        (e) => {
            if (typeof e.beta !== "number" || typeof e.gamma !== "number") {
                return;
            }

            if (startBeta === undefined || startGamma === undefined) {
                startBeta = e.beta;
                startGamma = e.gamma;
            }

            const degToRad = 180 / Math.PI;
            view.setParallax([
                -clamp(angleDiff(e.gamma, startGamma) * degToRad * 0.001, 1),
                clamp(angleDiff(e.beta, startBeta) * degToRad * 0.001, 1),
            ]);
        },
        true,
    );

    const parent = canvas.parentElement;
    parent.addEventListener("mousemove", (e) => {
        view.setParallax([
            -((e.offsetX / parent.clientWidth) * 2 - 1),
            (e.offsetY / parent.clientHeight) * 2 - 1,
        ]);
    });

    parent.addEventListener("mouseleave", () => {
        view.setParallax([0, 0]);
    });
}

init();
