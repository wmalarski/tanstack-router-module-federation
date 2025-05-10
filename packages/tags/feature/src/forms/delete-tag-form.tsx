import { useMutation } from "@tanstack/react-query";
import {
  deleteTagMutationOptions,
  type TagModel,
} from "@trmf/tags-data-access";
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
import { TrashIcon } from "@trmf/ui/components/icons";

type DeleteTagFormProps = {
  tag: TagModel;
};

export const DeleteTagForm = ({ tag }: DeleteTagFormProps) => {
  const deleteTagMutation = useMutation(deleteTagMutationOptions());

  const onSubmit = () => {
    deleteTagMutation.mutate({ tagId: tag.id });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <TrashIcon className="size-4" />
        Delete
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
            disabled={deleteTagMutation.isPending}
            onClick={onSubmit}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
