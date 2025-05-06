import { federation } from "@module-federation/vite";
import tailwindcss from "@tailwindcss/vite";
import { replaceCssVariables } from "@trmf/replace-css-variables-plugin";
import { uiConfig } from "@trmf/vitest-config/ui";
import react from "@vitejs/plugin-react";
import Sonda from "sonda/vite";
import { defineConfig } from "vite";
import { dependencies } from "../../package.json";

export default defineConfig(({ mode }) => ({
  // server: {
  //   fs: {
  //     allow: [".", "../shared"],
  //   },
  // },
  build: {
    target: "chrome89",
  },
  plugins: [
    mode !== "test"
      ? federation({
          exposes: {
            "./bookmarks-route-tree": "./src/route-tree.ts",
          },
          filename: "remoteEntry.js",
          name: "bookmarks",
          remotes: {},
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
    replaceCssVariables({
      "--colors-brand-100": "#445566",
    }),
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
