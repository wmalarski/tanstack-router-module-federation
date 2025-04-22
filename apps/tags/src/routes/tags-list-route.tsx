import { AppContextProvider } from "@trmf/app-context-util";
import { TagsList } from "@trmf/tags-feature/tags-list/tags-list";

export const TagsListRoute = () => {
  return (
    <AppContextProvider>
      <TagsList />
    </AppContextProvider>
  );
};
