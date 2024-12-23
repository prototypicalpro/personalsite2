import * as WasmWavesAsm from 'wasm_waves';

export default class WasmWaves {
    public static async MakeWasmWaves({
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
        windows: [number, number, number, number, number, number];
    }): Promise<WasmWaves> {
        const ret = await WasmWavesAsm.default();
        
        // if (WasmWaves?.initThreadPool)
        //     await WasmWaves.initThreadPool(navigator.hardwareConcurrency);

        const retBuf = new WasmWavesAsm.RetBuf();
        WasmWavesAsm.gen_wavefield(
            depth,
            wind_speed,
            fetch,
            damping,
            swell,
            new Float32Array(windows),
            retBuf,
        );

        return new WasmWaves(ret.memory, ret, retBuf);
    }

    private constructor(public memory: WebAssembly.Memory, public module: WasmWavesAsm.InitOutput, public retBuf: WasmWavesAsm.RetBuf) {}

    public getPtrs(): [number, number] {
        return [this.retBuf.get_pos_out_ptr(), this.retBuf.get_partial_out_ptr()];
    }

    public render({ time }: { time: number }) {
        WasmWavesAsm.gen_and_paint_height_field(time, this.retBuf);
    }

    public getBuffer() {
        return this.memory.buffer;
    }
}
