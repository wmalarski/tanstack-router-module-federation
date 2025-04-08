import type { RouterType } from "./router";

declare module "@tanstack/react-router" {
  interface Register {
    router: RouterType;
  }
}
