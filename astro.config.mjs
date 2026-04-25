// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import obfuscator from "rollup-plugin-obfuscator";

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        plugins: [
          obfuscator({
            options: {
              compact: true,
              controlFlowFlattening: true,
              stringEncryption: true,
              selfDefending: true,
            }
          })
        ]
      }
    }
  },
  adapter: vercel(),
});