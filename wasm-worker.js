import { threads } from 'wasm-feature-detect';
import * as Comlink from 'comlink';

// Wrap wasm-bindgen exports (the `generate` function) to add time measurement.
function wrapFunc(f) {
  return (arg) => {
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
      time
    };
  };
}

async function initHandlers() {
  // TODO: throw if no threads
  const hasThreads = await threads();
  const multiThread = await import(
    './pkg/index.js'
  );

  const stuff = await multiThread.default();
  console.log(stuff.memory)
  await multiThread.initThreadPool(navigator.hardwareConcurrency);

  // const fixFFTInput = (real, complex) => { multiThread.fft_2d(new multiThread.Ret2D(real, complex)) };
  let retbuf = new multiThread.RetBuf();

  return Comlink.proxy({
    supportsThreads: hasThreads,
    memoryView: () => stuff.memory,
    fft_2d: wrapFunc(multiThread.fft_2d),
    render: wrapFunc((...args) => multiThread.gen_and_paint_height_field(retbuf, ...args)),
    setup: () => multiThread.gen_wavefield(retbuf),
  });
}

Comlink.expose({
  handlers: initHandlers()
});
