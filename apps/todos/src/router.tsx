import {
  createLazyRoute,
  createRoute,
  type RootRoute,
} from "@tanstack/react-router";
import App from "./app";

export const Route = createLazyRoute("/")({
  component: App,
});

// const todoRoute = createRoute({
//   getParentRoute: () => Route,
//   path: "/todos/$todoId",
// });

type GetRouteArgs = {
  rootRoute: RootRoute;
};

export const getTodosRouter = ({ rootRoute }: GetRouteArgs) => {
  const todosRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
  });

  return todosRoute;
};
