import { Snippet } from "@prisma/client";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface SnippetDataToUpdate {
  title?: string;
  content?: string;
  language?: string;
  isLocked?: boolean;
  isFavorite?: boolean;
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
      mutate(
        `/api/snippets/${vaultId}/${snippetId}`,
        () => {
          return { snippet: updatedSnippet };
        },
        true,
      );
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
    mutate(`/api/snippets/${vaultId}`, (data: any) => {
      return {
        ...data,
        snippets: data.snippets.map((snippet: Snippet) =>
          snippet.id === snippetId ? { ...updatedSnippet } : snippet,
        ),
      };
    });
  } else toast.error("Failed to update snippet title");
};

export const deleteSnippet = async (
  vaultId: string,
  snippetId: string,
): Promise<boolean> => {
  try {
    const res = await fetch(`/api/snippets/${vaultId}/${snippetId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      mutate(`/api/snippets/${vaultId}`, (data: any) => {
        return {
          ...data,
          snippets: data.snippets.filter(
            (snippet: Snippet) => snippet.id !== snippetId,
          ),
        };
      });
      return true;
    } else return false;
  } catch (error) {
    return false;
  }
};
