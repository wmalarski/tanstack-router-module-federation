import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
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
  const navigate = useNavigate();

  const signUpMutation = useMutation(
    signUpMutationOptions({
      onSuccess: async () => {
        await navigate({ to: "/sign-in" });
      },
    }),
  );

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
        <CardTitle className="auth:text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your email below to sign up to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="auth:flex auth:flex-col auth:gap-6"
          onSubmit={onSubmit}
        >
          <AuthFields form={form} />
          <form.AppForm>
            <form.Button type="submit">Sign Up</form.Button>
          </form.AppForm>
          <div className="auth:mt-4 auth:text-center auth:text-sm">
            Do you have an account?{" "}
            <Link
              className="auth:underline auth:underline-offset-4"
              to="/sign-in"
            >
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
