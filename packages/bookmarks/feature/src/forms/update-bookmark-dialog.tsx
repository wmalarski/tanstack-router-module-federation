import { useMutation } from "@tanstack/react-query";
import {
  type BookmarkWithTagsModel,
  updateBookmarkMutationOptions,
} from "@trmf/bookmarks-data-access";
import { Button } from "@trmf/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@trmf/ui/components/dialog";
import { PencilIcon } from "@trmf/ui/components/icons";
import { type ComponentProps, useId, useMemo, useState } from "react";
import { useBookmarksHistory } from "../contexts/bookmarks-history";
import { BookmarkFields, useBookmarkFields } from "./bookmark-fields";

type UpdateBookmarkDialogProps = {
  bookmark: BookmarkWithTagsModel;
};

export const UpdateBookmarkDialog = ({
  bookmark,
}: UpdateBookmarkDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const initialData = useMemo(
    () => ({
      ...bookmark,
      preview: bookmark.preview ?? undefined,
      tags: bookmark.bookmarks_tags.map((bookmarkTag) => bookmarkTag.tags.id),
    }),
    [bookmark],
  );

  const history = useBookmarksHistory();

  const onClick = () => {
    history.send({ id: bookmark.id, type: "add" });
  };

  const updateBookmarkMutation = useMutation(updateBookmarkMutationOptions());

  const formId = useId();

  const form = useBookmarkFields({
    initialData,
    onSubmit: (value) => {
      updateBookmarkMutation.mutate({ ...value, bookmarkId: bookmark.id });
    },
  });

  const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();
    await form.handleSubmit();
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button onClick={onClick}>
          <PencilIcon className="bookmarks:size-4" />
          Update
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update bookmark</DialogTitle>
        </DialogHeader>
        <form id={formId} onSubmit={onSubmit}>
          <BookmarkFields
            form={form}
            pending={updateBookmarkMutation.isPending}
          />
        </form>
        <DialogFooter>
          <Button
            disabled={updateBookmarkMutation.isPending}
            form={formId}
            type="submit"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
