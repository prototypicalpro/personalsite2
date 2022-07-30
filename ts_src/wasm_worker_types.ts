export interface WorkerHandlersWrap {
    handlers: WorkerHandlers;
}

export interface WorkerHandlers {
    memoryView: () => Promise<[WebAssembly.Memory, number, number, number]>;
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
    }) => Promise<void>;
    render: (arg: {
        time: number;
    }) => Promise<{ time: number; data: Uint8ClampedArray }>;
}
