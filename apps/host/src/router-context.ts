import type { QueryClient } from "@tanstack/react-query";
import type { UserContextValue } from "@trmf/auth-util";
import type { SupabaseTypedClient } from "@trmf/supabase-util";

export type RootRouteContext = {
  queryClient: QueryClient;
  user: UserContextValue;
  supabase: SupabaseTypedClient;
};
