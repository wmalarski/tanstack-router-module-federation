import { type AnyRoute, createRoute } from "@tanstack/react-router";
import "@trmf/ui/globals.css";
import "./app.css";
import { TagsListRoute } from "./routes/tags-list-route";

type GetTagsRouteTreeArgs<TParentRoute extends AnyRoute = AnyRoute> = {
  parentRoute: TParentRoute;
};

export const getTagsRouteTree = <TParentRoute extends AnyRoute = AnyRoute>({
  parentRoute,
}: GetTagsRouteTreeArgs<TParentRoute>) => {
  const baseRoute = createRoute({
    getParentRoute: () => parentRoute,
    id: "tags",
  });

  const listRoute = createRoute({
    component: TagsListRoute,
    getParentRoute: () => baseRoute,
    path: "/tags",
  });

  return baseRoute.addChildren([listRoute]);
};
