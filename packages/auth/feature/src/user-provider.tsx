import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { getUserQueryOptions } from "@trmf/auth-data-access";
import { UserContext } from "@trmf/auth-util";
import { useSupabaseContext } from "@trmf/supabase-util";
import { type PropsWithChildren, useEffect, useMemo } from "react";

export const UserProvider = ({ children }: PropsWithChildren) => {
  // const router = useRouter();

  // const supabase = useSupabaseContext();

  const userQuery = useSuspenseQuery(getUserQueryOptions());

  // const [user, setUser] = useState({ user: userQuery.data });

  const contextValue = useMemo(
    () => ({ user: userQuery.data }),
    [userQuery.data],
  );

  // const contextValue = useMemo(
  //   () => ({ userStore: getUserStore(userQuery.data) }),
  //   [userQuery.data],
  // );

  // useEffect(() => {
  //   const result = supabase.auth.onAuthStateChange(async (_event, session) => {
  //     const user = session?.user ?? null;
  //     setUser({ user });
  //     contextValue.userStore.send({ type: "setUser", user });

  //     await router?.invalidate();
  //   });

  //   return () => result.data.subscription.unsubscribe();
  // }, [
  //   supabase.auth.onAuthStateChange,
  //   contextValue.userStore.send,
  //   router?.invalidate,
  // ]);

  console.log("UserProvider", contextValue);

  return <UserContext value={contextValue}>{children}</UserContext>;
};

export const UserChangeListener = () => {
  const router = useRouter();

  const supabase = useSupabaseContext();

  const queryClient = useQueryClient();

  useEffect(() => {
    const userQueryKey = getUserQueryOptions().queryKey;
    const result = supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user ?? null;
      queryClient.setQueryData(userQueryKey, user);
      await router?.invalidate();
    });

    return () => result.data.subscription.unsubscribe();
  }, [
    supabase.auth.onAuthStateChange,
    router?.invalidate,
    queryClient.setQueryData,
  ]);

  return null;
};
