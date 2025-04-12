import {
  type AnyRoute,
  createLazyRoute,
  createRoute,
} from "@tanstack/react-router";
import App from "./app";

export const Route = createLazyRoute("/protected/tags")({
  component: App,
});

type GetTagsRouteArgs<TParentRoute extends AnyRoute = AnyRoute> = {
  parentRoute: TParentRoute;
};

export const getTagsRoute = <TParentRoute extends AnyRoute = AnyRoute>({
  parentRoute,
}: GetTagsRouteArgs<TParentRoute>) => {
  const route = createRoute({
    getParentRoute: () => parentRoute,
    path: "/tags",
    component: App,
  });

  return route;
};
