import type {
  AuthResponse,
  AuthTokenResponsePassword,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
  User,
} from "@supabase/supabase-js";
import { type MutationOptions, queryOptions } from "@tanstack/react-query";
import { useCallbackRef } from "@trmf/hooks-util/use-callback-ref";
import {
  getSupabaseContext,
  type SupabaseTypedClient,
  useSupabaseContext,
} from "@trmf/supabase-util";
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
  const supabase = getSupabaseContext();

  return {
    mutationFn: (args) => supabase.auth.signInWithPassword(args),
    onSuccess,
  };
};

type SignUpMutationOptionsArgs = {
  onSuccess: (data: AuthResponse) => void;
};

export const signUpMutationOptions = ({
  onSuccess,
}: SignUpMutationOptionsArgs): MutationOptions<
  AuthResponse,
  Error,
  SignUpWithPasswordCredentials
> => {
  const supabase = getSupabaseContext();
  return {
    mutationFn: (args) => supabase.auth.signUp(args),
    onSuccess,
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
  return {
    mutationFn: () => supabase.auth.signOut(),
    onSuccess,
  };
};

type UseOnAuthStateChangeListenerArgs = {
  onSuccess: (user: User | null) => void;
};

export const useOnAuthStateChangeListener = ({
  onSuccess,
}: UseOnAuthStateChangeListenerArgs) => {
  const supabase = useSupabaseContext();
  const onSuccessRef = useCallbackRef(onSuccess);

  useEffect(() => {
    const result = supabase.auth.onAuthStateChange((_event, session) =>
      onSuccessRef(session?.user ?? null),
    );

    return () => result.data.subscription.unsubscribe();
  }, [supabase.auth.onAuthStateChange, onSuccessRef]);
};
