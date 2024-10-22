import { Snippet } from "@prisma/client";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface SnippetDataToUpdate {
  title?: string;
  content?: string;
  language?: string;
}

export const updateSnippetData = async (
  vaultId: string,
  snippetId: string,
  fieldsToUpdate: SnippetDataToUpdate,
): Promise<{ updatedSnippet?: Snippet }> => {
  try {
    const res = await fetch(`/api/snippets/${vaultId}/${snippetId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fieldsToUpdate),
    });
    if (res.ok) {
      const { updatedSnippet } = await res.json();
      return { updatedSnippet };
    } else return { updatedSnippet: undefined };
  } catch (error) {
    return { updatedSnippet: undefined };
  }
};

export const handleTitleChangeInSidebar = async (
  vaultId: string,
  snippetId: string,
  newTitle: string,
) => {
  const { updatedSnippet } = await updateSnippetData(vaultId, snippetId, {
    title: newTitle,
  });
  if (updatedSnippet) {
    mutate(`snippets/${vaultId}`, (data: any) => {
      const { snippets } = data;
      const targetSnippet = snippets.find(
        (v: Snippet) => v.id === updatedSnippet.id,
      );
      if (!targetSnippet)
        return {
          ...data,
        };
      targetSnippet.title = updatedSnippet.title;
      return {
        ...data,
        snippets,
      };
    });
  } else toast.error("Failed to update snippet title");
};
