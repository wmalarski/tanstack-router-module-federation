import { createStore } from "@xstate/store";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
} from "react";

function useBookmarksHistoryStore() {
  return useMemo(
    () =>
      createStore({
        context: { ids: [] as number[] },
        on: {
          add: (context, { id }: { id: number }) => {
            const ids = [...context.ids];
            const index = ids.indexOf(id);

            if (index !== -1) {
              ids.splice(index, 1);
            }

            ids.push(id);

            if (ids.length > 20) {
              ids.splice(0, 1);
            }

            return { ids };
          },
        },
      }),
    [],
  );
}

type BookmarksHistoryContextValue = ReturnType<typeof useBookmarksHistoryStore>;

const BookmarksHistoryContext =
  createContext<BookmarksHistoryContextValue | null>(null);

export const BookmarksHistoryProvider = ({ children }: PropsWithChildren) => {
  const value = useBookmarksHistoryStore();

  return (
    <BookmarksHistoryContext value={value}>{children}</BookmarksHistoryContext>
  );
};

export const useBookmarksHistory = (): BookmarksHistoryContextValue => {
  const context = useContext(BookmarksHistoryContext);

  if (!context) {
    throw new Error("BookmarksHistoryContext is not defined");
  }

  return context;
};
