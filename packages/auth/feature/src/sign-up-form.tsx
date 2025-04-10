import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { signUpMutationOptions } from "@trmf/auth-data-access";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@trmf/ui/components/card";
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
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your email below to sign up to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <AuthFields form={form} />
          <form.AppForm>
            <form.Button type="submit">Sign Up</form.Button>
          </form.AppForm>
          <div className="mt-4 text-center text-sm">
            Do you have an account?{" "}
            <Link className="underline underline-offset-4" to="/sign-in">
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
