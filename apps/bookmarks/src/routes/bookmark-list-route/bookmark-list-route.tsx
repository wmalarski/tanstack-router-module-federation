import { AppContextProvider } from "@trmf/app-context-util";
import { BookmarksList } from "@trmf/bookmarks-feature/bookmarks-list";
import "@trmf/bookmarks-feature/styles.css";

export const BookmarkListRoute = () => {
  return (
    <AppContextProvider>
      <BookmarksList />
    </AppContextProvider>
  );
};
