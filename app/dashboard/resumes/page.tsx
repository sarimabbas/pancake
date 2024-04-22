"use client";

import { LoadingButton } from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { Database } from "@/utils/supabase/types";
import "@blocknote/react/style.css";
import { SupabaseClient } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Haikunator from "haikunator";
import { format } from "date-fns";
import Link from "next/link";

const haikunator = new Haikunator();

export const getResumes = async (s: SupabaseClient<Database>) => {
  const response = await s
    .from("resumes")
    .select("*")
    .order("created_at", { ascending: false });
  return response.data;
};

export default function ResumesPage() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  const getResumesQuery = useQuery({
    queryFn: async () => {
      return getResumes(supabase);
    },
    queryKey: ["resumes"],
  });

  const createNewResume = useMutation({
    mutationFn: async () => {
      return supabase.from("resumes").insert({
        name: haikunator.haikunate(),
      });
    },
    onSuccess: () => {
      getResumesQuery.refetch();
    },
  });

  const deleteResumeMutation = useMutation({
    mutationFn: async (id: string) => {
      return supabase.from("resumes").delete().eq("id", id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resumes"],
      });
    },
  });

  return (
    <main className="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Resumes</h1>
        {getResumesQuery.isPending ? (
          <LoadingButton />
        ) : (
          <Button
            onClick={() => {
              createNewResume.mutate();
            }}
          >
            Start new resume
          </Button>
        )}
      </div>
      {getResumesQuery.data && (
        <div className="grid md:grid-cols-2 gap-4">
          <AnimatePresence>
            {getResumesQuery.data.map((resume) => {
              return (
                <motion.div
                  key={resume.id}
                  className="flex flex-col gap-4 p-4 border border-dashed rounded-lg shadow-sm h-fit"
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <div className="text-xl">{resume.name}</div>
                  <div className="text-muted-foreground">
                    {format(new Date(resume.created_at), "dd MMM yyyy")}
                  </div>
                  <div className="flex items-center justify-between">
                    <Button asChild className="w-fit" size="sm">
                      <Link href={`/dashboard/resumes/${resume.id}`}>Edit</Link>
                    </Button>
                    {deleteResumeMutation.isPending ? (
                      <Button variant="secondary" className="w-fit" size="sm">
                        Deleting...
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        className="w-fit"
                        size="sm"
                        onClick={() => {
                          deleteResumeMutation.mutate(resume.id);
                        }}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </main>
  );
}
