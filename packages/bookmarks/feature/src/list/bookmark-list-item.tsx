import { BookmarkWithTagsModel } from "@trmf/bookmarks-data-access";
import { useBookmarksHistory } from "../contexts/bookmarks-history";
import { Link } from "@trmf/ui/components/link";
import { ComponentProps } from "react";
import { Badge } from "@trmf/ui/components/badge";

type BookmarkListItemProps = {
  bookmark: BookmarkWithTagsModel;
};

export const BookmarkListItem: Component<BookmarkListItemProps> = (props) => {
  const { t } = useI18n();

  const formatDate = createDateFormatter();

  const history = useBookmarksHistory();

  const onDetailsClick = () => {
    history().addToHistory(props.bookmark.id);
  };

  return (
    <Card class="w-full" size="sm" variant="bordered">
      <CardBody>
        <BookmarkTagsList bookmark={props.bookmark} />
        <BookmarkPreview bookmark={props.bookmark} />
        <Show when={props.bookmark.title}>
          <BookmarkLinks bookmark={props.bookmark} />
        </Show>
        <div
          class="grid w-full gap-2 pb-4"
          style={{ "grid-template-columns": "minmax(0, 1fr) minmax(0, 3fr)" }}
        >
          <GridTitle>{t("bookmarks.item.title")}</GridTitle>
          <GridText>{props.bookmark.title}</GridText>
          <GridTitle>{t("bookmarks.item.text")}</GridTitle>
          <GridLink bookmarkId={props.bookmark.id} href={props.bookmark.text} />
          <GridTitle>{t("bookmarks.item.url")}</GridTitle>
          <GridLink bookmarkId={props.bookmark.id} href={props.bookmark.url} />
          <GridTitle>{t("bookmarks.item.createdAt")}</GridTitle>
          <GridText>{formatDate(props.bookmark.created_at)}</GridText>
          <GridTitle>{t("bookmarks.item.done")}</GridTitle>
          <GridText>{String(props.bookmark.done)}</GridText>
          <Show when={props.bookmark.done}>
            <GridTitle>{t("bookmarks.item.doneAt")}</GridTitle>
            <GridText>
              {props.bookmark.done_at && formatDate(props.bookmark.done_at)}
            </GridText>
            <GridTitle>{t("bookmarks.item.rate")}</GridTitle>
            <GridText>{props.bookmark.rate}</GridText>
            <GridTitle>{t("bookmarks.item.note")}</GridTitle>
            <GridText>{props.bookmark.note}</GridText>
          </Show>
        </div>
        <CardActions>
          <DeleteBookmarkForm bookmark={props.bookmark} />
          <CompleteDialog bookmark={props.bookmark} />
          <UpdateBookmarkDialog bookmark={props.bookmark} />
          <LinkButton
            color="secondary"
            href={paths.bookmark(props.bookmark.id)}
            onClick={onDetailsClick}
            size="sm"
          >
            <ChevronRightIcon class="size-4" />
            {t("bookmarks.item.details")}
          </LinkButton>
        </CardActions>
      </CardBody>
    </Card>
  );
};

const GridTitle: Component<ParentProps> = (props) => {
  return <span class="font-semibold text-sm">{props.children}</span>;
};

const GridText: Component<ParentProps> = (props) => {
  return <span class="break-words">{props.children}</span>;
};

type GridLinkProps = {
  bookmarkId: number;
  href: string;
};

const GridLink: Component<GridLinkProps> = (props) => {
  const isLink = createIsLink(() => props.href);

  const history = useBookmarksHistory();

  const onClick = () => {
    history().addToHistory(props.bookmarkId);
  };

  return (
    <Show fallback={<GridText>{props.href}</GridText>} when={isLink()}>
      <Link
        class="break-words"
        hover={true}
        href={props.href}
        onClick={onClick}
      >
        {props.href}
      </Link>
    </Show>
  );
};

type BookmarkPreviewProps = {
  bookmark: BookmarkWithTagsModel;
};

const BookmarkPreview: Component<BookmarkPreviewProps> = (props) => {
  const images = createMemo(() => {
    const array = props.bookmark.preview
      ?.split(";")
      .filter((image) => image.length > 0);
    const smallImages = array?.filter((path) => path.endsWith("-250.jpg"));

    if (smallImages && smallImages.length > 0) {
      return smallImages;
    }

    return array ?? [];
  });

  return (
    <Show when={images().length > 0}>
      <div class="relative mx-auto my-4 w-64">
        <Carousel>
          <CarouselContent>
            <For each={images()}>
              {(image) => (
                <BookmarkPreviewImage
                  image={image}
                  title={props.bookmark.title}
                />
              )}
            </For>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </Show>
  );
};

type BookmarkPreviewImageProps = {
  image: string;
  title: string;
};

const BookmarkPreviewImage = (props: BookmarkPreviewImageProps) => {
  const { t } = useI18n();

  let el: HTMLDivElement | undefined;
  const useVisibilityObserver = createVisibilityObserver({ threshold: 0.1 });
  const visible = useVisibilityObserver(() => el);
  const shouldShow = createMemo<boolean>((previous) => previous || visible());

  return (
    <CarouselItem class="min-h-72" ref={el}>
      <Show when={shouldShow()}>
        <img
          alt={t("bookmarks.item.preview", { preview: props.title })}
          className="h-64 text-base-300"
          height={250}
          loading="lazy"
          src={props.image}
          width={250}
        />
      </Show>
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

  const commonProps: Partial<ComponentProps<typeof Link>> = {
    color: "secondary",
    onClick,
    rel: "noopener noreferrer",
    target: "_blank",
    variant: "link",
  };

  return (
    <ul className="flex flex-row flex-wrap gap-2">
      <li>
        <Link
          {...commonProps}
          href={`https://www.youtube.com/results?${new URLSearchParams({ search_query: bookmark.title })}`}
        >
          Youtube
        </Link>
      </li>
      <li>
        <Link
          {...commonProps}
          href={`https://www.youtube.com/results?${new URLSearchParams({ q: bookmark.title })}`}
        >
          Google
        </Link>
      </li>
      <li>
        <Link
          {...commonProps}
          href={`https://open.spotify.com/search/${bookmark.title}`}
        >
          Spotify
        </Link>
      </li>
    </ul>
  );
};
