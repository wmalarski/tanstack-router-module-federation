import { QueryClientProvider } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { UserContext } from "@trmf/auth-util";
import { SupabaseProvider } from "@trmf/supabase-util";
import type { PropsWithChildren } from "react";

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const context = useRouteContext({ from: "__root__" });

  return (
    <QueryClientProvider client={context.queryClient}>
      <SupabaseProvider supabase={context.supabase}>
        <UserContext value={context.user}>{children}</UserContext>
      </SupabaseProvider>
    </QueryClientProvider>
  );
};
