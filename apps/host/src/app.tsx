import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  Link,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { Button } from "@trmf/ui/components/button";
import "@trmf/ui/globals.css";
import { SupabaseProvider } from "@trmf/util-supabase";
import "./app.css";

const rootRoute = createRootRouteWithContext<{
  queryClient: QueryClient;
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
  },
  defaultPreload: "intent",
  routeTree,
  scrollRestoration: true,
});

export const App = () => {
  return (
    <SupabaseProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </SupabaseProvider>
  );
};
