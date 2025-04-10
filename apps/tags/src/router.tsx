import { createLazyRoute } from "@tanstack/react-router";
import App from "./app";

export const Route = createLazyRoute("/protected/tags")({
  component: App,
});
