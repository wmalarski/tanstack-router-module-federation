import { useQueryClient } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useUser } from "@trmf/auth-util";
import { getSupabaseContext } from "@trmf/supabase-util";
import "@trmf/ui/globals.css";
import { use, useMemo } from "react";
import "./app.css";
import type { AsyncRouteTree } from "./route-tree";
import type { RootRouteContext } from "./router-context";

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

  console.log("resolvedRouteTree", resolvedRouteTree);

  return <RouterProvider router={router} />;
};
