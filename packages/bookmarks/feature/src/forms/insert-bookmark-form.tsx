import { useMutation } from "@tanstack/react-query";
import { insertBookmarkMutationOptions } from "@trmf/bookmarks-data-access";
import { Button } from "@trmf/ui/components/button";
import { type ComponentProps, useId } from "react";
import { BookmarkFields, useBookmarkFields } from "./bookmark-fields";

export const InsertBookmarkForm = () => {
  const insertBookmarkMutation = useMutation(insertBookmarkMutationOptions());

  const formId = useId();

  const form = useBookmarkFields({
    onSubmit: (value) => {
      insertBookmarkMutation.mutate(value);
    },
  });

  const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();
    await form.handleSubmit();
  };

  return (
    <form id={formId} onSubmit={onSubmit}>
      <BookmarkFields form={form} pending={insertBookmarkMutation.isPending} />
      <Button
        disabled={insertBookmarkMutation.isPending}
        form={formId}
        type="submit"
      >
        Save
      </Button>
    </form>
  );
};
