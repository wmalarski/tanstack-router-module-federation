import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Input } from "./input";

const { fieldContext, formContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    Input,
    Checkbox,
  },
  formComponents: {
    Button,
  },
  fieldContext,
  formContext,
});
