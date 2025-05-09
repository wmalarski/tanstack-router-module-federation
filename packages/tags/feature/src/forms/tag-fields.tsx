import { Label } from "@trmf/ui/components/label";
import { useAppForm } from "@trmf/ui/hooks/use-app-form";
import * as v from "valibot";

const getTagFieldsValidator = () => {
  return v.object({
    name: v.string(),
  });
};

type TagFieldsData = v.InferOutput<ReturnType<typeof getTagFieldsValidator>>;

type UseTagFieldsArgs = {
  defaultName?: string;
  onSubmit: (data: TagFieldsData) => void;
};

export const useTagFields = ({ defaultName, onSubmit }: UseTagFieldsArgs) => {
  return useAppForm({
    defaultValues: { name: defaultName ?? "" },
    onSubmit: (event) => onSubmit(event.value),
    validators: { onChange: getTagFieldsValidator() },
  });
};

type TagFieldsProps = {
  pending?: boolean;
  form: ReturnType<typeof useTagFields>;
};

export const TagFields = ({ pending, form }: TagFieldsProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <form.AppField name="name">
          {(field) => (
            <field.Input
              disabled={pending}
              id="name"
              name="name"
              onChange={(event) => field.handleChange(event.target.value)}
              placeholder="Name"
              required
              value={field.state.value}
            />
          )}
        </form.AppField>
      </div>
    </div>
  );
};
