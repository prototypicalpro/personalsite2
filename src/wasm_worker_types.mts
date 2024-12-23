export interface WorkerHandlersWrap {
    handlers: WorkerHandlers;
}

export interface WorkerHandlers {
    getPtrs: () => Promise<[number, number]>;
    setup: (props: any) => Promise<WebAssembly.Memory>;
    render: (arg: {
        time: number;
    }) => Promise<void>;
}
