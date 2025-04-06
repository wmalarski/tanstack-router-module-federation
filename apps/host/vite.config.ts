import { federation } from "@module-federation/vite";
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
        todos: {
          type: "module",
          name: "todos",
          entry: "http://localhost:4175/remoteEntry.js",
          entryGlobalName: "todos",
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
  ],
}));
