import { Fieldset, FieldsetRow } from "@trmf/ui/components/fieldset";
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
    onSubmit: (event) => onSubmit(event.value),
    validators: { onChange: getAuthFieldsValidator() },
  });
};

type AuthFieldsProps = {
  form: ReturnType<typeof useAuthFields>;
};

export const AuthFields = ({ form }: AuthFieldsProps) => {
  return (
    <Fieldset>
      <FieldsetRow>
        <Label htmlFor="email">Email</Label>
        <form.AppField name="email">
          {(field) => (
            <field.Input
              id="email"
              name={field.name}
              onChange={(event) => field.handleChange(event.target.value)}
              placeholder="m@example.com"
              required
              type="email"
              value={field.state.value}
            />
          )}
        </form.AppField>
      </FieldsetRow>
      <FieldsetRow>
        <Label htmlFor="password">Password</Label>
        <form.AppField name="password">
          {(field) => (
            <field.Input
              id="password"
              name="password"
              onChange={(event) => field.handleChange(event.target.value)}
              required
              type="password"
              value={field.state.value}
            />
          )}
        </form.AppField>
      </FieldsetRow>
    </Fieldset>
  );
};
