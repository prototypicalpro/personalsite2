import * as Comlink from "comlink";
import WasmWaves from "./WasmWaves.mjs";

async function initHandlers() {
    let wavesPtr: { waves: WasmWaves | undefined } = { waves: undefined };

    return Comlink.proxy({
        getPtrs: () => wavesPtr?.waves.getPtrs(),
        render: ({ time }: { time: number }) =>
            wavesPtr?.waves.render({ time }),
        setup: async (props: any) => {
            wavesPtr.waves = await WasmWaves.MakeWasmWaves(props);
            return wavesPtr.waves.memory;
        },
    });
}

Comlink.expose({
    handlers: initHandlers(),
});
