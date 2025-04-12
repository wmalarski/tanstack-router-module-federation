import { type AnyRoute, createRoute } from "@tanstack/react-router";
import "@trmf/ui/globals.css";
import "./app.css";
import { BookmarkListRoute } from "./routes/bookmark-list-route";

type GetBookmarksRouteTreeArgs<TParentRoute extends AnyRoute = AnyRoute> = {
  rootRoute: TParentRoute;
};

export const getBookmarksRouteTree = <
  TParentRoute extends AnyRoute = AnyRoute,
>({
  rootRoute,
}: GetBookmarksRouteTreeArgs<TParentRoute>) => {
  const route = createRoute({
    component: BookmarkListRoute,
    getParentRoute: () => rootRoute,
    path: "/",
  });

  return route;
};
