import { useSuspenseQuery } from "@tanstack/react-query";
import {
  getUserQueryOptions,
  useOnAuthStateChangeListener,
} from "@trmf/auth-data-access";
import { UserContext } from "@trmf/auth-util";
import { type PropsWithChildren, useMemo } from "react";

export const UserProvider = ({ children }: PropsWithChildren) => {
  const userQuery = useSuspenseQuery(getUserQueryOptions());
  useOnAuthStateChangeListener();

  const value = useMemo(() => ({ user: userQuery.data }), [userQuery.data]);

  console.log("UserProvider", value);

  return <UserContext value={value}>{children}</UserContext>;
};
