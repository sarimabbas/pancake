"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import "@blocknote/react/style.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useChat } from "ai/react";
import { ResumeRender } from "./_components/ResumeRender";
import { Message } from "ai";

export default function ResumeSlugPage() {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const { slug } = useParams();
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  const getResumeQuery = useQuery({
    queryFn: async () => {
      const response = await supabase
        .from("resumes")
        .select("*")
        .eq("id", slug)
        .single();
      return response.data;
    },
    queryKey: ["resume", slug],
  });

  const getMessageContent = (message: Message) => {
    if (message.role === "assistant" && !isLoading) {
      return <ResumeRender jsonResume={message.content} />;
    } else {
      return message.content;
    }
  };

  return (
    <main className="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6 h-full">
      <div className="flex flex-col gap-2 h-full">
        <div className="flex items-center gap-4">
          <Button asChild size="sm" variant="secondary">
            <Link href="/dashboard/resumes">
              <ChevronLeft />
              Back
            </Link>
          </Button>
          <h1 className="text-lg font-semibold md:text-2xl">Edit resume</h1>
        </div>
        <h2 className="text-muted-foreground text-lg">
          {getResumeQuery.data?.name}
        </h2>
        <br />
        {/* chat interface */}
        <div className="flex flex-col w-full h-full mx-auto stretch  relative">
          <div className="flex flex-col gap-4 pb-48">
            {messages
              // .filter((m) => m.role !== "user")
              .map((m) => {
                return (
                  <div
                    key={m.id}
                    className="whitespace-pre-wrap rounded-md shadow border p-3"
                  >
                    {m.role === "user" ? "User: " : "AI: "}
                    {getMessageContent(m)}
                  </div>
                );
              })}
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-4 absolute bottom-4 border p-2 rounded-md shadow"
            style={{
              // center relative to viewport
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <textarea
              rows={5}
              cols={40}
              className="p-2 border rounded-md resize-none"
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
            />
            <Button type="submit">Send</Button>
          </form>
        </div>
      </div>
    </main>
  );
}
