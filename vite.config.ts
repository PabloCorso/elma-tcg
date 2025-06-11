import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import devtoolsJson from "vite-plugin-devtools-json";
import path from "node:path";
import { envOnlyMacros } from "vite-env-only";
import netlifyPlugin from '@netlify/vite-plugin-react-router';

const MODE = process.env.NODE_ENV;

export default defineConfig({
  resolve: {
    alias: {
      "#app": path.resolve(__dirname, "app"),
    },
  },
  build: {
    target: "es2022",
    cssMinify: MODE === "production",

    rollupOptions: {
      external: [/node:.*/, "fsevents"],
    },

    assetsInlineLimit: (source: string) => {
      if (
        source.endsWith("favicon.svg") ||
        source.endsWith("apple-touch-icon.png")
      ) {
        return false;
      }
    },

    sourcemap: true,
  },
  plugins: [
    envOnlyMacros(),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    devtoolsJson(),
    netlifyPlugin(),
  ],
});
