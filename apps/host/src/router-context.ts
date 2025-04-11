import type { QueryClient } from "@tanstack/react-query";
import type { UserStore } from "@trmf/auth-util";
import type { SupabaseTypedClient } from "@trmf/supabase-util";

export type RootRouteContext = {
  queryClient: QueryClient;
  supabase: SupabaseTypedClient;
  userStore: UserStore;
};
