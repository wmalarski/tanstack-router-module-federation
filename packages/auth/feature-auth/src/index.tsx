import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserQueryOptions } from "@trmf/data-access-auth";
import { UserContext } from "@trmf/util-auth";
import { useSupabaseContext } from "@trmf/util-supabase";
import type { PropsWithChildren } from "react";

export const UserProvider = ({ children }: PropsWithChildren) => {
  const supabase = useSupabaseContext();

  const userQuery = useSuspenseQuery(getUserQueryOptions({ supabase }));

  return <UserContext value={userQuery.data}>{children}</UserContext>;
};
