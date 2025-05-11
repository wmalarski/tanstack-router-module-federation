import { useSuspenseQuery } from "@tanstack/react-query";
import { selectTagsQueryOptions } from "@trmf/tags-data-access";
import { Checkbox } from "@trmf/ui/components/checkbox";
import { Label } from "@trmf/ui/components/label";
import { type ComponentProps, useMemo } from "react";

type BookmarkTagsFieldProps = {
  tags?: number[];
  disabled?: boolean;
  onChange: (tags: number[]) => void;
};

export const BookmarkTagsField = ({
  disabled,
  tags,
  onChange,
}: BookmarkTagsFieldProps) => {
  const selectTagsQuery = useSuspenseQuery(
    selectTagsQueryOptions({ limit: 50, offset: 0 }),
  );

  const initialTagIds = useMemo(() => {
    return new Set(tags);
  }, [tags]);

  const onCheckedChange = (
    tagId: number,
  ): ComponentProps<typeof Checkbox>["onCheckedChange"] => {
    return (checked) => {
      const previousTags = tags ?? [];

      const nextTags = checked
        ? [...previousTags, tagId]
        : previousTags.filter((id) => id !== tagId);

      onChange(nextTags);
    };
  };

  return (
    <ul className="flex flex-col gap-2 pt-4">
      {selectTagsQuery.data.map((tag) => (
        <li key={tag.id}>
          <Label>
            <Checkbox
              checked={initialTagIds.has(tag.id)}
              disabled={disabled}
              name="tags[]"
              onCheckedChange={onCheckedChange(tag.id)}
              value={tag.id}
            />
            {tag.name}
          </Label>
        </li>
      ))}
    </ul>
  );
};
