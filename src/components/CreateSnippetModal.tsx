import ModalBackdrop from "@/components/ModalBackdrop";
import Image from "next/image";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { FormEvent, useEffect } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";

export default function CreateSnippetModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const router = useRouter();
  const segments = useSelectedLayoutSegments();

  useEffect(() => {
    // prevent modal from opening if there are no segments(vaultId is mandatory)
    if (!segments || segments.length === 0) closeModal();
  }, [segments, closeModal]);

  const handleCreateSnippet = async (formEvent: FormEvent<HTMLFormElement>) => {
    try {
      const vaultParam = segments[0];
      formEvent.preventDefault();
      const snippetTitle = (
        formEvent.currentTarget["snippet-title"].value as string
      ).trim();
      const response = await fetch(`/api/snippets/${vaultParam}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: snippetTitle }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create snippet");
      }
      const { newSnippet } = await response.json();
      toast.success("Snippet created");
      mutate(
        `/api/snippets/${vaultParam}`,
        (data) => ({ ...data, snippets: [...data.snippets, newSnippet] }),
        { populateCache: true },
      );
      router.push(`/snipboard/${vaultParam}/${newSnippet.id}`);
      closeModal();
    } catch (error) {
      toast.error((error as any).message || "Failed to create snippet");
    }
  };

  return (
    <ModalBackdrop closeModal={closeModal}>
      <div className="relative w-96 rounded-lg bg-form p-10">
        <h2 className="mb-2 text-center text-2xl font-bold">Create Snippet</h2>
        <button className="absolute right-4 top-4">
          <Image
            className="filter-black dark:filter-white"
            src="/icons/close_FILL0_wght400_GRAD0_opsz24.svg"
            alt="Close"
            width={25}
            height={25}
            onClick={closeModal}
          />
        </button>
        <form onSubmit={handleCreateSnippet}>
          <label
            htmlFor="snippet-title"
            className="text-left text-sm font-medium"
          >
            Title
          </label>
          <input
            type="text"
            id="snippet-title"
            required
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <button className="mt-5 w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white transition-all hover:bg-indigo-500 focus:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-95">
            Create
          </button>
        </form>
      </div>
    </ModalBackdrop>
  );
}
