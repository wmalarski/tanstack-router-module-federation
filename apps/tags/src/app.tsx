import { AppContextProvider } from "@trmf/app-context-util";
import { TagsList } from "@trmf/tags-feature/tags-list";
import "@trmf/ui/globals.css";
import "./app.css";

export const App = () => {
  return (
    <AppContextProvider>
      <TagsList />
    </AppContextProvider>
  );
};

export default App;
