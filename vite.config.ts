import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import { copyFileSync, mkdirSync, existsSync } from "node:fs";

const SPA_ROUTES = [
  "ad-art",
  "pilar",
  "jadwal",
  "program",
  "program-panjang",
  "desain-masjid",
  "wakaf-pembangunan",
  "pendanaan",
  "rekap-tugas",
];

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
          // 2. Pre-create route directories so GitHub Pages serves HTTP 200 on direct visits
          for (const route of SPA_ROUTES) {
            const routeDir = resolve(distDir, route);
            mkdirSync(routeDir, { recursive: true });
            copyFileSync(indexHtml, resolve(routeDir, "index.html"));
          }
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
