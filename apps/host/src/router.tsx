import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { useUserStore } from "@trmf/auth-util";
import { getSupabaseContext } from "@trmf/supabase-util";
import "@trmf/ui/globals.css";
import { useMemo } from "react";
import * as v from "valibot";
import "./app.css";
import { FormLayout } from "./layouts/form-layout";
import { ProtectedLayout } from "./layouts/protected-layout";
import type { RootRouteContext } from "./router-context";
import { authGuard, guestGuard } from "./router-guards";
import { SignInRoute } from "./routes/sign-in-route";
import { SignUpRoute } from "./routes/sign-up-route";
import { SignUpSuccessRoute } from "./routes/sign-up-success-route";

const rootRoute = createRootRouteWithContext<RootRouteContext>()({});

const protectedLayout = createRoute({
  beforeLoad: authGuard,
  component: ProtectedLayout,
  getParentRoute: () => rootRoute,
  id: "protected",
});

const indexRoute = createRoute({
  getParentRoute: () => protectedLayout,
  path: "/",
}).lazy(() =>
  // @ts-ignore
  import("bookmarks/bookmarks-router").then((module) => module.Route),
);

const tagsRoute = createRoute({
  getParentRoute: () => protectedLayout,
  path: "/tags",
  // @ts-ignore
}).lazy(() => import("tags/tags-router").then((module) => module.Route));

const formLayout = createRoute({
  beforeLoad: guestGuard,
  component: FormLayout,
  getParentRoute: () => rootRoute,
  id: "form",
});

const signUpRoute = createRoute({
  component: SignUpRoute,
  getParentRoute: () => formLayout,
  path: "/sign-up",
});

const signUpSuccessRoute = createRoute({
  component: SignUpSuccessRoute,
  getParentRoute: () => formLayout,
  path: "/success",
});

const signInRoute = createRoute({
  component: SignInRoute,
  getParentRoute: () => formLayout,
  path: "/sign-in",
  validateSearch: v.object({ redirect: v.optional(v.string(), "") }),
});

const routeTree = rootRoute.addChildren([
  protectedLayout.addChildren([indexRoute, tagsRoute]),
  formLayout.addChildren([signUpRoute, signUpSuccessRoute, signInRoute]),
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
  const supabase = getSupabaseContext();
  const userStore = useUserStore();

  const router = useMemo(
    () => getRouter({ queryClient, supabase, userStore }),
    [supabase, userStore],
  );

  return <RouterProvider router={router} />;
};
