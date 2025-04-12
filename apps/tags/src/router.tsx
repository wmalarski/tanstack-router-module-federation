import { type AnyRoute, createRoute } from "@tanstack/react-router";
import App from "./app";

type GetTagsRouteArgs<TParentRoute extends AnyRoute = AnyRoute> = {
  parentRoute: TParentRoute;
};

export const getTagsRoute = <TParentRoute extends AnyRoute = AnyRoute>({
  parentRoute,
}: GetTagsRouteArgs<TParentRoute>) => {
  const route = createRoute({
    component: App,
    getParentRoute: () => parentRoute,
    path: "/tags",
  });

  return route;
};
