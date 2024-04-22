import { Database } from "@/utils/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";

export const getTimelineEntries = async (s: SupabaseClient<Database>) => {
  const response = await s
    .from("timeline")
    .select("*")
    .order("date", { ascending: false });
  return response.data;
};
