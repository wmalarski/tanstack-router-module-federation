import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
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
        filename: "remoteEntry.js",
        name: "tags",
        exposes: {
          "./tags-app": "./src/app.tsx",
        },
        remotes: {},
        shared: {
          react: {
            requiredVersion: dependencies.react,
            singleton: true,
          },
        },
      }),
      react(),
    ],
  };
});
