import CreateSnippetModal from "@/components/CreateSnippetModal";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Snippet } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import useSWR from "swr";

interface SubSidebarProps {
  selectedVault: string | null;
  onBackClick: () => void;
  visible: boolean;
}

export default function SubSidebar({
  selectedVault,
  onBackClick,
  visible,
}: SubSidebarProps) {
  const [createSnippetModalOpen, setCreateSnippetModalOpen] =
    useState<boolean>(false);

  const fetchSnippets = async (selectedVault: string) =>
    await fetch(`/api/snippets/${selectedVault}`).then((res) => res.json());
  const { data, error } = useSWR(`snippets/${selectedVault}`, () =>
    fetchSnippets(`${selectedVault}`),
  );

  return (
    <div className={`h-full w-full space-y-2 ${visible ? "" : "hidden"}`}>
      <button onClick={onBackClick} className="block hover:text-gray-300">
        {"<- Back"}
      </button>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">{data?.vaultName}</p>
          <button
            className="center min-h-7 min-w-7 rounded-lg p-1 transition-colors duration-200 hover:bg-slate-200 dark:hover:bg-gray-600"
            title="New Snippet"
            onClick={() => setCreateSnippetModalOpen(true)}
          >
            <Image
              className="filter-black dark:filter-white"
              src="/icons/add_FILL0_wght400_GRAD0_opsz24.svg"
              alt="New"
              width={20}
              height={20}
            />
          </button>
        </div>
        {error && <div>Failed to load</div>}
        {!data && <LoadingSpinner text="Loading snippets..." />}
        {data && (
          <div className="scrollbar mt-3 max-h-[calc(100vh-200px)] min-h-[100px] space-y-2 overflow-y-auto">
            {data.snippets.length === 0 && (
              <p>No snippets found in this vault.</p>
            )}
            {data.snippets.length > 0 && (
              <Fragment>
                {data.snippets.map((snippet: Snippet) => (
                  <Link
                    key={snippet.id}
                    href={`/snipboard/${selectedVault}/${snippet.id}`}
                    className="block hover:text-gray-300"
                    title={snippet.title}
                  >
                    {snippet.title}
                  </Link>
                ))}
              </Fragment>
            )}
          </div>
        )}
      </div>
      {createSnippetModalOpen && (
        <CreateSnippetModal
          closeModal={() => setCreateSnippetModalOpen(false)}
        />
      )}
    </div>
  );
}
