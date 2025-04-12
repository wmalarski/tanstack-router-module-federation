import { AppContextProvider } from "@trmf/app-context-util";
import { BookmarksList } from "@trmf/bookmarks-feature/bookmarks-list";
import "@trmf/ui/globals.css";
import "./app.css";

export const App = () => {
  return (
    <AppContextProvider>
      <BookmarksList />
    </AppContextProvider>
  );
};

export default App;
