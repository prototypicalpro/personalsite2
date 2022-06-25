import { threads } from 'wasm-feature-detect';
import * as Comlink from 'comlink';

// Wrap wasm-bindgen exports (the `generate` function) to add time measurement.
function wrapFunc(f) {
  return (arg) => {
    const start = performance.now();
    const data = f(...Object.values(arg));
    const time = performance.now() - start;
    // console.log(data);
    return {
      // Little perf boost to transfer data to the main thread w/o copying.
      data: Comlink.transfer(data, [data.buffer]),
      time
    };
  };
}

async function initHandlers() {
  // TODO: throw if no threads
  const hasThreads = await threads();
  const multiThread = await import(
    './pkg/wasm_bindgen_rayon_demo.js'
  );

  await multiThread.default();
  await multiThread.initThreadPool(navigator.hardwareConcurrency);

  return Comlink.proxy({
    supportsThreads: hasThreads,
    cmplxMult: wrapFunc(multiThread.test_cmplx),
    cmplxMultSimd: wrapFunc(multiThread.test_cmplx_simd)
  });
}

Comlink.expose({
  handlers: initHandlers()
});
