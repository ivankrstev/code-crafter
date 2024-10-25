"use client";
import CustomEditor from "@/components/CustomEditor";
import SelectCodeLanguage from "@/components/SelectCodeLanguage";
import SnippetOptionsMenu from "@/components/SnippetOptionsMenu";
import { useState } from "react";

interface SnippetContainerProps {
  languageProp: string;
  codeProp: string;
}

export default function SnippetContainer({
  languageProp,
  codeProp,
}: SnippetContainerProps) {
  const [language, setLanguage] = useState<string>(languageProp);
  const [displayLineNumbers, setDisplayLineNumbers] = useState<boolean>(true);
  const [code, setCode] = useState<string>(codeProp);

  return (
    <div className="min-h-1/2 min-w-[60%] max-w-full rounded-lg border border-gray-500 bg-slate-800">
      <div className="snippet-tools flex select-none items-center justify-between border-b p-0.5 font-sans text-xs">
        <SelectCodeLanguage language={language} setLanguage={setLanguage} />
        <div className="flex items-center gap-2 pr-0.5 text-xs">
          <button className="-mt-0.5">Copy</button>
          <SnippetOptionsMenu
            displayLineNumbers={displayLineNumbers}
            setDisplayLineNumbers={setDisplayLineNumbers}
          />
        </div>
      </div>
      <CustomEditor
        code={code}
        setCode={setCode}
        language={language}
        displayLineNumbers={displayLineNumbers}
      />
    </div>
  );
}
