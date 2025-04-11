import type { QueryClient } from "@tanstack/react-query";
import { type ParsedLocation, redirect } from "@tanstack/react-router";
import { getUserQueryOptions } from "@trmf/auth-data-access";
import type { RootRouteContext } from "./router-context";

type AuthGuardArgs = {
  context: RootRouteContext;
  location: ParsedLocation;
};

const getCachedUser = (queryClient: QueryClient) => {
  return queryClient.getQueryData(getUserQueryOptions().queryKey);
};

export const authGuard = ({ context, location }: AuthGuardArgs) => {
  const user = getCachedUser(context.queryClient);

  console.log("authGuard", { context, location, user });

  if (!user) {
    throw redirect({
      search: { redirect: location.href },
      to: "/sign-in",
    });
  }
};

type GuestGuardArgs = {
  context: RootRouteContext;
};

export const guestGuard = ({ context }: GuestGuardArgs) => {
  const user = getCachedUser(context.queryClient);

  console.log("guestGuard", { context, user });

  if (user) {
    throw redirect({ to: "/" });
  }
};
