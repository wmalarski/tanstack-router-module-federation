import { useMutation } from "@tanstack/react-query";
import { signUpMutationOptions } from "@trmf/auth-data-access";
import type { ComponentProps } from "react";
import { AuthFields, useAuthFields } from "./auth-fields";

export const SignUpForm = () => {
  const signUpMutation = useMutation(signUpMutationOptions());

  const form = useAuthFields({
    onSubmit: (value) => {
      signUpMutation.mutate(value);
    },
  });

  const onSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();
    form.handleSubmit();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Sing Up</h2>
      <AuthFields form={form} />
      <form.AppForm>
        <form.Button type="submit">Sign Up</form.Button>
      </form.AppForm>
    </form>
  );
};
