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
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".glsl"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: [/node_modules/, /tsOld/],
                loader: "ts-loader",
            },
            {
                test: /\.(glsl|vs|fs)$/,
                loader: "ts-shader-loader",
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
    devtool: "inline-source-map",
    devServer: {
        static: {
            directory: dist,
        },
        open: false,
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
            watchDirectories: [path.resolve(__dirname, "rs_src")],
            forceMode: "production", // using development causes a link error
        }),
    ],
};
