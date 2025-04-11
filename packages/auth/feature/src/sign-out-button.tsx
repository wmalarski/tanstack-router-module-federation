import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { signOutMutationOptions } from "@trmf/auth-data-access";
import { Button } from "@trmf/ui/components/button";
import type { ComponentProps } from "react";

export const SignOutButton = () => {
  const navigate = useNavigate();

  const signOutMutation = useMutation(
    signOutMutationOptions({
      onSuccess: async () => {
        await navigate({ to: "/sign-in" });
      },
    }),
  );

  const onSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();
    signOutMutation.mutate();
  };

  return (
    <form onSubmit={onSubmit}>
      <Button type="submit">Sign Out</Button>
    </form>
  );
};
