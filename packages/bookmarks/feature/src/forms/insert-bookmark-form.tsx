import { useMutation } from "@tanstack/react-query";
import { BookmarkFields, useBookmarkFields } from "./bookmark-fields";
import { insertBookmarkMutationOptions } from "@trmf/bookmarks-data-access";

export const InsertBookmarkForm = () => {
  const insertBookmarkMutation = useMutation(insertBookmarkMutationOptions());

  const form = useBookmarkFields({
    onSubmit: (value) => {
      insertBookmarkMutation.mutate(value);
    },
  });

  return (
    <BookmarkFields form={form} pending={insertBookmarkMutation.isPending} />
  );
};
