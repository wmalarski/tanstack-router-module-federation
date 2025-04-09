import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { Button } from "../components/button";
import { Checkbox } from "../components/checkbox";
import { Input } from "../components/input";

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
