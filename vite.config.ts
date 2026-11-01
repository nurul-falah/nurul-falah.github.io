import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import { copyFileSync, mkdirSync, existsSync } from "node:fs";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "github-pages-spa-routes",
      closeBundle() {
        const distDir = resolve(__dirname, "dist");
        const indexHtml = resolve(distDir, "index.html");
        if (existsSync(indexHtml)) {
          // 1. Copy 404.html for GitHub Pages SPA fallback
          copyFileSync(indexHtml, resolve(distDir, "404.html"));
          // 2. Pre-create /ad-art/index.html so GitHub Pages serves HTTP 200 on /ad-art
          const adArtDir = resolve(distDir, "ad-art");
          mkdirSync(adArtDir, { recursive: true });
          copyFileSync(indexHtml, resolve(adArtDir, "index.html"));
        }
      },
    },
  ],
  base: "/",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
