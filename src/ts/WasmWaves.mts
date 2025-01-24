// import * as WasmWavesAsm from "../../wasm_waves/pkg/wasm_waves.js";
import * as WasmWavesAsmSafari from "../../wasm_waves/pkg_safari/wasm_waves.js";

type RetBuf =
    // | WasmWavesAsm.RetBuf128
    // | WasmWavesAsm.RetBuf256
    WasmWavesAsmSafari.RetBuf128 | WasmWavesAsmSafari.RetBuf256;

export default class WasmWaves {
    public static async MakeWasmWaves({
        depth,
        wind_speed,
        fetch,
        damping,
        swell,
        rad_off,
        windows,
        lowPerf = false,
    }: {
        depth: number;
        wind_speed: number;
        fetch: number;
        damping: number;
        swell: number;
        rad_off: number;
        windows: number[];
        lowPerf: boolean;
    }): Promise<WasmWaves> {
        // let ret: any;
        // let WasmNamespace: typeof WasmWavesAsm | typeof WasmWavesAsmSafari;
        // try {
        //     ret = await WasmWavesAsm.default();
        //     WasmNamespace = WasmWavesAsm;
        // } catch (e) {
        //     console.debug(
        //         "Got compilation error, switching to wasm V1 build: ",
        //         e,
        //     );
        //     ret = await WasmWavesAsmSafari.default();
        //     WasmNamespace = WasmWavesAsmSafari;
        // }

        const ret = await WasmWavesAsmSafari.default();
        const WasmNamespace = WasmWavesAsmSafari;

        const seed = new Uint8Array(16);
        for (let i = 0; i < seed.length; i++) {
            seed[i] = Math.round(Math.random() * 255);
        }

        let retBuf;
        if (lowPerf) {
            retBuf = new WasmNamespace.RetBuf128(seed);
            WasmNamespace.gen_wavefield_128(
                depth,
                wind_speed,
                fetch,
                damping,
                swell,
                rad_off,
                new Float32Array(windows),
                retBuf,
            );
        } else {
            retBuf = new WasmNamespace.RetBuf256(seed);
            WasmNamespace.gen_wavefield_256(
                depth,
                wind_speed,
                fetch,
                damping,
                swell,
                rad_off,
                new Float32Array(windows),
                retBuf,
            );
        }

        return new WasmWaves(
            ret.memory,
            ret,
            retBuf,
            lowPerf
                ? WasmNamespace.gen_and_paint_height_field_128
                : WasmNamespace.gen_and_paint_height_field_256,
            lowPerf ? 128 : 256,
        );
    }

    private constructor(
        public readonly memory: WebAssembly.Memory,
        public readonly module: // | WasmWavesAsm.InitOutput
        WasmWavesAsmSafari.InitOutput,
        private readonly retBuf: RetBuf,
        private readonly step: (time: number, retBuf: any) => void,
        readonly width: number,
    ) {}

    public getPtrs(): [number, number] {
        return [
            this.retBuf.get_pos_out_ptr(),
            this.retBuf.get_partial_out_ptr(),
        ];
    }

    public getPackedSize() {
        return this.width * this.width;
    }

    public getPackedSizeFloats() {
        return this.getPackedSize() * 4;
    }

    public getPackedSizeBytes() {
        return this.getPackedSizeFloats() * Float32Array.BYTES_PER_ELEMENT;
    }

    public render({ time }: { time: number }) {
        this.step(time, this.retBuf);
    }

    public getBuffer() {
        return this.memory.buffer;
    }
}
