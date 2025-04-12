import { AppContextProvider } from "@trmf/app-context-util";
import { InsertBookmarkForm } from "@trmf/bookmarks-feature/insert-bookmark-form";

export const ShareBookmarkRoute = () => {
  return (
    <AppContextProvider>
      <div className="container">
        ShareBookmarkRoute
        <InsertBookmarkForm />
      </div>
    </AppContextProvider>
  );
};
