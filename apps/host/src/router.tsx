import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { type UserContextValue, useUserContext } from "@trmf/auth-util";
import { TopNavbar } from "@trmf/shared-layout-feature/top-navbar";
import {
  getSupabaseContext,
  type SupabaseTypedClient,
} from "@trmf/supabase-util";
import "@trmf/ui/globals.css";
import { useState } from "react";
import "./app.css";
import { SignInRoute } from "./routes/sign-in-route";
import { SignUpRoute } from "./routes/sign-up-route";
import { SignUpSuccessRoute } from "./routes/sign-up-success-route";

type RootRouteContext = {
  queryClient: QueryClient;
  user: UserContextValue;
  supabase: SupabaseTypedClient;
};

const rootRoute = createRootRouteWithContext<RootRouteContext>()({
  component: () => (
    <>
      <TopNavbar />
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

const tagsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tags",
  // @ts-ignore
}).lazy(() => import("tags/tags-router").then((module) => module.Route));

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-up",
  component: SignUpRoute,
});

const signUpSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-up/success",
  component: SignUpSuccessRoute,
});

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-in",
  component: SignInRoute,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  tagsRoute,
  signUpRoute,
  signUpSuccessRoute,
  signInRoute,
]);

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

  return <RouterProvider router={router} />;
};
