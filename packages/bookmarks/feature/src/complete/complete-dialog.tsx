import { useMutation } from "@tanstack/react-query";
import {
  type BookmarkWithTagsModel,
  completeBookmarkMutationOptions,
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
import { CheckIcon } from "@trmf/ui/components/icons";
import { type ComponentProps, useId, useState } from "react";
import { useBookmarksHistory } from "../contexts/bookmarks-history";
import { CompleteFields, useCompleteFields } from "./complete-fields";

type CompleteDialogProps = {
  bookmark: BookmarkWithTagsModel;
};

export const CompleteDialog = ({ bookmark }: CompleteDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const formId = useId();

  const history = useBookmarksHistory();

  const onClick = () => {
    history.send({ id: bookmark.id, type: "add" });
  };

  const completeBookmarkMutation = useMutation(
    completeBookmarkMutationOptions(),
  );

  const form = useCompleteFields({
    onSubmit: (value) => {
      completeBookmarkMutation.mutate({ ...value, bookmarkId: bookmark.id });
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
          <CheckIcon className="size-4" />
          Complete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete</DialogTitle>
        </DialogHeader>
        <form id={formId} onSubmit={onSubmit}>
          <CompleteFields
            form={form}
            pending={completeBookmarkMutation.isPending}
          />
        </form>
        <DialogFooter>
          <Button
            disabled={completeBookmarkMutation.isPending}
            form={formId}
            type="submit"
          >
            Complete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
