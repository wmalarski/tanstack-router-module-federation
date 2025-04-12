import { type AnyRoute, createRoute } from "@tanstack/react-router";
import "@trmf/ui/globals.css";
import "./app.css";
import { BookmarkListPage } from "./bookmark-list-page";

type GetBookmarksRouteArgs<TParentRoute extends AnyRoute = AnyRoute> = {
  rootRoute: TParentRoute;
};

export const getBookmarksRoute = <TParentRoute extends AnyRoute = AnyRoute>({
  rootRoute,
}: GetBookmarksRouteArgs<TParentRoute>) => {
  const route = createRoute({
    component: BookmarkListPage,
    getParentRoute: () => rootRoute,
    path: "/",
  });

  return route;
};
