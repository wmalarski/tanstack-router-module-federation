import { type AnyRoute, createRoute } from "@tanstack/react-router";
import "@trmf/ui/globals.css";
import "./app.css";
import { TagsListPage } from "./tags-list-page";

type GetTagsRouteArgs<TParentRoute extends AnyRoute = AnyRoute> = {
  parentRoute: TParentRoute;
};

export const getTagsRoute = <TParentRoute extends AnyRoute = AnyRoute>({
  parentRoute,
}: GetTagsRouteArgs<TParentRoute>) => {
  const route = createRoute({
    component: TagsListPage,
    getParentRoute: () => parentRoute,
    path: "/tags",
  });

  return route;
};
