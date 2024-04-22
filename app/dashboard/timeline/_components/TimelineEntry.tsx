"use client";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { getTimelineEntries } from "../_lib/operations";
import { Skeleton } from "@/components/ui/skeleton";

const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-10 rounded-md" />,
});

interface TimelineEntryProps {
  entry: NonNullable<Awaited<ReturnType<typeof getTimelineEntries>>>[0];
}

export const TimelineEntry = (props: TimelineEntryProps) => {
  const { entry } = props;
  const { date } = entry;
  const supabase = createClient();
  const queryClient = useQueryClient();

  const setDateMutation = useMutation({
    mutationFn: async (date?: Date) => {
      if (!date) return;
      return supabase
        .from("timeline")
        .update({ date: date.toISOString() })
        .eq("id", entry.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["timeline"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      return supabase.from("timeline").delete().eq("id", entry.id);
    },
    onSuccess: () => {
      // Refetch query key "timeline"
      queryClient.invalidateQueries({
        queryKey: ["timeline"],
      });
    },
  });

  return (
    <motion.div
      className="flex flex-col gap-4 p-4 border border-dashed rounded-lg shadow-sm h-fit"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <DatePicker
        date={date ? new Date(date) : undefined}
        onChange={(date) => setDateMutation.mutate(date)}
      />
      <Editor entry={entry} />
      <Input placeholder="Comma-separated tags" className="w-fit" />
      {deleteMutation.isPending ? (
        <Button variant="secondary" className="w-fit" size="sm">
          Deleting...
        </Button>
      ) : (
        <Button
          variant="secondary"
          className="w-fit"
          size="sm"
          onClick={() => {
            deleteMutation.mutate();
          }}
        >
          Delete
        </Button>
      )}
    </motion.div>
  );
};
