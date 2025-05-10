import {
  type MutationOptions,
  type QueryClient,
  QueryClientContext,
  queryOptions,
} from "@tanstack/react-query";
import {
  getPostgrestData,
  getSupabaseContext,
  type SupabaseTypedClient,
} from "@trmf/supabase-util";
import { use } from "react";

type SelectTagsQueryOptionsArgs = {
  offset: number;
  limit: number;
};

type SelectTagsFromDbArgs = SelectTagsQueryOptionsArgs & {
  supabase: SupabaseTypedClient;
};

const selectTagsFromDb = async ({
  limit,
  offset,
  supabase,
}: SelectTagsFromDbArgs) => {
  const response = await supabase
    .from("tags")
    .select("*", { count: "estimated" })
    .range(offset, offset + limit)
    .order("created_at");
  return getPostgrestData(response);
};

const selectTagsQueryKey = (args: SelectTagsQueryOptionsArgs) => {
  return ["tags-data-access", "select-tags", args];
};

export const selectTagsQueryOptions = (args: SelectTagsQueryOptionsArgs) => {
  const supabase = getSupabaseContext();

  return queryOptions({
    queryFn: async () => selectTagsFromDb({ ...args, supabase }),
    queryKey: selectTagsQueryKey(args),
  });
};

export type TagModel = Awaited<ReturnType<typeof selectTagsFromDb>>[0];

const invalidateTags = async (queryClient?: QueryClient) => {
  const queryKey = selectTagsQueryKey({ limit: 0, offset: 0 }).slice(0, 2);
  await queryClient?.invalidateQueries({ exact: false, queryKey });
};

type InsertTagMutationOptionsArgs = {
  onSuccess: () => void;
};

type InsertTagMutationOptionsVariables = {
  name: string;
};

export const insertTagMutationOptions = ({
  onSuccess,
}: InsertTagMutationOptionsArgs): MutationOptions<
  null,
  Error,
  InsertTagMutationOptionsVariables
> => {
  const supabase = getSupabaseContext();
  const queryClient = use(QueryClientContext);

  return {
    mutationFn: async (args) => {
      const response = await supabase.from("tags").insert(args);
      return getPostgrestData(response);
    },
    onSuccess: async () => {
      onSuccess();
      await invalidateTags(queryClient);
    },
  };
};

type DeleteTagMutationOptionsVariables = {
  tagId: number;
};

export const deleteTagMutationOptions = (): MutationOptions<
  null,
  Error,
  DeleteTagMutationOptionsVariables
> => {
  const supabase = getSupabaseContext();
  const queryClient = use(QueryClientContext);

  return {
    mutationFn: async (args) => {
      const response = await supabase
        .from("tags")
        .delete()
        .eq("id", args.tagId);
      return getPostgrestData(response);
    },
    onSuccess: async () => {
      await invalidateTags(queryClient);
    },
  };
};

type UpdateTagMutationOptionsArgs = {
  onSuccess: () => void;
};

type UpdateTagMutationOptionsVariables = {
  tagId: number;
  name: string;
};

export const updateTagMutationOptions = ({
  onSuccess,
}: UpdateTagMutationOptionsArgs): MutationOptions<
  null,
  Error,
  UpdateTagMutationOptionsVariables
> => {
  const supabase = getSupabaseContext();
  const queryClient = use(QueryClientContext);

  return {
    mutationFn: async ({ tagId, ...args }) => {
      const response = await supabase.from("tags").update(args).eq("id", tagId);
      return getPostgrestData(response);
    },
    onSuccess: async () => {
      onSuccess();
      await invalidateTags(queryClient);
    },
  };
};
