import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { type PropsWithChildren, useMemo } from "react";

const getRouter = (children: PropsWithChildren["children"]) => {
  const rootRoute = createRootRoute({});

  const indexRoute = createRoute({
    component: () => <>{children}</>,
    getParentRoute: () => rootRoute,
    path: "/",
  });

  const routeTree = rootRoute.addChildren([indexRoute]);

  const router = createRouter({
    defaultPreload: "intent",
    routeTree,
    scrollRestoration: true,
  });

  return router;
};

export const TestWrapper = ({ children }: PropsWithChildren) => {
  const router = useMemo(() => getRouter(children), [children]);

  return <RouterProvider router={router} />;
};
