import {
  type MutationOptions,
  type QueryClient,
  QueryClientContext,
  queryOptions,
} from "@tanstack/react-query";
import {
  getPostgrestData,
  getSupabaseContext,
  type SupabaseDatabase,
  type SupabaseTypedClient,
} from "@trmf/supabase-util";
import { use } from "react";

type SelectBookmarksByIdsQueryOptionsArgs = {
  bookmarkIds: number[];
};

export const selectBookmarksByIdsQueryKey = (
  args: SelectBookmarksByIdsQueryOptionsArgs,
) => {
  return ["bookmarks-data-access", "select-bookmarks-by-ids", args];
};

export const selectBookmarksByIdsQueryOptions = (
  args: SelectBookmarksByIdsQueryOptionsArgs,
) => {
  const supabase = getSupabaseContext();

  return queryOptions({
    queryFn: async () => {
      const { bookmarkIds } = args;
      const response = await supabase
        .from("bookmarks")
        .select("*, bookmarks_tags ( id, tags ( id, name ) )")
        .in("id", bookmarkIds);
      return getPostgrestData(response);
    },
    queryKey: selectBookmarksByIdsQueryKey(args),
  });
};

type SelectBookmarkQueryOptionsArgs = {
  bookmarkId: number;
};

const selectBookmarkQueryKey = (args: SelectBookmarkQueryOptionsArgs) => {
  return ["bookmarks-data-access", "select-bookmark", args];
};

export const selectBookmarkQueryOptions = (
  args: SelectBookmarkQueryOptionsArgs,
) => {
  const supabase = getSupabaseContext();

  return queryOptions({
    queryFn: async () => {
      const { bookmarkId } = args;
      const response = await supabase
        .from("bookmarks")
        .select("*, bookmarks_tags ( id, tags ( id, name ) )")
        .eq("id", bookmarkId)
        .single();
      return getPostgrestData(response);
    },
    queryKey: selectBookmarkQueryKey(args),
  });
};

type DoneValue = "all" | "completed" | "uncompleted";

export type SelectBookmarksQueryOptionsArgs = {
  done?: DoneValue;
  limit?: number;
  offset?: number;
  query?: string;
  random: boolean;
  tags: number[];
};

export const SELECT_BOOKMARKS_DEFAULT_LIMIT = 5;

type SelectBookmarksFromDbArgs = SelectBookmarksQueryOptionsArgs & {
  supabase: SupabaseTypedClient;
};

const selectBookmarksFromDb = async ({
  offset = 0,
  limit = SELECT_BOOKMARKS_DEFAULT_LIMIT,
  done,
  tags,
  random,
  query,
  supabase,
}: SelectBookmarksFromDbArgs) => {
  let builder = (
    tags.length > 0
      ? supabase
          .from("bookmarks")
          .select("*, bookmarks_tags!inner ( id, tags!inner ( id, name ) )", {
            count: "estimated",
          })
          .in("bookmarks_tags.tag_id", tags)
      : supabase
          .from("bookmarks")
          .select("*, bookmarks_tags ( id, tags ( id, name ) )", {
            count: "estimated",
          })
  ).range(offset, offset + limit);

  if (random) {
    builder = builder.gte("random", Math.random()).order("random");
  } else {
    builder = builder.order("created_at", { ascending: false });
  }

  if (done === "completed") {
    builder = builder.eq("done", true);
  } else if (done === "uncompleted") {
    builder = builder.eq("done", false);
  }

  if (query && query.length > 0) {
    builder = builder.textSearch("title", query, { type: "phrase" });
  }

  const result = await builder;
  return result;
};

const selectBookmarksQueryKey = (args: SelectBookmarksQueryOptionsArgs) => {
  const supabase = getSupabaseContext();

  return ["bookmarks-data-access", "select-bookmarks", args];
};

export const selectBookmarksQueryOptions = (
  args: SelectBookmarksQueryOptionsArgs,
) => {
  const supabase = getSupabaseContext();

  return queryOptions({
    queryFn: async () => {
      const response = await selectBookmarksFromDb({ ...args, supabase });
      return getPostgrestData(response);
    },
    queryKey: selectBookmarksQueryKey(args),
  });
};

const invalidateBookmarks = async (queryClient?: QueryClient) => {
  await Promise.all(
    [
      selectBookmarksQueryKey({ random: false, tags: [] }),
      selectBookmarksByIdsQueryKey({ bookmarkIds: [] }),
      selectBookmarkQueryKey({ bookmarkId: 0 }),
    ]
      .map((queryKey) => queryKey.slice(0, -1))
      .map((queryKey) =>
        queryClient?.invalidateQueries({ exact: false, queryKey }),
      ),
  );
};

