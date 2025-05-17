import { Link } from "@tanstack/react-router";
import type { BookmarkWithTagsModel } from "@trmf/bookmarks-data-access";
import { Badge } from "@trmf/ui/components/badge";
import { ButtonLink } from "@trmf/ui/components/button";
import { Card, CardContent, CardFooter } from "@trmf/ui/components/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@trmf/ui/components/carousel";
import { ChevronRightIcon } from "@trmf/ui/components/icons";
import { useIsLink } from "@trmf/ui/hooks/use-is-link";
import { useDateFormatter } from "@trmf/ui/lib/date";
import {
  type ComponentProps,
  type PropsWithChildren,
  useMemo,
  useRef,
} from "react";
import { CompleteDialog } from "../complete/complete-dialog";
import { useBookmarksHistory } from "../contexts/bookmarks-history";
import { DeleteBookmarkForm } from "../forms/delete-bookmark-form";
import { UpdateBookmarkDialog } from "../forms/update-bookmark-dialog";

type BookmarkListItemProps = {
  bookmark: BookmarkWithTagsModel;
};

export const BookmarkListItem = ({ bookmark }: BookmarkListItemProps) => {
  const formatDate = useDateFormatter();

  const history = useBookmarksHistory();

  const onDetailsClick = () => {
    history.send({ id: bookmark.id, type: "add" });
  };

  return (
    <Card>
      <CardContent>
        <BookmarkTagsList bookmark={bookmark} />
        <BookmarkPreview bookmark={bookmark} />
        {bookmark.title ? <BookmarkLinks bookmark={bookmark} /> : null}
        <div
          className="grid w-full gap-2 pb-4"
          style={{ gridTemplateColumns: "minmax(0, 1fr) minmax(0, 3fr)" }}
        >
          <GridTitle>Title</GridTitle>
          <GridText>{bookmark.title}</GridText>
          <GridTitle>Text</GridTitle>
          <GridLink bookmarkId={bookmark.id} href={bookmark.text} />
          <GridTitle>Url</GridTitle>
          <GridLink bookmarkId={bookmark.id} href={bookmark.url} />
          <GridTitle>Created At</GridTitle>
          <GridText>{formatDate(bookmark.created_at)}</GridText>
          <GridTitle>Done</GridTitle>
          <GridText>{String(bookmark.done)}</GridText>
          {bookmark.done ? (
            <>
              <GridTitle>Done At</GridTitle>
              <GridText>
                {bookmark.done_at && formatDate(bookmark.done_at)}
              </GridText>
              <GridTitle>Rate</GridTitle>
              <GridText>{bookmark.rate}</GridText>
              <GridTitle>Note</GridTitle>
              <GridText>{bookmark.note}</GridText>
            </>
          ) : null}
        </div>
      </CardContent>
      <CardFooter>
        <DeleteBookmarkForm bookmark={bookmark} />
        <CompleteDialog bookmark={bookmark} />
        <UpdateBookmarkDialog bookmark={bookmark} />
        <ButtonLink
          asChild
          color="secondary"
          // href={paths.bookmark(bookmark.id)}
          onClick={onDetailsClick}
          size="sm"
        >
          <Link to="/">
            <ChevronRightIcon className="size-4" />
            Details
          </Link>
        </ButtonLink>
      </CardFooter>
    </Card>
  );
};

const GridTitle = ({ children }: PropsWithChildren) => {
  return <span className="font-semibold text-sm">{children}</span>;
};

const GridText = ({ children }: PropsWithChildren) => {
  return <span className="break-words">{children}</span>;
};

type GridLinkProps = {
  bookmarkId: number;
  href: string;
};

const GridLink = ({ bookmarkId, href }: GridLinkProps) => {
  const isLink = useIsLink(href);

  const history = useBookmarksHistory();

  const onClick = () => {
    history.send({ id: bookmarkId, type: "add" });
  };

  if (isLink) {
    return (
      <Link className="break-words" href={href} onClick={onClick} to="/">
        {href}
      </Link>
    );
  }

  return <GridText>{href}</GridText>;
};

type BookmarkPreviewProps = {
  bookmark: BookmarkWithTagsModel;
};

const BookmarkPreview = ({ bookmark }: BookmarkPreviewProps) => {
  const images = useMemo(() => {
    const array = bookmark.preview
      ?.split(";")
      .filter((image) => image.length > 0);
    const smallImages = array?.filter((path) => path.endsWith("-250.jpg"));

    if (smallImages && smallImages.length > 0) {
      return smallImages;
    }

    return array ?? [];
  }, [bookmark.preview?.split]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="relative mx-auto my-4 w-64">
      <Carousel>
        <CarouselContent>
          {images.map((image) => (
            <BookmarkPreviewImage
              image={image}
              key={image}
              title={bookmark.title}
            />
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

type BookmarkPreviewImageProps = {
  image: string;
  title: string;
};

const BookmarkPreviewImage = ({ image, title }: BookmarkPreviewImageProps) => {
  const element = useRef<HTMLDivElement>(null);

  const useVisibilityObserver = createVisibilityObserver({ threshold: 0.1 });

  const visible = useVisibilityObserver(() => element);

  const shouldShow = useMemo((previous) => previous || visible, [visible]);

  return (
    <CarouselItem className="min-h-72" ref={element}>
      {shouldShow ? (
        <img
          alt={`Preview ${title}`}
          className="h-64 text-base-300"
          height={250}
          loading="lazy"
          src={image}
          width={250}
        />
      ) : null}
    </CarouselItem>
  );
};

type BookmarkTagsListProps = {
  bookmark: BookmarkWithTagsModel;
};

const BookmarkTagsList = ({ bookmark }: BookmarkTagsListProps) => {
  return (
    <ul className="flex flex-row flex-wrap gap-2">
      {bookmark.bookmarks_tags.map((bookmarkTag) => (
        <li key={bookmarkTag.id}>
          <Badge>{bookmarkTag.tags.name}</Badge>
        </li>
      ))}
    </ul>
  );
};

type BookmarkLinksProps = {
  bookmark: BookmarkWithTagsModel;
};

const BookmarkLinks = ({ bookmark }: BookmarkLinksProps) => {
  const history = useBookmarksHistory();

  const onClick = () => {
    history.send({ id: bookmark.id, type: "add" });
  };

  const commonProps: Partial<ComponentProps<typeof ButtonLink>> = {
    color: "secondary",
    onClick,
    rel: "noopener noreferrer",
    target: "_blank",
    variant: "link",
  };

  return (
    <ul className="flex flex-row flex-wrap gap-2">
      <li>
        <ButtonLink
          {...commonProps}
          href={`https://www.youtube.com/results?${new URLSearchParams({ search_query: bookmark.title })}`}
        >
          Youtube
        </ButtonLink>
      </li>
      <li>
        <ButtonLink
          {...commonProps}
          href={`https://www.youtube.com/results?${new URLSearchParams({ q: bookmark.title })}`}
        >
          Google
        </ButtonLink>
      </li>
      <li>
        <ButtonLink
          {...commonProps}
          href={`https://open.spotify.com/search/${bookmark.title}`}
        >
          Spotify
        </ButtonLink>
      </li>
    </ul>
  );
};
