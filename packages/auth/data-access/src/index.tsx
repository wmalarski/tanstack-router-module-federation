import type { SignInWithPasswordCredentials } from "@supabase/supabase-js";
import { queryOptions } from "@tanstack/react-query";
import { getSupabaseContext } from "@trmf/supabase-util";

export const getUserQueryOptions = () => {
  return queryOptions({
    queryFn: () => getSupabaseContext().auth.getUser(),
    queryKey: ["data-access-auth", "get-user"],
  });
};

export const signInWithPasswordMutationOptions = () => {
  return {
    mutationFn: (args: SignInWithPasswordCredentials) =>
      getSupabaseContext().auth.signInWithPassword(args),
  };
};

export const signOutMutationOptions = () => {
  return {
    mutationFn: () => getSupabaseContext().auth.signOut(),
  };
};
