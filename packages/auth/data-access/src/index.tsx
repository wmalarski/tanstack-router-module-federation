import { queryOptions } from "@tanstack/react-query";
import type { SupabaseTypedClient } from "@trmf/supabase-util";

type GetUserQueryOptionsArgs = {
  supabase: SupabaseTypedClient;
};

export const getUserQueryOptions = ({ supabase }: GetUserQueryOptionsArgs) => {
  return queryOptions({
    queryKey: ["data-access-auth", "get-user"],
    queryFn: () => supabase.auth.getUser(),
  });
};
