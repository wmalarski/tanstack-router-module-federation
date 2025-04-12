import { federation } from "@module-federation/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import Sonda from "sonda/vite";
import { defineConfig } from "vite";
import { dependencies } from "./package.json";

export default defineConfig(() => {
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
      federation({
        exposes: {
          "./bookmarks-route-tree": "./src/route-tree.ts",
        },
        filename: "remoteEntry.js",
        name: "bookmarks",
        remotes: {},
        shared: {
          react: {
            requiredVersion: dependencies.react,
            singleton: true,
          },
        },
      }),
      react(),
      tailwindcss(),
      Sonda({ enabled: true, open: false }),
    ],
  };
});
