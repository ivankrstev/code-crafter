"use client";
import EditableTitle from "@/components/EditableTitle";
import LoadingSpinner from "@/components/LoadingSpinner";
import SnippetContainer from "@/components/SnippetContainer";
import type { LanguageValue } from "@/lib/languagesList";
import { handleTitleChangeInSidebar } from "@/lib/snippetOperations";
import { Snippet } from "@prisma/client";
import { Fragment } from "react";
import useSWR from "swr";

export default function SnippetsPage({
  params,
}: {
  params: { id: string; snippet_id: string };
}) {
  const { id, snippet_id } = params;
  const fetcher = async (): Promise<{ snippet: Snippet | undefined }> =>
    fetch(`/api/snippets/${id}/${snippet_id}`).then((res) => res.json());
  const { data, error } = useSWR(`/snippets/${id}/${snippet_id}`, fetcher);

  return (
    <div className="mx-auto mt-6 flex w-[85%] max-w-[100%] flex-col items-center gap-y-5 py-7">
      {error && <div>Error loading snippet!</div>}
      {!data && !error && (
        <div className="mt-[5em]">
          <LoadingSpinner size="medium" text="Loading snippet..." />
        </div>
      )}
      {data && data.snippet && (
        <Fragment>
          <EditableTitle
            initialTitle={data.snippet.title}
            onSave={(newTitle: string) =>
              handleTitleChangeInSidebar(id, snippet_id, newTitle)
            }
          />
          <SnippetContainer
            languageProp={data.snippet.language as LanguageValue}
            codeProp={data.snippet.content}
          />
        </Fragment>
      )}
    </div>
  );
}
