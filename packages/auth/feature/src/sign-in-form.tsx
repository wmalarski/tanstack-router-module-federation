import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { signInWithPasswordMutationOptions } from "@trmf/auth-data-access";
import { Button } from "@trmf/ui/components/button";
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
  const navigate = useNavigate();

  const signInMutation = useMutation(
    signInWithPasswordMutationOptions({
      onSuccess: async () => {
        await navigate({ to: "/" });
      },
    }),
  );

  const form = useAuthFields({
    onSubmit: (value) => {
      signInMutation.mutate(value);
    },
  });

  const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();
    await form.handleSubmit();
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
        <form className="flex flex-col gap-6" onSubmit={onSubmit}>
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
        <Button
          onClick={async () => {
            const res = await navigate({ to: "/" });
            console.log("NAVIGATE", res);
          }}
        >
          Navigate
        </Button>
      </CardContent>
    </Card>
  );
};
