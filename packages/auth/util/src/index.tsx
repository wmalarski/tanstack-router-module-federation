import type { User } from "@supabase/supabase-js";
import { createStore } from "@xstate/store";
import { createContext, useContext } from "react";

export const getUserStore = (user: User | null) => {
  return createStore({
    context: { user },
    on: {
      setUser: (_context, event: { user: User | null }) => ({
        user: event.user,
      }),
    },
  });
};

export type UserStore = ReturnType<typeof getUserStore>;

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

export const useUserContext = () => {
  const userStore = useUserStore();
  return userStore.user;
  // return useSelector(userStore, (store) => store.context.user);
};

export const useRequiredUserContext = () => {
  const user = useUserContext();

  if (!user) {
    throw new Error("User is not defined!");
  }

  return user;
};
