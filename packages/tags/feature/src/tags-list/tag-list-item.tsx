import type { TagModel } from "@trmf/tags-data-access";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@trmf/ui/components/card";
import { useDateFormatter } from "@trmf/ui/lib/date";
import { DeleteTagForm } from "../forms/delete-tag-form";
import { UpdateTagDialog } from "../forms/update-tag-dialog";

type TagsListItemProps = {
  tag: TagModel;
};

export const TagsListItem = ({ tag }: TagsListItemProps) => {
  const formatDate = useDateFormatter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tag.name}</CardTitle>
        <CardDescription>{formatDate(tag.created_at)}</CardDescription>
      </CardHeader>
      <CardFooter className="tags:gap-2">
        <UpdateTagDialog tag={tag} />
        <DeleteTagForm tag={tag} />
      </CardFooter>
    </Card>
  );
};
