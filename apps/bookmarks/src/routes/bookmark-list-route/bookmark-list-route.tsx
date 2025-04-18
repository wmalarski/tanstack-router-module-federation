import { AppContextProvider } from "@trmf/app-context-util";
import { BookmarksList } from "@trmf/bookmarks-feature/bookmarks-list";

export const BookmarkListRoute = () => {
  return (
    <AppContextProvider>
      <BookmarksList />
    </AppContextProvider>
  );
};
