import { type ParsedLocation, redirect } from "@tanstack/react-router";
import type { RootRouteContext } from "./router-context";

type AuthGuardArgs = {
  context: RootRouteContext;
  location: ParsedLocation;
};

const getUser = (context: RootRouteContext) => {
  return context.userStore.getSnapshot().context.user;
};

export const authGuard = ({ context, location }: AuthGuardArgs) => {
  const user = getUser(context);

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
  const user = getUser(context);

  console.log("guestGuard", { context, user });

  if (user) {
    throw redirect({ to: "/" });
  }
};
