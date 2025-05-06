import { federation } from "@module-federation/vite";
import tailwindcss from "@tailwindcss/vite";
import { uiConfig } from "@trmf/vitest-config/ui";
import react from "@vitejs/plugin-react";
import Sonda from "sonda/vite";
import { defineConfig } from "vite";
import { dependencies } from "../../package.json";

export default defineConfig(({ mode }) => {
  return {
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
              "./tags-route-tree": "./src/route-tree.ts",
            },
            filename: "remoteEntry.js",
            name: "tags",
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
    ],
    test: uiConfig.test,
    // test: {
    //   browser: {
    //     enabled: true,
    //     instances: [{ browser: "chromium" }],
    //     provider: "playwright",
    //   },
    // },
  };
});
