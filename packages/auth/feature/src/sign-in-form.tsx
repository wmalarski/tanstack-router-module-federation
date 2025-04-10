import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { signInWithPasswordMutationOptions } from "@trmf/auth-data-access";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@trmf/ui/components/card";
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
    console.log("onSubmit");
    form.handleSubmit();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <AuthFields form={form} />
          <form.AppForm>
            <form.Button type="submit">Sign In</form.Button>
          </form.AppForm>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link className="underline underline-offset-4" to="/sign-up">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
