import { type ParsedLocation, redirect } from "@tanstack/react-router";
import type { RootRouteContext } from "./router-context";

type AuthGuardArgs = {
  context: RootRouteContext;
  location: ParsedLocation;
};

const getUserFromStore = (context: RootRouteContext) => {
  return context.userStore.getSnapshot().context.user;
};

export const authGuard = ({ context, location }: AuthGuardArgs) => {
  const user = getUserFromStore(context);

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
  const user = getUserFromStore(context);

  if (user) {
    throw redirect({ to: "/" });
  }
};
