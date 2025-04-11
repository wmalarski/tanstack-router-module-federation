import { useSuspenseQuery } from "@tanstack/react-query";
import {
  getUserQueryOptions,
  useOnAuthStateChangeListener,
} from "@trmf/auth-data-access";
import { getUserStore, UserContext } from "@trmf/auth-util";
import { type PropsWithChildren, useMemo } from "react";

export const UserProvider = ({ children }: PropsWithChildren) => {
  const userQuery = useSuspenseQuery(getUserQueryOptions());

  const contextValue = useMemo(
    () => ({ userStore: getUserStore(userQuery.data) }),
    [userQuery.data],
  );

  useOnAuthStateChangeListener({
    onSuccess: (user) => {
      contextValue.userStore.send({ type: "setUser", user });
    },
  });

  return <UserContext value={contextValue}>{children}</UserContext>;
};
