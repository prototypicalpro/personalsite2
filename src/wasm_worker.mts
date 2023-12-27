import { threads } from "wasm-feature-detect";
import * as Comlink from "comlink";

// Wrap wasm-bindgen exports (the `generate` function) to add time measurement.
function wrapFunc(f: any) {
    return (arg: any) => {
        const start = performance.now();
        let data;
        if (arg) {
            data = f(...Object.values(arg));
        } else {
            data = f();
        }
        const time = performance.now() - start;
        // console.log(data);
        return {
            // Little perf boost to transfer data to the main thread w/o copying.
            data: data ? Comlink.transfer(data, [data.buffer]) : {},
            time,
        };
    };
}

async function initHandlers() {
    // TODO: throw if no threads
    const hasThreads = await threads();

    const multiThread = await import("wasm-bindgen-rayon-demo");

    const stuff = await multiThread.default(
        undefined,
        new WebAssembly.Memory({
            initial: 2048 * 8,
            maximum: 65536,
            shared: true,
        }),
    );
    const retbuf = new multiThread.RetBuf();

    await multiThread.initThreadPool(navigator.hardwareConcurrency);

    // const fixFFTInput = (real, complex) => { multiThread.fft_2d(new multiThread.Ret2D(real, complex)) };
    const pos_out = retbuf.get_pos_out_ptr();
    const norm_out = retbuf.get_partial_out_ptr();

    return Comlink.proxy({
        supportsThreads: hasThreads,
        memoryView: () => [stuff.memory, pos_out, norm_out],
        render: wrapFunc((time: number) =>
            multiThread.gen_and_paint_height_field(retbuf, time),
        ),
        setup: ({
            depth,
            wind_speed,
            fetch,
            damping,
            swell,
            windows,
        }: {
            depth: number;
            wind_speed: number;
            fetch: number;
            damping: number;
            swell: number;
            windows: [number, number, number];
        }) =>
            multiThread.gen_wavefield(
                depth,
                wind_speed,
                fetch,
                damping,
                swell,
                new Float32Array(windows),
                retbuf,
            ),
    });
}

Comlink.expose({
    handlers: initHandlers(),
});
