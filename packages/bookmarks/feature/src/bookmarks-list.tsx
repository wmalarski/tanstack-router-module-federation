import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { selectBookmarksQueryOptions } from "@trmf/bookmarks-data-access";
import { Button } from "@trmf/ui/components/button";
import { Suspense } from "react";

export const BookmarksList = () => {
  return (
    <>
      <div className="host">
        <div className="card">
          <div className="title">I'm the bookmarks app</div>
        </div>
      </div>
      <Link className="tags:[&.active]:font-bold" to="/">
        Home
      </Link>{" "}
      <Link className="tags:[&.active]:font-bold" to="/tags">
        About
      </Link>
      <Button>Bookmarks</Button>
      <Suspense>
        <BookmarksListContent />
      </Suspense>
    </>
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
