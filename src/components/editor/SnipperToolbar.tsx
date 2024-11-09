import ConfirmDiscardButtons from "@/components/ConfirmDiscardButtons";
import { deleteSnippet } from "@/lib/snippetOperations";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SnipperToolbarProps {
  id: string;
  snippet_id: string;
}

export default function SnipperToolbar({
  id,
  snippet_id,
}: SnipperToolbarProps) {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="flex w-full justify-end gap-x-1">
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
