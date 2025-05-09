import {
  type MutationOptions,
  type QueryClient,
  QueryClientContext,
  queryOptions,
} from "@tanstack/react-query";
import { getPostgrestData, getSupabaseContext } from "@trmf/supabase-util";
import { use } from "react";

type SelectTagsQueryOptionsArgs = {
  offset: number;
  limit: number;
};

export const selectTagsQueryOptions = (args: SelectTagsQueryOptionsArgs) => {
  const supabase = getSupabaseContext();

  return queryOptions({
    queryFn: async () => {
      const { limit, offset } = args;
      const response = await supabase
        .from("tags")
        .select("*", { count: "estimated" })
        .range(offset, offset + limit)
        .order("created_at");
      return getPostgrestData(response);
    },
    queryKey: ["tags-data-access", "select-tags", args],
  });
};

const invalidateTags = async (queryClient?: QueryClient) => {
  const options = selectTagsQueryOptions({ limit: 0, offset: 0 });
  const queryKey = options.queryKey.slice(0, 2);
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
    onSuccess: () => {
      invalidateTags(queryClient);
      onSuccess();
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
    onSuccess: () => {
      invalidateTags(queryClient);
    },
  };
};

type UpdateTagMutationOptionsVariables = {
  tagId: number;
  name: string;
};

export const updateTagMutationOptions = (): MutationOptions<
  null,
  Error,
  UpdateTagMutationOptionsVariables
> => {
  const supabase = getSupabaseContext();
  const queryClient = use(QueryClientContext);

  return {
    mutationFn: async (args) => {
      const response = await supabase
        .from("tags")
        .update(args)
        .eq("id", args.tagId);
      return getPostgrestData(response);
    },
    onSuccess: () => {
      invalidateTags(queryClient);
    },
  };
};
