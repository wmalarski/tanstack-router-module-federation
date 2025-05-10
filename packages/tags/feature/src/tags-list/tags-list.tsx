import { useSuspenseQuery } from "@tanstack/react-query";
import { selectTagsQueryOptions } from "@trmf/tags-data-access";
import { Suspense } from "react";
import { InsertTagDialog } from "../forms/insert-tag-dialog";
import { TagsListItem } from "./tag-list-item";

export const TagsList = () => {
  return (
    <div className="m-4 flex flex-col gap-2 gap-2">
      <InsertTagDialog />
      <Suspense>
        <TagsListQuery />
      </Suspense>
    </div>
  );
};

const TagsListQuery = () => {
  const selectTagsQuery = useSuspenseQuery(
    selectTagsQueryOptions({ limit: 50, offset: 0 }),
  );

  return (
    <ul className="flex flex-col gap-2">
      {selectTagsQuery.data.map((tag) => (
        <li key={tag.id}>
          <TagsListItem tag={tag} />
        </li>
      ))}
    </ul>
  );
};
