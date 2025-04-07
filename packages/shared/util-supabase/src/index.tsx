import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from "react";
import type { Database } from "./types";

export const getSupabaseClient = () => {
  return createClient<Database>(
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    process.env.VITE_SUPABASE_URL!,
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    process.env.VITE_SUPABASE_ANON_KEY!,
  );
};

type SupabaseContextValue = SupabaseClient<Database> | null;

const SupabaseContext = createContext<SupabaseContextValue>(null);

export const SupabaseProvider = ({ children }: PropsWithChildren) => {
  const [supabase] = useState(() => getSupabaseClient());

  return <SupabaseContext value={supabase}>{children}</SupabaseContext>;
};

export const useSupabaseContext = () => {
  const supabase = useContext(SupabaseContext);

  if (!supabase) {
    throw new Error("SupabaseContent not defined!");
  }

  return supabase;
};
