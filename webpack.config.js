const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const dist = path.resolve(__dirname, "dist");

module.exports = {
  mode: "development",
  entry: {
    index: "./index.js"
  },
  output: {
    path: dist,
    filename: "index.js"
  },
  devServer: {
    static: {
      directory: dist,
    },
    headers: [
		  { "key": "Cross-Origin-Embedder-Policy", "value": "require-corp" },
		  { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" }
		],
    host: '127.0.0.1'
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "index.html"), to: path.resolve(dist, "index.html") }
      ]
    }),

    new WasmPackPlugin({
      extraArgs: '--target web -- -Z build-std=panic_abort,std',
      crateDirectory: __dirname,
      forceMode: 'production' // using development causes a link error
    }),
  ]
};