import { AppContextProvider } from "@trmf/app-context-util";
import { TagsList } from "@trmf/tags-feature/tags-list";

export const TagsListPage = () => {
  return (
    <AppContextProvider>
      <TagsList />
    </AppContextProvider>
  );
};
