import {
  createLazyRoute,
  createRoute,
  type RootRoute,
} from "@tanstack/react-router";
import App from "./app";

export const Route = createLazyRoute("/protected/")({
  component: App,
});

// const todoRoute = createRoute({
//   getParentRoute: () => Route,
//   path: "/bookmarks/$todoId",
// });

type GetRouteArgs = {
  rootRoute: RootRoute;
};

export const getBookmarksRouter = ({ rootRoute }: GetRouteArgs) => {
  const route = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
  });

  return route;
};
