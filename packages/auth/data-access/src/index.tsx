import type {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from "@supabase/supabase-js";
import { type QueryClient, queryOptions } from "@tanstack/react-query";
import { getSupabaseContext } from "@trmf/supabase-util";
import { useEffect } from "react";

export const getUserQueryOptions = () => {
  return queryOptions({
    queryFn: async () => {
      const response = await getSupabaseContext().auth.getUser();
      return response.data.user;
    },
    queryKey: ["data-access-auth", "get-user"],
  });
};

export const signInWithPasswordMutationOptions = () => {
  return {
    mutationFn: (args: SignInWithPasswordCredentials) =>
      getSupabaseContext().auth.signInWithPassword(args),
  };
};

export const signUpMutationOptions = () => {
  return {
    mutationFn: (args: SignUpWithPasswordCredentials) =>
      getSupabaseContext().auth.signUp(args),
  };
};

export const signOutMutationOptions = () => {
  return {
    mutationFn: () => getSupabaseContext().auth.signOut(),
  };
};

export const useOnAuthStateChangeListener = (queryClient: QueryClient) => {
  useEffect(() => {
    const result = getSupabaseContext().auth.onAuthStateChange(
      (_event, session) => {
        const options = getUserQueryOptions();
        queryClient.setQueryData(options.queryKey, session?.user);
      },
    );

    return () => {
      result.data.subscription.unsubscribe();
    };
  }, [queryClient.setQueryData]);
};
