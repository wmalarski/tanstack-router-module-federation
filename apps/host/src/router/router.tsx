import { useQueryClient } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useUser } from "@trmf/auth-util";
import { getSupabaseContext } from "@trmf/supabase-util";
import { use, useMemo } from "react";

import type { RootRouteContext } from "./route-context";
import type { AsyncRouteTree } from "./route-tree";

const getRouter = (routeTree: AsyncRouteTree, context: RootRouteContext) => {
  return createRouter({
    context,
    defaultPreload: "intent",
    routeTree,
    scrollRestoration: true,
  });
};

export type RouterType = ReturnType<typeof getRouter>;

type RouterProps = {
  routeTree: Promise<AsyncRouteTree>;
};

export const Router = ({ routeTree }: RouterProps) => {
  const supabase = getSupabaseContext();
  const user = useUser();
  const queryClient = useQueryClient();

  const resolvedRouteTree = use(routeTree);

  const router = useMemo(
    () => getRouter(resolvedRouteTree, { queryClient, supabase, user }),
    [supabase, user, queryClient, resolvedRouteTree],
  );

  return <RouterProvider router={router} />;
};
