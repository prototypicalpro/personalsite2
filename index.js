/*
 * Copyright 2022 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as Comlink from 'comlink';

const maxIterations = 1000;

const canvas = document.getElementById('canvas');
const { width, height } = canvas;
const ctx = canvas.getContext('2d');
const timeOutput = document.getElementById('time');

(async function init() {
  // Create a separate thread from wasm-worker.js and get a proxy to its handlers.
  let handlers = await Comlink.wrap(
    new Worker(new URL('./wasm-worker.js', import.meta.url), {
      type: 'module'
    })
  ).handlers;

  Object.assign(document.getElementById('cmplxSimd'), {
    async onclick() {
      const input = new Float32Array(4*100000).map(() => Math.random())

      let res0 = await handlers.cmplxMult({ input });
      let res1 = await handlers.cmplxMultSimd({ input });
      timeOutput.value = `Reg: ${res0.time.toFixed(2)} ms, SIMD: ${res1.time.toFixed(2)} ms`;
      // console.log(res0.data)
      // console.log(res1.data)
    }
  })

  Object.assign(document.getElementById('fft'), {
    async onclick() {
      const input = new Float32Array(new Array(512*512).fill(0).flatMap((_, i) => [i, i]));

      let res = await handlers.fft_2d({pts: input});
      timeOutput.value = `Time: ${res.time.toFixed(2)} ms`;
      console.log(res);
      let res_unpacked = []
      for (let i = 0; i < res.data.length / 2; i++) {
        res_unpacked.push([res.data[i*2], res.data[i*2+1]]);
      }
      console.log(res_unpacked);
      // console.log(res0.data)
      // console.log(res1.data)
    }
  })
})();
