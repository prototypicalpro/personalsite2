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
    './pkg/index.js'
  );

  await multiThread.default();
  await multiThread.initThreadPool(navigator.hardwareConcurrency);

  // const fixFFTInput = (real, complex) => { multiThread.fft_2d(new multiThread.Ret2D(real, complex)) };

  return Comlink.proxy({
    supportsThreads: hasThreads,
    cmplxMult: wrapFunc(multiThread.test_cmplx),
    cmplxMultSimd: wrapFunc(multiThread.test_cmplx_simd),
    fft_2d: wrapFunc(multiThread.fft_2d),
    test_multiply_cmplx2: wrapFunc(multiThread.test_multiply_cmplx2)
  });
}

Comlink.expose({
  handlers: initHandlers()
});