type InsertBookmarkMutationOptionsVariables = {
  preview?: string;
  tags?: number[];
  text?: string;
  title?: string;
  url?: string;
};

export const insertBookmarkMutationOptions = (): MutationOptions<
  SupabaseDatabase["public"]["Tables"]["bookmarks"]["Insert"],
  Error,
  InsertBookmarkMutationOptionsVariables
> => {
  const supabase = getSupabaseContext();
  const queryClient = use(QueryClientContext);

  return {
    mutationFn: async ({ tags = [], ...args }) => {
      const response = await supabase
        .from("bookmarks")
        .insert(args)
        .select()
        .single();

      if (response.error) {
        throw response.error;
      }

      const tagsResponse = await supabase.from("bookmarks_tags").insert(
        tags.map((tagId) => ({
          bookmark_id: response.data.id,
          tag_id: tagId,
        })),
      );

      if (tagsResponse.error) {
        throw tagsResponse.error;
      }

      return response.data;
    },
    onSuccess: () => {
      invalidateBookmarks(queryClient);
    },
  };
};

type DeleteBookmarkMutationOptionsVariables = {
  bookmarkId: number;
};

export const deleteBookmarkMutationOptions = (): MutationOptions<
  null,
  Error,
  DeleteBookmarkMutationOptionsVariables
> => {
  const supabase = getSupabaseContext();
  const queryClient = use(QueryClientContext);

  return {
    mutationFn: async (args) => {
      const response = await supabase
        .from("bookmarks")
        .delete()
        .eq("id", args.bookmarkId);
      return getPostgrestData(response);
    },
    onSuccess: () => {
      invalidateBookmarks(queryClient);
    },
  };
};

type UpdateBookmarkTagsArgs = {
  bookmarkId: number;
  existingTags: { tag_id: number; id: number }[];
  formTags: number[];
  supabase: SupabaseTypedClient;
};

const updateBookmarkTags = ({
  bookmarkId,
  existingTags,
  formTags,
  supabase,
}: UpdateBookmarkTagsArgs) => {
  const existingTagsSet = new Set(existingTags.map((tag) => tag.tag_id));
  const formTagsSet = new Set(formTags);

  const toAdd = formTags.filter((tag) => !existingTagsSet.has(tag));
  const toRemove = existingTags
    .filter((tag) => !formTagsSet.has(tag.tag_id))
    .map((tag) => tag.id);

  return Promise.all([
    supabase.from("bookmarks_tags").delete().in("id", toRemove),
    supabase.from("bookmarks_tags").insert(
      toAdd.map((tagId) => ({
        bookmark_id: bookmarkId,
        tag_id: tagId,
      })),
    ),
  ]);
};

type UpdateBookmarkMutationOptionsVariables =
  InsertBookmarkMutationOptionsVariables & {
    bookmarkId: number;
  };

export const updateTagMutationOptions = (): MutationOptions<
  SupabaseDatabase["public"]["Tables"]["bookmarks"]["Update"],
  Error,
  UpdateBookmarkMutationOptionsVariables
> => {
  const supabase = getSupabaseContext();
  const queryClient = use(QueryClientContext);

  return {
    mutationFn: async ({ bookmarkId, tags = [], ...args }) => {
      const response = await supabase
        .from("bookmarks")
        .update(args)
        .eq("id", bookmarkId)
        .select("*, bookmarks_tags ( id, tag_id )")
        .single();

      if (response.error) {
        throw response.error;
      }

      const [deleteResult, insertResult] = await updateBookmarkTags({
        bookmarkId,
        existingTags: response.data.bookmarks_tags,
        formTags: tags,
        supabase,
      });

      if (deleteResult.error) {
        throw deleteResult.error;
      }

      if (insertResult.error) {
        throw insertResult.error;
      }

      return response.data;
    },
    onSuccess: () => {
      invalidateBookmarks(queryClient);
    },
  };
};

type CompleteBookmarkMutationOptionsVariables = {
  bookmarkId: number;
  done?: boolean;
  note?: string;
  rate?: number;
};

export const completeBookmarkMutationOptions = (): MutationOptions<
  null,
  Error,
  CompleteBookmarkMutationOptionsVariables
> => {
  const supabase = getSupabaseContext();
  const queryClient = use(QueryClientContext);

  return {
    mutationFn: async ({ bookmarkId, ...args }) => {
      const response = await supabase
        .from("bookmarks")
        .update({ ...args, done_at: new Date().toISOString() })
        .eq("id", bookmarkId);
      return getPostgrestData(response);
    },
    onSuccess: () => {
      invalidateBookmarks(queryClient);
    },
  };
};
