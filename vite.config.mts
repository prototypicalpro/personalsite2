import { defineConfig } from "vite";
import { ViteRsw } from "vite-plugin-rsw";
import glsl from "vite-plugin-glsl";

export default defineConfig({
    plugins: [ViteRsw(), glsl()],
    server: {
        headers: {
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Cross-Origin-Opener-Policy": "same-origin",
        },
    },
    define: {
        __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    base: "https://prototypical.pro",
});
