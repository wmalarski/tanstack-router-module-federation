import { Label } from "@trmf/ui/components/label";
import { useAppForm } from "@trmf/ui/hooks/use-app-form";
import * as v from "valibot";

const getAuthFieldsValidator = () => {
  return v.object({
    email: v.pipe(v.string(), v.email()),
    password: v.string(),
  });
};

type AuthFieldsData = v.InferOutput<ReturnType<typeof getAuthFieldsValidator>>;

type UseAuthFieldsArgs = {
  onSubmit: (data: AuthFieldsData) => void;
};

export const useAuthFields = ({ onSubmit }: UseAuthFieldsArgs) => {
  return useAppForm({
    defaultValues: { email: "", password: "" },
    onSubmit: ({ value }) => onSubmit(value),
    validators: { onChange: getAuthFieldsValidator() },
  });
};

type AuthFieldsProps = {
  form: ReturnType<typeof useAuthFields>;
};

export const AuthFields = ({ form }: AuthFieldsProps) => {
  return (
    <fieldset>
      <Label>
        <form.AppField name="email">{(field) => <field.Input />}</form.AppField>
      </Label>
      <Label>
        <form.AppField name="password">
          {(field) => <field.Input />}
        </form.AppField>
      </Label>
    </fieldset>
  );
};
