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
    <div className="flex flex-col gap-6">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <form.AppField name="email">
          {(field) => (
            <field.Input
              id="email"
              placeholder="m@example.com"
              name={field.name}
              required
              type="email"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
            />
          )}
        </form.AppField>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <form.AppField name="password">
          {(field) => (
            <field.Input
              name="password"
              id="password"
              required
              type="password"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
            />
          )}
        </form.AppField>
      </div>
    </div>
  );
};
