"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getResumes } from "./resumes/_lib/operation";

export default function DashboardPage() {
  const supabase = createClient();
  const getResumesQuery = useQuery({
    queryFn: async () => {
      return getResumes(supabase);
    },
    queryKey: ["resumes"],
  });

  return (
    <main className="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="grid md:grid-cols-2">
        <div className="flex items-center justify-center p-8 border border-dashed rounded-lg shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              {getResumesQuery.data?.length} resumes
            </h3>
            <p className="text-sm text-muted-foreground">
              Generate a new resume.
            </p>
            <Button className="mt-4" asChild>
              <Link href="/dashboard/resumes">Create resume</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
