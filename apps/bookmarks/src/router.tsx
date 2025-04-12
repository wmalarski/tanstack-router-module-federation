import {
  type AnyRoute,
  createLazyRoute,
  createRoute,
} from "@tanstack/react-router";
import App from "./app";

export const Route = createLazyRoute("/protected/")({
  component: App,
});

type GetBookmarksRouteArgs<TParentRoute extends AnyRoute = AnyRoute> = {
  rootRoute: TParentRoute;
};

export const getBookmarksRoute = <TParentRoute extends AnyRoute = AnyRoute>({
  rootRoute,
}: GetBookmarksRouteArgs<TParentRoute>) => {
  const route = createRoute({
    getParentRoute: () => rootRoute,
    path: "/bookmarks",
    component: App,
  });

  return route;
};
