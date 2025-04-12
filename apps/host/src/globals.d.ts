import type { RouterType } from "./router/router";

declare module "@tanstack/react-router" {
  interface Register {
    router: RouterType;
  }
}
