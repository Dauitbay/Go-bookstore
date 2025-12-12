import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// Vite uses ESM config, not CommonJS, because package.json has "type": "module"
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000
    },
    resolve: {
        alias: {
            "@": "/src"
        }
    }
});
