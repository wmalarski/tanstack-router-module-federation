import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
  Link,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="flex gap-2 p-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
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
  component: lazyRouteComponent(() => import("todos/todos-app")),
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  // @ts-ignore
  component: lazyRouteComponent(() => import("tags/tags-app")),
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
});

export const App = () => {
  return <RouterProvider router={router} />;
};
