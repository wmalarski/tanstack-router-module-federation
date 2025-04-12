import type { User } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

export type UserContextValue = {
  user: User | null;
};

export const UserContext = createContext<UserContextValue>({ user: null });

export const useUserStore = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserContext is not defined!");
  }

  return context;
};

export const useUser = () => {
  const userStore = useUserStore();
  return userStore.user;
};

export const useUserOrThrow = () => {
  const user = useUser();

  if (!user) {
    throw new Error("User is not defined!");
  }

  return user;
};
