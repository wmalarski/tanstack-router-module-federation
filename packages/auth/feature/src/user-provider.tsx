import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import {
  getUserQueryOptions,
  useOnAuthStateChangeListener,
} from "@trmf/auth-data-access";
import { UserContext } from "@trmf/auth-util";
import { type PropsWithChildren, useMemo } from "react";

export const UserProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();

  const userQuery = useSuspenseQuery(getUserQueryOptions());
  useOnAuthStateChangeListener(queryClient);

  const value = useMemo(() => ({ user: userQuery.data }), [userQuery.data]);

  return <UserContext value={value}>{children}</UserContext>;
};
