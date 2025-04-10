import type { User } from "@supabase/supabase-js";
import { createContext, use, useContext } from "react";

export type UserContextValue = {
  user: User | null;
};

export const UserContext = createContext<UserContextValue>({ user: null });

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("User is not defined!");
  }

  return context.user;
};

export const getUserContext = () => {
  const context = use(UserContext);

  if (!context) {
    throw new Error("User is not defined!");
  }

  return context.user;
};

export const useRequiredUserContext = () => {
  const user = useUserContext();

  if (!user) {
    throw new Error("User is not defined!");
  }

  return user;
};

export const getRequiredUserContext = () => {
  const user = getUserContext();

  if (!user) {
    throw new Error("User is not defined!");
  }

  return user;
};
