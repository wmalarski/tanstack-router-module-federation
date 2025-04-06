import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { writeFileSync } from "node:fs";
import { defineConfig, loadEnv } from "vite";
import { dependencies } from "./package.json";

export default defineConfig(({ mode }) => {
  const selfEnv = loadEnv(mode, process.cwd());
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
      {
        name: "generate-environment",
        options: () => {
          console.info("selfEnv", selfEnv);
          writeFileSync(
            "./src/environment.ts",
            `export default ${JSON.stringify(selfEnv, null, 2)};`,
          );
        },
      },
      federation({
        filename: "remoteEntry.js",
        name: "todos",
        exposes: {
          "./todos-app": "./src/app.tsx",
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
