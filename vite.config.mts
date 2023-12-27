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
});
