import { createLazyRoute } from "@tanstack/react-router";
import { TagsMainPage } from "./tags-main-page";

export const Route = createLazyRoute("/protected/tags")({
  component: TagsMainPage,
});
