import { type ParsedLocation, redirect } from "@tanstack/react-router";
import type { RootRouteContext } from "./route-context";

type AuthGuardArgs = {
  context: RootRouteContext;
  location: ParsedLocation;
};

export const authGuard = ({ context, location }: AuthGuardArgs) => {
  if (!context.user) {
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
  if (context.user) {
    throw redirect({ to: "/" });
  }
};
