import { federation } from "@module-federation/vite";
import tailwindcss from "@tailwindcss/vite";
import { uiConfig } from "@trmf/vitest-config/ui";
import react from "@vitejs/plugin-react";
import Sonda from "sonda/vite";
import { defineConfig } from "vite";
import { dependencies } from "../../package.json";

export default defineConfig(({ mode }) => ({
  // server: { fs: { allow: [".", "../shared"] } },
  build: {
    target: "chrome89",
  },
  plugins: [
    mode !== "test"
      ? federation({
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
        })
      : undefined,
    react(),
    tailwindcss(),
    Sonda({ enabled: true, open: false }),
  ],
  test: uiConfig.test,
  // test: {
  //   browser: {
  //     enabled: true,
  //     instances: [{ browser: "chromium" }],
  //     provider: "playwright",
  //   },
  // },
}));
