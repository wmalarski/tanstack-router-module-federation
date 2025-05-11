import { useMutation } from "@tanstack/react-query";
import {
  type TagModel,
  updateTagMutationOptions,
} from "@trmf/tags-data-access";
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
import { type ComponentProps, useId, useState } from "react";
import { TagFields, useTagFields } from "./tag-fields";

type UpdateTagDialogProps = {
  tag: TagModel;
};

export const UpdateTagDialog = ({ tag }: UpdateTagDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const formId = useId();

  const updateTagMutation = useMutation(
    updateTagMutationOptions({
      onSuccess: () => {
        setIsOpen(false);
      },
    }),
  );

  const form = useTagFields({
    defaultName: tag.name,
    onSubmit: (value) => {
      updateTagMutation.mutate({ ...value, tagId: tag.id });
    },
  });

  const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();
    await form.handleSubmit();
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button>
          <PencilIcon className="tags:size-4" />
          Update
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update tag</DialogTitle>
        </DialogHeader>
        <form id={formId} onSubmit={onSubmit}>
          <TagFields form={form} pending={updateTagMutation.isPending} />
        </form>
        <DialogFooter>
          <Button
            disabled={updateTagMutation.isPending}
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
