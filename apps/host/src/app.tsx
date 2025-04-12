import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "@trmf/auth-feature/user-provider";
import {
  SupabaseProvider,
  type SupabaseTypedClient,
} from "@trmf/supabase-util";
import "@trmf/ui/globals.css";
import { Suspense } from "react";
import "./app.css";
import type { AsyncRouteTree } from "./route-tree";
import { Router } from "./router";

const queryClient = new QueryClient();

type AppProps = {
  supabase: SupabaseTypedClient;
  routeTree: Promise<AsyncRouteTree>;
};

export const App = ({ supabase, routeTree }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseProvider supabase={supabase}>
        <Suspense fallback={"Loading user"}>
          <UserProvider>
            <Router routeTree={routeTree} />
          </UserProvider>
        </Suspense>
      </SupabaseProvider>
    </QueryClientProvider>
  );
};
