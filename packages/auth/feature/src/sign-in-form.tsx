import { useMutation } from "@tanstack/react-query";
import { signInWithPasswordMutationOptions } from "@trmf/auth-data-access";
import type { ComponentProps } from "react";
import { AuthFields, useAuthFields } from "./auth-fields";

export const SignInForm = () => {
  const signInMutation = useMutation(signInWithPasswordMutationOptions());

  const form = useAuthFields({
    onSubmit: (value) => {
      signInMutation.mutate(value);
    },
  });

  const onSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();
    form.handleSubmit();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Sing In</h2>
      <AuthFields form={form} />
      <form.AppForm>
        <form.Button type="submit">Sign In</form.Button>
      </form.AppForm>
    </form>
  );
};
