import { federation } from "@module-federation/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import Sonda from "sonda/vite";
import { defineConfig } from "vite";
import { dependencies } from "../../package.json";

export default defineConfig(() => ({
  // server: { fs: { allow: [".", "../shared"] } },
  build: {
    target: "chrome89",
  },
  plugins: [
    federation({
      exposes: {},
      filename: "remoteEntry.js",
      name: "host",
      remotes: {
        bookmarks: {
          entry: "http://localhost:4175/remoteEntry.js",
          entryGlobalName: "bookmarks",
          name: "bookmarks",
          shareScope: "default",
          type: "module",
        },
        tags: {
          entry: "http://localhost:4174/remoteEntry.js",
          entryGlobalName: "tags",
          name: "tags",
          shareScope: "default",
          type: "module",
        },
      },
      shared: Object.fromEntries(
        Object.entries(dependencies).map(([dependency, version]) => [
          dependency,
          { requiredVersion: version, singleton: true },
        ]),
      ),
    }),
    react(),
    tailwindcss(),
    Sonda({ enabled: true, open: false }),
  ],
  test: {
    browser: {
      enabled: true,
      instances: [{ browser: "chromium" }],
      provider: "playwright",
    },
  },
}));
