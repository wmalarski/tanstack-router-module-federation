import { Fieldset, FieldsetRow } from "@trmf/ui/components/fieldset";
import { Label } from "@trmf/ui/components/label";
import { useAppForm } from "@trmf/ui/hooks/use-app-form";
import * as v from "valibot";

const getCompleteFieldsValidator = () => {
  return v.object({
    done: v.boolean(),
    note: v.optional(v.string()),
    rate: v.number(),
  });
};

export type CompleteFieldsData = v.InferOutput<
  ReturnType<typeof getCompleteFieldsValidator>
>;

type UseCompleteFieldsArgs = {
  initialData?: CompleteFieldsData;
  onSubmit: (data: CompleteFieldsData) => void;
};

export const useCompleteFields = ({
  initialData,
  onSubmit,
}: UseCompleteFieldsArgs) => {
  return useAppForm({
    defaultValues: initialData,
    onSubmit: (event) => onSubmit(event.value),
    validators: { onChange: getCompleteFieldsValidator() },
  });
};

type CompleteFieldsProps = {
  pending?: boolean;
  form: ReturnType<typeof useCompleteFields>;
};

export const CompleteFields = ({ pending, form }: CompleteFieldsProps) => {
  return (
    <Fieldset>
      {/* <FormError message={props.result?.error} /> */}

      <FieldsetRow>
        <Label>
          <form.AppField name="done">
            {(field) => (
              <field.Checkbox
                checked={field.state.value}
                disabled={pending}
                name="done"
                onCheckedChange={(checked) =>
                  checked !== "indeterminate" && field.handleChange(checked)
                }
                // {...getInvalidStateProps({
                //   errorMessageId: "title-error",
                //   isInvalid: !!props.result?.errors?.done,
                // })}
              />
            )}
          </form.AppField>
          Done
        </Label>
      </FieldsetRow>
      {/* <FieldError id="done-error" message={props.result?.errors?.done} /> */}

      <FieldsetRow>
        <Label htmlFor="rate">Rate</Label>
        <form.AppField name="note">
          {(field) => (
            <field.Input
              disabled={pending}
              id="rate"
              max={10}
              min={0}
              name="rate"
              onChange={(event) => field.handleChange(event.target.value)}
              placeholder="Rate"
              step={0.1}
              type="number"
              value={field.state.value}
              width="full"
              // {...getInvalidStateProps({
              //   errorMessageId: "rate-error",
              //   isInvalid: !!props.result?.errors?.rate,
              // })}
            />
          )}
        </form.AppField>
        {/* <FieldError id="text-error" message={props.result?.errors?.text} /> */}
      </FieldsetRow>

      <FieldsetRow>
        <Label htmlFor="note">Note</Label>
        <form.AppField name="note">
          {(field) => (
            <field.Input
              disabled={pending}
              id="note"
              name="note"
              onChange={(event) => field.handleChange(event.target.value)}
              placeholder="Note"
              value={field.state.value}
              width="full"
              // {...getInvalidStateProps({
              //   errorMessageId: "note-error",
              //   isInvalid: !!props.result?.errors?.note,
              // })}
            />
          )}
        </form.AppField>
      </FieldsetRow>
      {/* <FieldError id="url-note" message={props.result?.errors?.note} /> */}
    </Fieldset>
  );
};
