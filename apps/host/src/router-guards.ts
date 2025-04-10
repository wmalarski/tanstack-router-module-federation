import { type ParsedLocation, redirect } from "@tanstack/react-router";
import type { RootRouteContext } from "./router-context";

type AuthGuardArgs = {
  context: RootRouteContext;
  location: ParsedLocation;
};

export const authGuard = ({ context, location }: AuthGuardArgs) => {
  if (!context.user.user) {
    throw redirect({
      to: "/sign-in",
      search: { redirect: location.href },
    });
  }
};

type GuestGuardArgs = {
  context: RootRouteContext;
};

export const guestGuard = ({ context }: GuestGuardArgs) => {
  if (context.user.user) {
    throw redirect({ to: "/" });
  }
};
