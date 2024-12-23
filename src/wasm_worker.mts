import { threads } from "wasm-feature-detect";
import * as Comlink from "comlink";
import WasmWaves from "./WasmWaves.mjs";

async function initHandlers() {
    // TODO: throw if no threads
    const hasThreads = await threads();

    // const fixFFTInput = (real, complex) => { multiThread.fft_2d(new multiThread.Ret2D(real, complex)) };

    let wavesPtr: { waves: WasmWaves | undefined } = { waves: undefined };

    return Comlink.proxy({
        supportsThreads: hasThreads,
        getPtrs: () => wavesPtr?.waves.getPtrs(),
        render: ({ time }: { time: number }) =>
            wavesPtr?.waves.render({ time }),
        setup: async (props: any) => {
            wavesPtr.waves = await WasmWaves.MakeWasmWaves(props);
            return wavesPtr.waves.memory;
        }
    });
}

Comlink.expose({
    handlers: initHandlers(),
});
