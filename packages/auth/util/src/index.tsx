import type { User } from "@supabase/supabase-js";
import { createStore } from "@xstate/store";
import { useSelector } from "@xstate/store/react";
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
  userStore: UserStore | null;
};

export const UserContext = createContext<UserContextValue>({ userStore: null });

export const useUserStore = () => {
  const context = useContext(UserContext);

  if (!context.userStore) {
    throw new Error("UserContext is not defined!");
  }

  return context.userStore;
};

export const useUserContext = () => {
  const userStore = useUserStore();
  return useSelector(userStore, (store) => store.context.user);
};

export const useRequiredUserContext = () => {
  const user = useUserContext();

  if (!user) {
    throw new Error("User is not defined!");
  }

  return user;
};
