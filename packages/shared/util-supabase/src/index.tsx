import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createContext, type PropsWithChildren, useContext } from "react";
import type { Database } from "./types";

export const getSupabaseClient = () => {
  return createClient<Database>(
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    process.env.VITE_SUPABASE_URL!,
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    process.env.VITE_SUPABASE_ANON_KEY!,
  );
};

export type SupabaseTypedClient = SupabaseClient<Database>;

type SupabaseContextValue = SupabaseTypedClient | null;

const SupabaseContext = createContext<SupabaseContextValue>(null);

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
