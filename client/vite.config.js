import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:5000",
      "/sitemap.xml": "http://localhost:5000",
      "/robots.txt": "http://localhost:5000",
      "/llms.txt": "http://localhost:5000",
    },
  },
});
