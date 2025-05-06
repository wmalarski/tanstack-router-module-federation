import { defineProject, mergeConfig } from "vitest/config";
import { baseConfig } from "./base-config.js";

export const uiConfig = mergeConfig(
  baseConfig,
  defineProject({
    test: {
      browser: {
        enabled: true,
        headless: true,
        instances: [{ browser: "chromium" }],
        provider: "playwright",
      },
      environment: "jsdom",
    },
  }),
);
