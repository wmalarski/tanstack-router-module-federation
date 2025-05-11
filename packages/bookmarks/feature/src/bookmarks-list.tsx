import { useSuspenseQuery } from "@tanstack/react-query";
import { selectBookmarksQueryOptions } from "@trmf/bookmarks-data-access";
import { BookmarksHistoryProvider } from "./contexts/bookmarks-history";

export const BookmarksList = () => {
  return (
    <BookmarksHistoryProvider>
      <BookmarksListContent />
    </BookmarksHistoryProvider>
  );
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
