"use client";

import { LoadingButton } from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import "@blocknote/react/style.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { TimelineEntry } from "./_components/TimelineEntry";
import { getTimelineEntries } from "./_lib/operations";

export default function Index() {
  const supabase = createClient();

  const getTimelineEntriesQuery = useQuery({
    queryFn: async () => {
      return getTimelineEntries(supabase);
    },
    queryKey: ["timeline"],
  });

  const createNewTimelineEntry = useMutation({
    mutationFn: async () => {
      return supabase.from("timeline").insert({});
    },
    onSuccess: () => {
      getTimelineEntriesQuery.refetch();
    },
  });

  return (
    <main className="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Timeline</h1>
        {createNewTimelineEntry.isPending ? (
          <LoadingButton />
        ) : (
          <Button
            onClick={() => {
              createNewTimelineEntry.mutate();
            }}
          >
            Add new entry
          </Button>
        )}
      </div>
      {getTimelineEntriesQuery.data && (
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {getTimelineEntriesQuery.data.map((entry) => {
              return <TimelineEntry key={entry.id} entry={entry} />;
            })}
          </AnimatePresence>
        </div>
      )}
    </main>
  );
}
