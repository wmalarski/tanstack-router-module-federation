import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { type PropsWithChildren, useMemo } from "react";

const getTestRouter = (children: PropsWithChildren["children"]) => {
  const rootRoute = createRootRoute({});

  const indexRoute = createRoute({
    component: () => <>{children}</>,
    getParentRoute: () => rootRoute,
    path: "/",
  });

  const routeTree = rootRoute.addChildren([indexRoute]);

  const memoryHistory = createMemoryHistory({
    initialEntries: ["/"],
  });

  const router = createRouter({
    defaultPreload: "intent",
    history: memoryHistory,
    routeTree,
    scrollRestoration: true,
  });

  return router;
};

export const TestWrapper = ({ children }: PropsWithChildren) => {
  const router = useMemo(() => getTestRouter(children), [children]);

  return <RouterProvider router={router} />;
};
