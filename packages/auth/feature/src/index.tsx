import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserQueryOptions } from "@trmf/auth-data-access";
import { UserContext } from "@trmf/auth-util";
import { useSupabaseContext } from "@trmf/supabase-util";
import type { PropsWithChildren } from "react";

export const UserProvider = ({ children }: PropsWithChildren) => {
  const supabase = useSupabaseContext();

  const userQuery = useSuspenseQuery(getUserQueryOptions({ supabase }));

  return <UserContext value={userQuery.data}>{children}</UserContext>;
};
