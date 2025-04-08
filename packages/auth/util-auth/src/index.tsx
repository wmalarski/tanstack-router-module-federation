import type { UserResponse } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

type UserContextValue = UserResponse | null;

export const UserContext = createContext<UserContextValue>(null);

export const useUserContext = () => {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error("UserContext not defined!");
  }

  return user;
};
