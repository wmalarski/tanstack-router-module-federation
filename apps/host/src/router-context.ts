import type { User } from "@supabase/supabase-js";
import type { QueryClient } from "@tanstack/react-query";
import type { SupabaseTypedClient } from "@trmf/supabase-util";

export type RootRouteContext = {
  queryClient: QueryClient;
  user: User | null;
  supabase: SupabaseTypedClient;
};
