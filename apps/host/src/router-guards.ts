import { type ParsedLocation, redirect } from "@tanstack/react-router";
import type { RootRouteContext } from "./router-context";

type AuthGuardArgs = {
  context: RootRouteContext;
  location: ParsedLocation;
};

export const authGuard = ({ context, location }: AuthGuardArgs) => {
  console.log("authGuard", { context, location });

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
  console.log("guestGuard", { context });
  if (context.user) {
    throw redirect({ to: "/" });
  }
};
