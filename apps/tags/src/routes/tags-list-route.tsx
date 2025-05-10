import { AppContextProvider } from "@trmf/app-context-util";
import { TagsList } from "@trmf/tags-feature/tags-list/tags-list";
import "@trmf/tags-feature/styles.css";

export const TagsListRoute = () => {
  return (
    <AppContextProvider>
      <TagsList />
    </AppContextProvider>
  );
};
