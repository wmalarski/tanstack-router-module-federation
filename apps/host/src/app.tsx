import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  Link,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import "./app.css";

const rootRoute = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => (
    <>
      <div className="host:flex host:gap-2 host:p-2">
        <Link to="/" className="host:[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/tags" className="host:[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  // @ts-ignore
}).lazy(() => import("todos/todos-router").then((module) => module.Route));

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tags",
  // @ts-ignore
}).lazy(() => import("tags/tags-router").then((module) => module.Route));

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

const queryClient = new QueryClient();

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  context: {
    queryClient,
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
