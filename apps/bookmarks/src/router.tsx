import { type AnyRoute, createRoute } from "@tanstack/react-router";
import App from "./app";

type GetBookmarksRouteArgs<TParentRoute extends AnyRoute = AnyRoute> = {
  rootRoute: TParentRoute;
};

export const getBookmarksRoute = <TParentRoute extends AnyRoute = AnyRoute>({
  rootRoute,
}: GetBookmarksRouteArgs<TParentRoute>) => {
  const route = createRoute({
    component: App,
    getParentRoute: () => rootRoute,
    path: "/bookmarks",
  });

  return route;
};
