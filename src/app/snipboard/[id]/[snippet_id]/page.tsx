"use client";
import EditableTitle from "@/components/EditableTitle";
import LoadingSpinner from "@/components/LoadingSpinner";
import SnipperToolbar from "@/components/editor/SnipperToolbar";
import SnippetContainer from "@/components/editor/SnippetContainer";
import { swrFetcher } from "@/lib/fetchHandlers";
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
  const { data, error } = useSWR<{ snippet: Snippet | undefined }>(
    `/api/snippets/${id}/${snippet_id}`,
    swrFetcher,
  );

  return (
    <div className="mx-auto mt-3 flex w-11/12 max-w-[100%] flex-col items-center gap-y-5 md:mt-6 md:w-5/6 md:py-7">
      {error && <div>Error loading snippet!</div>}
      {!data && !error && (
        <div className="mt-[5em]">
          <LoadingSpinner size="medium" text="Loading snippet..." />
        </div>
      )}
      {data && data.snippet && (
        <Fragment>
          <SnipperToolbar
            id={id}
            snippet_id={snippet_id}
            snippet={data.snippet}
          />
          <EditableTitle
            initialTitle={data.snippet.title}
            onSave={(newTitle: string) =>
              handleTitleChangeInSidebar(id, snippet_id, newTitle)
            }
          />
          <SnippetContainer snippet={data.snippet} />
        </Fragment>
      )}
    </div>
  );
}
