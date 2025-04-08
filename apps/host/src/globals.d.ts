import type { Router } from "./app";

declare module "@tanstack/react-router" {
  interface Register {
    router: Router;
  }
}
