import { QueryClientProvider } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { UserContext } from "@trmf/auth-util";
import { SupabaseProvider } from "@trmf/supabase-util";
import { type PropsWithChildren, useMemo } from "react";

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const context = useRouteContext({ from: "__root__" });

  const userContextValue = useMemo(
    () => ({ user: context.user }),
    [context.user],
  );

  return (
    <QueryClientProvider client={context.queryClient}>
      <SupabaseProvider supabase={context.supabase}>
        <UserContext value={userContextValue}>{children}</UserContext>
      </SupabaseProvider>
    </QueryClientProvider>
  );
};
