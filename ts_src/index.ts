import * as Comlink from "comlink";

import { WorkerHandlersWrap } from "./wasm_worker_types";
import View from "./View";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
// const ctx = canvas.getContext("2d");
const timeOutput = document.getElementById("time") as HTMLOutputElement;
const renderButton = document.getElementById("render") as HTMLButtonElement;

async function init() {
    // Create a separate thread from wasm-worker.js and get a proxy to its handlers.
    const handlers = await Comlink.wrap<WorkerHandlersWrap>(
        new Worker(new URL("./wasm_worker", import.meta.url), {
            type: "module",
        })
    ).handlers;

    const view = await View.MakeView(canvas, handlers);

    const cb = async (t: DOMHighResTimeStamp) => {
        view.update(t / 1000.0);

        // const canvasData = new ImageData(render_res.data, 512, 512);
        // ctx.putImageData(canvasData, 0, 0);

        requestAnimationFrame(cb);
    };
    renderButton.addEventListener("click", () => cb(1000.0));
    // requestAnimationFrame(cb);
}

init();
