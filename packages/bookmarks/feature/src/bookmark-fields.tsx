import {
  Fieldset,
  FieldsetLabels,
  FieldsetRow,
} from "@trmf/ui/components/fieldset";
import { Label } from "@trmf/ui/components/label";
import { useAppForm } from "@trmf/ui/hooks/use-app-form";
import { useRef } from "react";
import * as v from "valibot";

const getBookmarkFieldsValidator = () => {
  return v.object({
    preview: v.optional(v.string()),
    tags: v.optional(v.array(v.number())),
    text: v.optional(v.string()),
    title: v.optional(v.string()),
    url: v.optional(v.string()),
  });
};

export type BookmarkFieldsData = v.InferOutput<
  ReturnType<typeof getBookmarkFieldsValidator>
>;

type UseBookmarkFieldsArgs = {
  initialData?: BookmarkFieldsData;
  onSubmit: (data: BookmarkFieldsData) => void;
};

export const useBookmarkFields = ({
  initialData,
  onSubmit,
}: UseBookmarkFieldsArgs) => {
  return useAppForm({
    defaultValues: initialData,
    onSubmit: (event) => onSubmit(event.value),
    validators: { onChange: getBookmarkFieldsValidator() },
  });
};

type BookmarkFieldsProps = {
  pending?: boolean;
  form: ReturnType<typeof useBookmarkFields>;
};

export const BookmarkFields = ({ form, pending }: BookmarkFieldsProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLInputElement>(null);

  const onCheckSubmit = (data: BookmarkFieldsData) => {
    if (data.title && titleRef.current) {
      titleRef.current.value = data.title;
    }
    if (data.url && urlRef.current) {
      urlRef.current.value = data.url;
    }
    if (data.preview && previewRef.current) {
      previewRef.current.value = data.preview;
    }
  };

  return (
    <Fieldset>
      {/* <FormError message={props.result?.error} /> */}

      <FieldsetRow>
        <FieldsetLabels>
          <Label htmlFor="title">Title</Label>
          {/* <CheckOgPropsDialog
            onCheck={onCheckSubmit}
            value={initialData?.title}
          /> */}
        </FieldsetLabels>
        <form.AppField name="title">
          {(field) => (
            <field.Input
              disabled={pending}
              id="title"
              name="title"
              onChange={(event) => field.handleChange(event.target.value)}
              placeholder="Title"
              ref={titleRef}
              value={field.state.value}
              width="full"
              // {...getInvalidStateProps({
              //   errorMessageId: "title-error",
              //   isInvalid: !!props.result?.errors?.title,
              // })}
            />
          )}
          {/* <FieldError id="title-error" message={props.result?.errors?.title} /> */}
        </form.AppField>
      </FieldsetRow>

      <FieldsetRow>
        <FieldsetLabels>
          <Label htmlFor="text">Text</Label>
          {/* <CheckOgPropsDialog
            onCheck={onCheckSubmit}
            value={props.initialData?.text}
          /> */}
        </FieldsetLabels>
        <form.AppField name="text">
          {(field) => (
            <field.Input
              disabled={pending}
              id="text"
              name="text"
              onChange={(event) => field.handleChange(event.target.value)}
              placeholder="Texr"
              value={field.state.value}
              width="full"
              // {...getInvalidStateProps({
              //   errorMessageId: "text-error",
              //   isInvalid: !!props.result?.errors?.text,
              // })}
            />
          )}
        </form.AppField>
        {/* <FieldError id="text-error" message={props.result?.errors?.text} /> */}
      </FieldsetRow>

      <FieldsetRow>
        <FieldsetLabels>
          <Label htmlFor="url">Url</Label>
          {/* <CheckOgPropsDialog
            onCheck={onCheckSubmit}
            value={props.initialData?.url}
          /> */}
        </FieldsetLabels>
        <form.AppField name="text">
          {(field) => (
            <field.Input
              disabled={pending}
              id="url"
              name="url"
              placeholder="Url"
              ref={urlRef}
              value={field.state.value}
              width="full"
              // {...getInvalidStateProps({
              //   errorMessageId: "url-error",
              //   isInvalid: !!props.result?.errors?.url,
              // })}
            />
          )}
        </form.AppField>
        {/* <FieldError id="url-error" message={props.result?.errors?.url} /> */}
      </FieldsetRow>

      <FieldsetRow>
        <FieldsetLabels>
          <Label htmlFor="preview">Preview</Label>
          {/* <CheckOgPropsDialog
            onCheck={onCheckSubmit}
            value={props.initialData?.preview ?? undefined}
          /> */}
        </FieldsetLabels>
        <form.AppField name="text">
          {(field) => (
            <field.Input
              disabled={pending}
              id="preview"
              name="preview"
              placeholder="Preview"
              ref={previewRef}
              value={field.state.value}
              width="full"
              // {...getInvalidStateProps({
              //   errorMessageId: "preview-error",
              //   isInvalid: !!props.result?.errors?.preview,
              // })}
            />
          )}
        </form.AppField>
        {/* <FieldError id="preview-error" message={props.result?.errors?.preview} /> */}
      </FieldsetRow>

      {/* <BookmarkTagsField
        disabled={props.pending}
        initialTags={props.initialData?.tags}
      /> */}
    </Fieldset>
  );
};
