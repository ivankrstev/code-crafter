import type { LanguageValue } from "@/lib/languagesList";
import { updateSnippetData } from "@/lib/snippetOperations";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { vscodeDark, vscodeLight } from "@uiw/codemirror-theme-vscode";
import type { Extension } from "@uiw/react-codemirror";
import CodeMirror from "@uiw/react-codemirror";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface CustomEditorProps {
  code: string;
  setCode: (code: string) => void;
  language: LanguageValue;
  displayLineNumbers: boolean;
  fontSize: number;
  setUpdateStatus: (status: string) => void;
  setUpdateStatusColor: (color: string) => void;
  isLocked: boolean;
}

export default function CodeMirrorEditor({
  code,
  setCode,
  language,
  displayLineNumbers,
  fontSize,
  setUpdateStatus,
  setUpdateStatusColor,
  isLocked,
}: CustomEditorProps) {
  const [extensions, setExtensions] = useState<Extension[]>([]);
  const [previousCode, setPreviousCode] = useState<string>(code);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const params = useParams();

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );
    // Initial check
    setIsDarkMode(darkModeMediaQuery.matches);
    const handleChange = (event: MediaQueryListEvent) =>
      setIsDarkMode(event.matches);
    darkModeMediaQuery.addEventListener("change", handleChange);
    // Cleanup
    return () => {
      darkModeMediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (language === "plaintext") {
      setExtensions([]);
      return;
    }
    const langExtension = loadLanguage(language);
    if (langExtension) setExtensions([langExtension]);
  }, [language]);

  const updateSnippetContent = useCallback(async () => {
    try {
      setUpdateStatus("Saving…");
      setUpdateStatusColor("bg-blue-500");
      const { id, snippet_id } = params as { id: string; snippet_id: string };
      if (!id || !snippet_id) return;
      const { updatedSnippet } = await updateSnippetData(id, snippet_id, {
        content: code,
      });
      if (updatedSnippet) {
        setPreviousCode(code);
        setUpdateStatus("Saved ✓");
        setUpdateStatusColor("bg-lime-600");
      } else {
        setUpdateStatus("Error saving");
        setUpdateStatusColor("bg-red-600");
      }
    } catch (error) {
      setUpdateStatus("Error saving");
      setUpdateStatusColor("bg-red-600");
    } finally {
      setTimeout(() => setUpdateStatus(""), 2000);
    }
  }, [code, params, setUpdateStatus, setUpdateStatusColor]);

  useEffect(() => {
    if (code && code !== previousCode && code.replace(/\s+/g, "") !== "") {
      const debounceCode = setTimeout(() => updateSnippetContent(), 1000);
      return () => clearTimeout(debounceCode);
    }
  }, [code, updateSnippetContent, previousCode]);

  return (
    <CodeMirror
      className={`${!displayLineNumbers ? "linenumbers-hidden" : ""}`}
      style={{ fontSize: `${fontSize}px` }}
      value={code}
      theme={isDarkMode ? vscodeDark : vscodeLight}
      height="auto"
      extensions={extensions}
      onChange={setCode}
      readOnly={isLocked}
    />
  );
}
