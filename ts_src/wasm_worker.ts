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

    const multiThread = await import("../pkg/index");

    const stuff = await multiThread.default();
    console.log(stuff.memory);
    await multiThread.initThreadPool(navigator.hardwareConcurrency);

    // const fixFFTInput = (real, complex) => { multiThread.fft_2d(new multiThread.Ret2D(real, complex)) };
    const retbuf = new multiThread.RetBuf();
    const pos_out = retbuf.get_pos_out_ptr();
    const norm_out = retbuf.get_partial_out_ptr();
    const pos_length = 512 * 512 * 4 * 4; // 512x512 grid of (f32, f32, f32, f32)

    return Comlink.proxy({
        supportsThreads: hasThreads,
        memoryView: () => [stuff.memory, pos_out, norm_out, pos_length],
        render: wrapFunc((time: number) =>
            multiThread.gen_and_paint_height_field(retbuf, time)
        ),
        setup: ({
            domain,
            depth,
            wind_speed,
            fetch,
            damping,
            swell,
        }: {
            domain: number;
            depth: number;
            wind_speed: number;
            fetch: number;
            damping: number;
            swell: number;
        }) =>
            multiThread.gen_wavefield(
                domain,
                depth,
                wind_speed,
                fetch,
                damping,
                swell,
                retbuf
            ),
    });
}

Comlink.expose({
    handlers: initHandlers(),
});
