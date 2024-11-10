import ConfirmDiscardButtons from "@/components/ConfirmDiscardButtons";
import { deleteSnippet, updateSnippetData } from "@/lib/snippetOperations";
import { Snippet } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SnipperToolbarProps {
  id: string;
  snippet_id: string;
  snippet: Snippet;
}

export default function SnipperToolbar({
  id,
  snippet_id,
  snippet,
}: SnipperToolbarProps) {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="flex w-full justify-end gap-x-1">
      {snippet.isFavorite ? (
        <button
          className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-400"
          title="Remove from favorites"
          onClick={async () => {
            await updateSnippetData(id, snippet_id, { isFavorite: false });
          }}
        >
          <Image
            className="filter-black dark:filter-white"
            src="/icons/star_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg"
            alt="Starred"
            width={20}
            height={20}
          />
        </button>
      ) : (
        <button
          className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-400"
          title="Add to favorites"
          onClick={async () => {
            await updateSnippetData(id, snippet_id, { isFavorite: true });
          }}
        >
          <Image
            className="filter-black dark:filter-white"
            src="/icons/star_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
            alt="Star"
            width={20}
            height={20}
          />
        </button>
      )}
      {snippet.isLocked ? (
        <button
          className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-400"
          title="Unlock snippet"
          onClick={async () => {
            await updateSnippetData(id, snippet_id, { isLocked: false });
          }}
        >
          <Image
            className="filter-black dark:filter-white"
            src="/icons/lock_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
            alt="Unlock"
            width={20}
            height={20}
          />
        </button>
      ) : (
        <button
          className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-400"
          title="Lock snippet"
          onClick={async () => {
            await updateSnippetData(id, snippet_id, { isLocked: true });
          }}
        >
          <Image
            className="filter-black dark:filter-white"
            src="/icons/lock_open_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
            alt="Lock"
            width={20}
            height={20}
          />
        </button>
      )}
      <div onBlur={() => setConfirmDelete(false)}>
        {confirmDelete ? (
          <ConfirmDiscardButtons
            confirmText="Delete snippet"
            cancelText="Cancel"
            onConfirm={async () => {
              if (await deleteSnippet(id, snippet_id))
                router.push(`/snipboard/${id}`);
            }}
            onCancel={() => setConfirmDelete(false)}
            autoFocus
          />
        ) : (
          <button
            className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-400"
            title="Delete snippet"
            onClick={() => setConfirmDelete(true)}
          >
            <Image
              className="filter-black dark:filter-white"
              src="/icons/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
              alt="Delete"
              width={20}
              height={20}
            />
          </button>
        )}
      </div>
    </div>
  );
}
