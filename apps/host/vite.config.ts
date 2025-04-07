import { federation } from "@module-federation/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { dependencies } from "./package.json";

export default defineConfig(() => ({
  // server: { fs: { allow: [".", "../shared"] } },
  build: {
    target: "chrome89",
  },
  plugins: [
    federation({
      name: "host",
      remotes: {
        tags: {
          type: "module",
          name: "tags",
          entry: "http://localhost:4174/remoteEntry.js",
          entryGlobalName: "tags",
          shareScope: "default",
        },
        bookmarks: {
          type: "module",
          name: "bookmarks",
          entry: "http://localhost:4175/remoteEntry.js",
          entryGlobalName: "bookmarks",
          shareScope: "default",
        },
      },
      exposes: {},
      filename: "remoteEntry.js",
      shared: {
        react: {
          requiredVersion: dependencies.react,
          singleton: true,
        },
      },
    }),
    react(),
    tailwindcss(),
  ],
}));
