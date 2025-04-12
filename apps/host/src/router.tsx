import { useQueryClient } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useUser } from "@trmf/auth-util";
import { getSupabaseContext } from "@trmf/supabase-util";
import "@trmf/ui/globals.css";
import { useMemo } from "react";
import "./app.css";
import { getRouteTree } from "./route-tree";
import type { RootRouteContext } from "./router-context";

const getRouter = (context: RootRouteContext) => {
  return createRouter({
    context,
    defaultPreload: "intent",
    routeTree: getRouteTree(),
    scrollRestoration: true,
  });
};

export type RouterType = ReturnType<typeof getRouter>;

export const Router = () => {
  const supabase = getSupabaseContext();
  const user = useUser();
  const queryClient = useQueryClient();

  const router = useMemo(
    () => getRouter({ queryClient, supabase, user }),
    [supabase, user, queryClient],
  );

  return <RouterProvider router={router} />;
};
