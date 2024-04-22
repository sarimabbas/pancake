import { Database } from "@/utils/supabase/types";
import "@blocknote/react/style.css";
import { SupabaseClient } from "@supabase/supabase-js";

export const getResumes = async (s: SupabaseClient<Database>) => {
  const response = await s
    .from("resumes")
    .select("*")
    .order("created_at", { ascending: false });
  return response.data;
};
