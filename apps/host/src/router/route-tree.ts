import {
  createRootRouteWithContext,
  createRoute,
} from "@tanstack/react-router";
import * as v from "valibot";
import type { GetBookmarksRoute } from "../../../bookmarks/src/route";
import type { GetTagsRoute } from "../../../tags/src/route";
import { FormLayout } from "../layouts/form-layout";
import { ProtectedLayout } from "../layouts/protected-layout";
import { SignInRoute } from "../routes/sign-in-route";
import { SignUpRoute } from "../routes/sign-up-route";
import { SignUpSuccessRoute } from "../routes/sign-up-success-route";
import type { RootRouteContext } from "./route-context";
import { authGuard, guestGuard } from "./route-guards";

export const getAsyncRouteTree = async () => {
  const rootRoute = createRootRouteWithContext<RootRouteContext>()({});

  const protectedLayout = createRoute({
    beforeLoad: authGuard,
    component: ProtectedLayout,
    getParentRoute: () => rootRoute,
    id: "protected",
  });

  const [getBookmarksRoute, getTagsRoute] = await Promise.all([
    // @ts-ignore
    import("bookmarks/bookmarks-route-tree").then(
      (module) => module.getBookmarksRouteTree as GetBookmarksRoute,
    ),
    // @ts-ignore
    import("tags/tags-route-tree").then(
      (module) => module.getTagsRouteTree as GetTagsRoute,
    ),
  ]);

  const indexRoute = getBookmarksRoute({ rootRoute: protectedLayout });
  const tagsRoute = getTagsRoute({ parentRoute: protectedLayout });

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

export type AsyncRouteTree = Awaited<ReturnType<typeof getAsyncRouteTree>>;
