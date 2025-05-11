import { useSuspenseQuery } from "@tanstack/react-query";
import {
  BookmarkWithTagsModel,
  selectBookmarksQueryOptions,
  SelectBookmarksQueryOptionsArgs,
} from "@trmf/bookmarks-data-access";
import { BookmarksHistoryProvider } from "../contexts/bookmarks-history";
import { Skeleton } from "@trmf/ui/components/skeleton";
import { PropsWithChildren } from "react";

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

type BookmarkListProps = {
  queryArgs: SelectBookmarksQueryOptionsArgs;
  filterSearchParams: FiltersSearchParams;
  initialBookmarks: BookmarkWithTagsModel[];
  count: number;
};

export const BookmarkList: Component<BookmarkListProps> = (props) => {
  const { t } = useI18n();

  const [offsets, setOffsets] = createWritableMemo<number[]>(
    () => props.filterSearchParams && [],
  );

  const onLoadMoreClick = () => {
    setOffsets((current) => {
      const lastOffset = current[current.length - 1] ?? 0;
      return [...current, lastOffset + SELECT_BOOKMARKS_DEFAULT_LIMIT + 1];
    });
  };

  return (
    <div className="flex w-full max-w-xl flex-col gap-2 px-2 py-4">
      <div className="flex w-full justify-between gap-2">
        <h2 className="text-xl">{t("bookmarks.title")}</h2>
        <BookmarkFilters params={props.filterSearchParams} />
      </div>
      <BookmarkListContainer>
        <BookmarkListPart bookmarks={props.initialBookmarks} />
        <For each={offsets()}>
          {(offset) => (
            <BookmarkLazy offset={offset} queryArgs={props.queryArgs} />
          )}
        </For>
      </BookmarkListContainer>
      <Button color="secondary" onClick={onLoadMoreClick} size="sm">
        {t("bookmarks.loadMore")}
      </Button>
    </div>
  );
};

type BookmarkLazyProps = {
  queryArgs: SelectBookmarksArgs;
  offset: number;
};

const BookmarkLazy: Component<BookmarkLazyProps> = (props) => {
  const bookmarks = createAsync(() =>
    selectBookmarksServerQuery({ offset: props.offset, ...props.queryArgs }),
  );

  return (
    <Suspense fallback={<BookmarkListLoadingPlaceholder />}>
      <RpcShow result={bookmarks()}>
        {(bookmarks) => <BookmarkListPart bookmarks={bookmarks().data ?? []} />}
      </RpcShow>
    </Suspense>
  );
};

type BookmarkListPartProps = {
  bookmarks: BookmarkWithTagsModel[];
};

export const BookmarkListPart = ({ bookmarks }: BookmarkListPartProps) => {
  return (
    <>
      {bookmarks.map((bookmark) => (
        <li key={bookmark.id}>
          <BookmarkListItem bookmark={bookmark} />
        </li>
      ))}
    </>
  );
};

export const BookmarkListContainer = ({ children }: PropsWithChildren) => {
  return <ul className="flex flex-col gap-4">{children}</ul>;
};

export const BookmarkListPlaceholder = () => {
  return (
    <ul className="flex w-full max-w-xl flex-col gap-2 px-2 py-4">
      <BookmarkListLoadingPlaceholder />
    </ul>
  );
};

const BookmarkListLoadingPlaceholder = () => {
  const list = Array.from({ length: 3 }, (_, index) => index);

  return (
    <>
      {list.map((index) => (
        <li key={index}>
          <Skeleton className="h-48 w-full" />
        </li>
      ))}
    </>
  );
};
