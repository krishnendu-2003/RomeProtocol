// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Ensure Node's builtin module is used by Vite internals (not a browser polyfill)
      crypto: "node:crypto",
    },
  },
  server: {
    port: 5173,
    open: true,
    proxy: {
      // Backend OAuth1 server
      "/api": {
        target: "http://localhost:8787",
        changeOrigin: true,
      },
      "/auth": {
        target: "http://localhost:8787",
        changeOrigin: true,
      },
    },
  },
});
