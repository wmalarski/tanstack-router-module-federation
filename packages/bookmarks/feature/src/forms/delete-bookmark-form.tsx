import { useMutation } from "@tanstack/react-query";
import {
  type BookmarkWithTagsModel,
  deleteBookmarkMutationOptions,
} from "@trmf/bookmarks-data-access";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@trmf/ui/components/alert-dialog";
import { Button } from "@trmf/ui/components/button";
import { TrashIcon } from "@trmf/ui/components/icons";

type DeleteBookmarkFormProps = {
  bookmark: BookmarkWithTagsModel;
};

export const DeleteBookmarkForm = ({ bookmark }: DeleteBookmarkFormProps) => {
  const deleteBookmarkMutation = useMutation(deleteBookmarkMutationOptions());

  const onSubmit = () => {
    deleteBookmarkMutation.mutate({ bookmarkId: bookmark.id });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <TrashIcon className="tags:size-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteBookmarkMutation.isPending}
            onClick={onSubmit}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
