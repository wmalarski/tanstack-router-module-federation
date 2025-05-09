import { useMutation } from "@tanstack/react-query";
import { insertTagMutationOptions } from "@trmf/tags-data-access";
import { Button } from "@trmf/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@trmf/ui/components/dialog";
import { PlusIcon } from "@trmf/ui/components/icons";
import { type ComponentProps, useState } from "react";
import { TagFields, useTagFields } from "./tag-fields";

const formId = "insert-form";

export const InsertTagDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const insertTagMutation = useMutation(
    insertTagMutationOptions({
      onSuccess: () => {},
    }),
  );

  const form = useTagFields({
    onSubmit: (value) => {
      insertTagMutation.mutate(value);
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
          <PlusIcon className="size-4" />
          Add Tag
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add tag</DialogTitle>
        </DialogHeader>
        <form id={formId} onSubmit={onSubmit}>
          <TagFields form={form} pending={insertTagMutation.isPending} />
        </form>
        <DialogFooter>
          <Button
            color="primary"
            disabled={insertTagMutation.isPending}
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
