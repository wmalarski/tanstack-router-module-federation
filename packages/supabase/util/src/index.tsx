import {
  createClient,
  type PostgrestSingleResponse,
  type SupabaseClient,
} from "@supabase/supabase-js";
import { createContext, type PropsWithChildren, use, useContext } from "react";
import type { Database } from "./types";

export const getSupabaseClient = () => {
  return createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
  );
};

export type SupabaseDatabase = Database;

export type SupabaseTypedClient = SupabaseClient<Database>;

type SupabaseContextValue = SupabaseTypedClient | null;

export const SupabaseContext = createContext<SupabaseContextValue>(null);

type SupabaseProviderProps = PropsWithChildren<{
  supabase: SupabaseTypedClient;
}>;

export const SupabaseProvider = ({
  children,
  supabase,
}: SupabaseProviderProps) => {
  return <SupabaseContext value={supabase}>{children}</SupabaseContext>;
};

export const useSupabaseContext = () => {
  const supabase = useContext(SupabaseContext);

  if (!supabase) {
    throw new Error("SupabaseContext not defined!");
  }

  return supabase;
};

export const getSupabaseContext = () => {
  const supabase = use(SupabaseContext);

  if (!supabase) {
    throw new Error("SupabaseContext not defined!");
  }

  return supabase;
};

export const getPostgrestData = <T,>(response: PostgrestSingleResponse<T>) => {
  if (response.error) {
    throw response.error;
  }
  return response.data;
};
