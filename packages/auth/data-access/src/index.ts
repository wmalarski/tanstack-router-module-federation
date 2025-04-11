import type {
  AuthResponse,
  AuthTokenResponsePassword,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from "@supabase/supabase-js";
import { type MutationOptions, queryOptions } from "@tanstack/react-query";
import {
  getSupabaseContext,
  type SupabaseTypedClient,
} from "@trmf/supabase-util";

export const getUserQueryOptions = () => {
  const supabase = getSupabaseContext();

  return queryOptions({
    queryFn: async () => {
      const response = await supabase.auth.getUser();
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
