import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The dev server proxies /api to the local Node proxy (server/proxy.js)
// so the Anthropic key never reaches the browser. The app works fully
// without the proxy running — AI calls just fall back to manual mode.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8787",
        changeOrigin: true,
      },
    },
  },
});
