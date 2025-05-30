import { AppContextProvider } from "@trmf/app-context-util";
import { InsertBookmarkForm } from "@trmf/bookmarks-feature/forms/insert-bookmark-form";
import "@trmf/bookmarks-feature/styles.css";

export const ShareBookmarkRoute = () => {
  return (
    <AppContextProvider>
      <InsertBookmarkForm />
    </AppContextProvider>
  );
};
