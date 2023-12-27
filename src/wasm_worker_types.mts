export interface WorkerHandlersWrap {
    handlers: WorkerHandlers;
}

export interface WorkerHandlers {
    memoryView: () => Promise<[WebAssembly.Memory, number, number]>;
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
        windows: [number, number, number, number, number, number];
    }) => Promise<void>;
    render: (arg: {
        time: number;
    }) => Promise<{ time: number; data: Uint8ClampedArray }>;
}
