import { federation } from "@module-federation/vite";
import tailwindcss from "@tailwindcss/vite";
import { replaceCssVariables } from "@trmf/replace-css-variables-plugin";
import react from "@vitejs/plugin-react";
import Sonda from "sonda/vite";
import { defineConfig } from "vite";
import { dependencies } from "../../package.json";

export default defineConfig(() => {
  return {
    // server: {
    //   fs: {
    //     allow: [".", "../shared"],
    //   },
    // },
    test: {
      browser: {
        enabled: true,
        provider: "playwright",
        instances: [{ browser: "chromium" }],
      },
    },
    build: {
      target: "chrome89",
    },
    plugins: [
      federation({
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
      }),
      react(),
      tailwindcss(),
      Sonda({ enabled: true, open: false }),
      replaceCssVariables({
        "--colors-brand-100": "#445566",
      }),
    ],
  };
});
