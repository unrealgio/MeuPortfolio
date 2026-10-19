import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    // three.js (~530 kB) lives in its own lazy-loaded chunk, so a larger limit is expected
    chunkSizeWarningLimit: 600,
  },
});
