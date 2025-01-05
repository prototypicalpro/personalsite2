import * as WasmWavesAsm from "wasm_waves";

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
        const ret = await WasmWavesAsm.default();

        let retBuf;
        if (lowPerf) {
            retBuf = new WasmWavesAsm.RetBuf128();
            WasmWavesAsm.gen_wavefield_128(
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
            retBuf = new WasmWavesAsm.RetBuf256();
            WasmWavesAsm.gen_wavefield_256(
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
                ? WasmWavesAsm.gen_and_paint_height_field_128
                : WasmWavesAsm.gen_and_paint_height_field_256,
            lowPerf ? 128 : 256,
        );
    }

    private constructor(
        public readonly memory: WebAssembly.Memory,
        public readonly module: WasmWavesAsm.InitOutput,
        private readonly retBuf:
            | WasmWavesAsm.RetBuf256
            | WasmWavesAsm.RetBuf128,
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
