import { useSuspenseQuery } from "@tanstack/react-query";
import { selectBookmarksQueryOptions } from "@trmf/bookmarks-data-access";

export const BookmarksList = () => {
  return <BookmarksListContent />;
};

const BookmarksListContent = () => {
  const bookmarksQuery = useSuspenseQuery(
    selectBookmarksQueryOptions({
      random: true,
      tags: [],
    }),
  );

  return (
    <>
      <pre>{JSON.stringify(bookmarksQuery.data, null, 2)}</pre>
    </>
  );
};
