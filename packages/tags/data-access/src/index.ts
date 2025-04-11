import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import { type MutationOptions, queryOptions } from "@tanstack/react-query";
import { getSupabaseContext } from "@trmf/supabase-util";

type SelectTagsQueryOptionsArgs = {
  offset: number;
  limit: number;
};

const getPostgrestData = <T>(response: PostgrestSingleResponse<T>) => {
  if (response.error) {
    throw response.error;
  }
  return response.data;
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

type InsertTagMutationOptionsVariables = {
  name: string;
};

export const insertTagMutationOptions = (): MutationOptions<
  null,
  Error,
  InsertTagMutationOptionsVariables
> => {
  const supabase = getSupabaseContext();

  return {
    mutationFn: async (args) => {
      const response = await supabase.from("tags").insert(args);
      return getPostgrestData(response);
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

  return {
    mutationFn: async (args) => {
      const response = await supabase
        .from("tags")
        .delete()
        .eq("id", args.tagId);
      return getPostgrestData(response);
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

  return {
    mutationFn: async (args) => {
      const response = await supabase
        .from("tags")
        .update(args)
        .eq("id", args.tagId);
      return getPostgrestData(response);
    },
  };
};
