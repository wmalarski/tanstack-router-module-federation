import type {
  AuthResponse,
  AuthTokenResponsePassword,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from "@supabase/supabase-js";
import {
  type MutationOptions,
  QueryClientContext,
  queryOptions,
} from "@tanstack/react-query";
import {
  getSupabaseContext,
  type SupabaseTypedClient,
  useSupabaseContext,
} from "@trmf/supabase-util";
import { use, useEffect } from "react";

export const getUserQueryOptions = () => {
  return queryOptions({
    queryFn: async () => {
      const response = await getSupabaseContext().auth.getUser();
      return response.data.user;
    },
    queryKey: ["data-access-auth", "get-user"],
  });
};

type SignInWithPasswordMutationOptionsArgs = {
  onSuccess: (data: AuthTokenResponsePassword) => void;
};

export const signInWithPasswordMutationOptions = ({
  onSuccess,
}: SignInWithPasswordMutationOptionsArgs): MutationOptions<
  AuthTokenResponsePassword,
  Error,
  SignInWithPasswordCredentials
> => {
  const queryClient = use(QueryClientContext);
  const supabase = getSupabaseContext();

  return {
    mutationFn: (args) => supabase.auth.signInWithPassword(args),
    onSuccess: (data) => {
      queryClient?.setQueryData(getUserQueryOptions().queryKey, data.data.user);
      onSuccess(data);
    },
  };
};

export const signUpMutationOptions = (): MutationOptions<
  AuthResponse,
  Error,
  SignUpWithPasswordCredentials
> => {
  const supabase = getSupabaseContext();
  return {
    mutationFn: (args) => supabase.auth.signUp(args),
  };
};

type SignOutResponse = Awaited<
  ReturnType<SupabaseTypedClient["auth"]["signOut"]>
>;

type SignOutMutationOptionsArgs = {
  onSuccess: (data: SignOutResponse) => void;
};

export const signOutMutationOptions = ({
  onSuccess,
}: SignOutMutationOptionsArgs): MutationOptions<SignOutResponse, Error> => {
  const supabase = getSupabaseContext();
  const queryClient = use(QueryClientContext);

  return {
    mutationFn: () => supabase.auth.signOut(),
    onSuccess: (data) => {
      queryClient?.removeQueries({
        queryKey: getUserQueryOptions().queryKey,
        exact: true,
      });
      onSuccess(data);
    },
  };
};

export const useOnAuthStateChangeListener = () => {
  const supabase = useSupabaseContext();
  const queryClient = use(QueryClientContext);

  useEffect(() => {
    const result = supabase.auth.onAuthStateChange((_event, session) => {
      const options = getUserQueryOptions();
      console.log("onAuthStateChange", options.queryKey, session?.user);
      queryClient?.setQueryData(options.queryKey, session?.user);
    });

    return () => {
      result.data.subscription.unsubscribe();
    };
  }, [queryClient?.setQueryData, supabase.auth.onAuthStateChange]);
};
