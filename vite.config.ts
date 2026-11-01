import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";

function getGitVersion(): { hash: string; version: string } {
  let hash = "dev";
  let timestamp = "";

  try {
    hash = execSync("git rev-parse --short HEAD").toString().trim();
    const ct = parseInt(execSync("git log -1 --format=%ct").toString().trim(), 10) * 1000;
    const d = new Date(ct);
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).formatToParts(d).reduce<Record<string, string>>((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    timestamp = `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`;
  } catch {
    hash = process.env.GITHUB_SHA ? process.env.GITHUB_SHA.slice(0, 7) : "dev";
    const d = new Date();
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).formatToParts(d).reduce<Record<string, string>>((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    timestamp = `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`;
  }

  return {
    hash,
    version: `v${hash} - ${timestamp}`,
  };
}

const { hash: gitHash, version: appVersion } = getGitVersion();

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
    __COMMIT_HASH__: JSON.stringify(gitHash),
  },
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
