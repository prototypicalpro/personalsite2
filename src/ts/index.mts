// import * as Comlink from "comlink";

// import { WorkerHandlersWrap } from "./wasm_worker_types.mjs";
import View from "./View.mjs";

// import WebWorker from "./wasm_worker.mjs?worker";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const backgroundImage = document.getElementById("bg") as HTMLImageElement;

async function init() {
    // Create a separate thread from wasm-worker.js and get a proxy to its handlers.
    // const handlers = await Comlink.wrap<WorkerHandlersWrap>(new WebWorker())
    //     .handlers;

    const view = await View.MakeView(canvas, backgroundImage);

    const cb = async (t: DOMHighResTimeStamp) => {
        await view.update(t / 1000.0, true);

        requestAnimationFrame(cb);
    };
    requestAnimationFrame(cb);
}

init();
