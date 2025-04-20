import type {
  AuthResponse,
  AuthTokenResponsePassword,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from "@supabase/supabase-js";
import { type MutationOptions, queryOptions } from "@tanstack/react-query";
import { getSupabaseContext } from "@trmf/supabase-util";

export const getUserQueryOptions = () => {
  return queryOptions({
    queryFn: async () => {
      const response = await getSupabaseContext().auth.getUser();
      return response.data.user;
    },
    queryKey: ["data-access-auth", "get-user"],
  });
};

type AuthTokenResponsePasswordData = (AuthTokenResponsePassword & {
  error: null;
})["data"];

type SignInWithPasswordMutationOptionsArgs = {
  onSuccess: (data: AuthTokenResponsePasswordData) => void;
};

export const signInWithPasswordMutationOptions = ({
  onSuccess,
}: SignInWithPasswordMutationOptionsArgs): MutationOptions<
  AuthTokenResponsePasswordData,
  Error,
  SignInWithPasswordCredentials
> => {
  const supabase = getSupabaseContext();

  return {
    mutationFn: async (args) => {
      const response = await supabase.auth.signInWithPassword(args);

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
    onSuccess,
  };
};

type AuthResponseData = (AuthResponse & { error: null })["data"];

type SignUpMutationOptionsArgs = {
  onSuccess: (data: AuthResponseData) => void;
};

export const signUpMutationOptions = ({
  onSuccess,
}: SignUpMutationOptionsArgs): MutationOptions<
  AuthResponseData,
  Error,
  SignUpWithPasswordCredentials
> => {
  const supabase = getSupabaseContext();

  return {
    mutationFn: async (args) => {
      const response = await supabase.auth.signUp(args);

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
    onSuccess,
  };
};

type SignOutMutationOptionsArgs = {
  onSuccess: () => void;
};

export const signOutMutationOptions = ({
  onSuccess,
}: SignOutMutationOptionsArgs): MutationOptions<void, Error> => {
  const supabase = getSupabaseContext();

  return {
    mutationFn: async () => {
      const response = await supabase.auth.signOut();

      if (response.error) {
        throw response.error;
      }
    },
    onSuccess,
  };
};
