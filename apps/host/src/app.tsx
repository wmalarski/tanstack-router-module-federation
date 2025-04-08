import type { UserResponse } from "@supabase/supabase-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  Link,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { UserProvider } from "@trmf/feature-auth";
import { Button } from "@trmf/ui/components/button";
import "@trmf/ui/globals.css";
import { useUserContext } from "@trmf/util-auth";
import {
  SupabaseProvider,
  type SupabaseTypedClient,
} from "@trmf/util-supabase";
import { Suspense } from "react";
import "./app.css";

const rootRoute = createRootRouteWithContext<{
  queryClient: QueryClient;
  user: UserResponse;
}>()({
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

export const router = createRouter({
  context: {
    queryClient,
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    user: null!,
  },
  defaultPreload: "intent",
  routeTree,
  scrollRestoration: true,
});

type AppProps = {
  supabase: SupabaseTypedClient;
};

export const App = ({ supabase }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseProvider supabase={supabase}>
        <Suspense fallback={"Loading user"}>
          <UserProvider>
            <Router />
          </UserProvider>
        </Suspense>
      </SupabaseProvider>
    </QueryClientProvider>
  );
};

const Router = () => {
  const user = useUserContext();

  return <RouterProvider context={{ user }} router={router} />;
};
