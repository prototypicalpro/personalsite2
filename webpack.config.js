const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const dist = path.resolve(__dirname, "dist");

module.exports = {
    mode: "development",
    entry: {
        index: "./ts_src/index.ts",
    },
    output: {
        path: dist,
        filename: "[name].js",
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: [/node_modules/, /tsOld/],
                loader: "ts-loader",
            },
        ],
    },
    devtool: "inline-source-map",
    devServer: {
        static: {
            directory: dist,
        },
        headers: [
            { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
            { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: path.resolve(__dirname, "public"), to: dist }],
        }),
        new WasmPackPlugin({
            extraArgs: "--target web",
            crateDirectory: __dirname,
            forceMode: "production", // using development causes a link error
        }),
    ],
};
