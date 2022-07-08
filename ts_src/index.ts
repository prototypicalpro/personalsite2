import * as Comlink from "comlink";

import View from "./View";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const timeOutput = document.getElementById("time") as HTMLOutputElement;

interface WorkerHandlers {
    handlers: {
        memoryView: () => Promise<[WebAssembly.Memory, number, number]>;
        setup: () => Promise<void>;
        render: (arg: { time: number }) => Promise<{ time: number }>;
    };
}

async function init() {
    // Create a separate thread from wasm-worker.js and get a proxy to its handlers.
    const handlers = await Comlink.wrap<WorkerHandlers>(
        new Worker(new URL("./wasm_worker", import.meta.url), {
            type: "module",
        })
    ).handlers;

    const [mem, ptr, len] = await handlers.memoryView();
    console.log(mem, ptr, len);

    const view = new View(canvas);

    await handlers.setup();

    const cb = async (t: DOMHighResTimeStamp) => {
        const render_res = await handlers.render({ time: t / 1000.0 });
        timeOutput.value = `Time: ${render_res.time.toFixed(2)} ms`;

        const floatview = new Float32Array(
            mem.buffer,
            ptr,
            len / Float32Array.BYTES_PER_ELEMENT
        );
        view.update(t / 1000.0, floatview);
        requestAnimationFrame(cb);
    };
    requestAnimationFrame(cb);
}

init();
