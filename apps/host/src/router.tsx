import type { UserResponse } from "@supabase/supabase-js";
import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  Link,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { useUserContext } from "@trmf/auth-util";
import {
  getSupabaseContext,
  type SupabaseTypedClient,
} from "@trmf/supabase-util";
import { Button } from "@trmf/ui/components/button";
import "@trmf/ui/globals.css";
import { useState } from "react";
import "./app.css";

type RootRouteContext = {
  queryClient: QueryClient;
  user: UserResponse;
  supabase: SupabaseTypedClient;
};

const rootRoute = createRootRouteWithContext<RootRouteContext>()({
  component: () => (
    <>
      <div className="host:flex host:gap-2 host:p-2">
        <Link className="host:[&.active]:font-bold" to="/">
          Home
        </Link>{" "}
        <Link className="host:[&.active]:font-bold" to="/tags">
          About
        </Link>
        <Button>Host</Button>
      </div>
      <hr />
      <Outlet />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
}).lazy(() =>
  // @ts-ignore
  import("bookmarks/bookmarks-router").then((module) => module.Route),
);

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tags",
  // @ts-ignore
}).lazy(() => import("tags/tags-router").then((module) => module.Route));

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

const queryClient = new QueryClient();

const getRouter = (context: RootRouteContext) => {
  return createRouter({
    context,
    defaultPreload: "intent",
    routeTree,
    scrollRestoration: true,
  });
};

export type RouterType = ReturnType<typeof getRouter>;

export const Router = () => {
  const user = useUserContext();
  const supabase = getSupabaseContext();

  const [router] = useState(() => getRouter({ queryClient, supabase, user }));

  return <RouterProvider context={{ user }} router={router} />;
};
