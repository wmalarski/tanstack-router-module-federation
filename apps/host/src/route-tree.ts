import {
  createRootRouteWithContext,
  createRoute,
} from "@tanstack/react-router";
import * as v from "valibot";
import { FormLayout } from "./layouts/form-layout";
import { ProtectedLayout } from "./layouts/protected-layout";
import type { RootRouteContext } from "./router-context";
import { authGuard, guestGuard } from "./router-guards";
import { SignInRoute } from "./routes/sign-in-route";
import { SignUpRoute } from "./routes/sign-up-route";
import { SignUpSuccessRoute } from "./routes/sign-up-success-route";

export const getRouteTree = () => {
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

  return routeTree;
};
