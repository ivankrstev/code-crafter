"use client";
import CodeMirrorEditor from "@/components/editor/CodeMirrorEditor";
import CopyCodeButton from "@/components/editor/CopyCodeButton";
import EditorOptionsMenu from "@/components/editor/EditorOptionsMenu";
import SelectCodeLanguage from "@/components/editor/SelectCodeLanguage";
import type { LanguageValue } from "@/lib/languagesList";
import { Snippet } from "@prisma/client";
import { useState } from "react";

interface SnippetContainerProps {
  snippet: Snippet;
}

export default function SnippetContainer({ snippet }: SnippetContainerProps) {
  const [language, setLanguage] = useState<LanguageValue>(
    snippet.language as LanguageValue,
  );
  const [displayLineNumbers, setDisplayLineNumbers] = useState<boolean>(true);
  const [code, setCode] = useState<string>(snippet.content);
  const [fontSize, setFontSize] = useState(12);
  const [updateStatus, setUpdateStatus] = useState<string>("");
  const [updateStatusColor, setUpdateStatusColor] = useState<string>("");

  return (
    <div className="min-h-1/2 min-w-[60%] max-w-full rounded-lg border border-gray-500 bg-slate-100 dark:bg-[#252933]">
      <div className="flex select-none items-center justify-between border-b p-0.5 font-sans text-xs">
        <SelectCodeLanguage language={language} setLanguage={setLanguage} />
        <div className="flex items-center gap-2 pr-0.5 text-xs">
          <CopyCodeButton code={code} />
          <EditorOptionsMenu
            displayLineNumbers={displayLineNumbers}
            setDisplayLineNumbers={setDisplayLineNumbers}
            fontSize={fontSize}
            setFontSize={setFontSize}
          />
        </div>
      </div>
      <div className="relative">
        <CodeMirrorEditor
          code={code}
          setCode={setCode}
          language={language}
          displayLineNumbers={displayLineNumbers}
          fontSize={fontSize}
          setUpdateStatus={setUpdateStatus}
          setUpdateStatusColor={setUpdateStatusColor}
          isLocked={snippet.isLocked}
        />
        {updateStatus !== "" && (
          <div
            className={`absolute right-0 top-0 z-[1] h-fit w-[70px] animate-slideInFromRight select-none rounded-bl-lg pl-2 pr-1 ${updateStatusColor}`}
          >
            <p className="text-sm font-semibold text-white">{updateStatus}</p>
          </div>
        )}
      </div>
    </div>
  );
}
