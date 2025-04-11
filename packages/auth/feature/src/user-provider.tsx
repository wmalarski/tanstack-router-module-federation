import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserQueryOptions } from "@trmf/auth-data-access";
import { getUserStore, UserContext } from "@trmf/auth-util";
import { useSupabaseContext } from "@trmf/supabase-util";
import { type PropsWithChildren, useEffect, useMemo } from "react";

export const UserProvider = ({ children }: PropsWithChildren) => {
  const supabase = useSupabaseContext();

  const userQuery = useSuspenseQuery(getUserQueryOptions());

  const contextValue = useMemo(
    () => ({ userStore: getUserStore(userQuery.data) }),
    [userQuery.data],
  );

  useEffect(() => {
    const result = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      contextValue.userStore.send({ type: "setUser", user });
    });

    return () => result.data.subscription.unsubscribe();
  }, [supabase.auth.onAuthStateChange, contextValue.userStore.send]);

  return <UserContext value={contextValue}>{children}</UserContext>;
};
