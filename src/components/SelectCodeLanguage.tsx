"use client";
import { resizeSelectToFitText } from "@/lib/customUtils";
import languagesList from "@/lib/languagesList";
import { updateSnippetData } from "@/lib/snippetOperations";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useRef } from "react";
import { toast } from "react-toastify";

interface SelectCodeLanguageProps {
  language: string;
  setLanguage: (language: string) => void;
}

export default function SelectCodeLanguage({
  language,
  setLanguage,
}: SelectCodeLanguageProps) {
  const selectRef = useRef<HTMLSelectElement>(null);
  const params = useParams();

  useEffect(() => {
    if (selectRef.current) resizeSelectToFitText(selectRef.current);
  }, [language]);

  const handleUpdateLanguage = async (language: string) => {
    try {
      const { id, snippet_id } = params as {
        id: string;
        snippet_id: string;
      };
      await updateSnippetData(id, snippet_id, { language });
      toast.success("Language updated successfully");
    } catch (error) {
      toast.error("Error updating language");
    }
  };

  return (
    <select
      ref={selectRef}
      className="rounded-tl-lg bg-transparent text-sm outline-none focus:border-blue-500 focus:ring-blue-500"
      title="Select language"
      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
        handleUpdateLanguage(e.target.value);
      }}
      defaultValue={language}
    >
      {languagesList.map(({ name, value }) => (
        <option
          key={value}
          className="bg-white dark:bg-neutral-800"
          value={value}
        >
          {name}
        </option>
      ))}
    </select>
  );
}
