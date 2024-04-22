"use client";

import { createClient } from "@/utils/supabase/client";
import { Json } from "@/utils/supabase/types";
import { Block } from "@blocknote/core";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { getTimelineEntries } from "../_lib/operations";

interface EditorProps {
  entry: NonNullable<Awaited<ReturnType<typeof getTimelineEntries>>>[0];
}

const Editor = (props: EditorProps) => {
  const { entry } = props;
  const supabase = createClient();
  const queryClient = useQueryClient();

  const initialContent = entry.content as Block[];

  const editor = useCreateBlockNote({
    initialContent,
  });

  /**
   * Mutation function to set the editor content.
   *
   * @param {Json} content - The content to set in the editor.
   * @returns {Promise<void>} - A promise that resolves when the content is set.
   */
  const setEditorContentMutation = useMutation({
    mutationFn: async (content: Json) => {
      const markdown = await editor.blocksToMarkdownLossy();
      return supabase
        .from("timeline")
        .update({ content, markdown })
        .eq("id", entry.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["timeline"],
      });
    },
  });

  const debouncedSetEditorMutation = useDebouncedCallback(
    setEditorContentMutation.mutate,
    1000
  );

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      editor={editor}
      className="w-full h-full break-all"
      onChange={() => {
        debouncedSetEditorMutation(editor.document);
      }}
    />
  );
};

export default Editor;
