import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { useUserContext } from "@trmf/auth-util";
import { TopNavbar } from "@trmf/shared-layout-feature/top-navbar";
import { getSupabaseContext } from "@trmf/supabase-util";
import "@trmf/ui/globals.css";
import { useState } from "react";
import * as v from "valibot";
import "./app.css";
import type { RootRouteContext } from "./router-context";
import { authGuard, guestGuard } from "./router-guards";
import { SignInRoute } from "./routes/sign-in-route";
import { SignUpRoute } from "./routes/sign-up-route";
import { SignUpSuccessRoute } from "./routes/sign-up-success-route";

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
  beforeLoad: authGuard,
  path: "/",
}).lazy(() =>
  // @ts-ignore
  import("bookmarks/bookmarks-router").then((module) => module.Route),
);

const tagsRoute = createRoute({
  getParentRoute: () => rootRoute,
  beforeLoad: authGuard,
  path: "/tags",
  // @ts-ignore
}).lazy(() => import("tags/tags-router").then((module) => module.Route));

const signUpRoute = createRoute({
  component: SignUpRoute,
  getParentRoute: () => rootRoute,
  beforeLoad: guestGuard,
  path: "/sign-up",
});

const signUpSuccessRoute = createRoute({
  component: SignUpSuccessRoute,
  getParentRoute: () => signUpRoute,
  beforeLoad: guestGuard,
  path: "/success",
});

const signInRoute = createRoute({
  component: SignInRoute,
  getParentRoute: () => rootRoute,
  beforeLoad: guestGuard,
  path: "/sign-in",
  validateSearch: v.object({ redirect: v.optional(v.string(), "") }),
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
