import { queryOptions } from "@tanstack/react-query";
import type { SupabaseTypedClient } from "@trmf/supabase-util";

type GetUserQueryOptionsArgs = {
  supabase: SupabaseTypedClient;
};

export const getUserQueryOptions = ({ supabase }: GetUserQueryOptionsArgs) => {
  return queryOptions({
    queryFn: () => supabase.auth.getUser(),
    queryKey: ["data-access-auth", "get-user"],
  });
};
