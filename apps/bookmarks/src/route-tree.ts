import { type AnyRoute, createRoute } from "@tanstack/react-router";
import "@trmf/ui/globals.css";
import "./app.css";
import { BookmarkListRoute } from "./routes/bookmark-list-route/bookmark-list-route";
import { ShareBookmarkRoute } from "./routes/share-bookmark-route/share-bookmark-route";

type GetBookmarksRouteTreeArgs<TParentRoute extends AnyRoute = AnyRoute> = {
  rootRoute: TParentRoute;
};

export const getBookmarksRouteTree = <
  TParentRoute extends AnyRoute = AnyRoute,
>({
  rootRoute,
}: GetBookmarksRouteTreeArgs<TParentRoute>) => {
  const baseRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: "bookmarks-layout",
  });

  const bookmarkListRoute = createRoute({
    component: BookmarkListRoute,
    getParentRoute: () => baseRoute,
    path: "/",
  });

  const shareBookmarkRoute = createRoute({
    component: ShareBookmarkRoute,
    getParentRoute: () => baseRoute,
    path: "/share",
  });

  return baseRoute.addChildren([bookmarkListRoute, shareBookmarkRoute]);
};
