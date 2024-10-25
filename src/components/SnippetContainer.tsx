"use client";
import CopyCodeButton from "@/components/CopyCodeButton";
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
  const [fontSize, setFontSize] = useState(12);

  return (
    <div className="min-h-1/2 min-w-[60%] max-w-full rounded-lg border border-gray-500 bg-slate-800">
      <div className="flex select-none items-center justify-between border-b p-0.5 font-sans text-xs">
        <SelectCodeLanguage language={language} setLanguage={setLanguage} />
        <div className="flex items-center gap-2 pr-0.5 text-xs">
          <CopyCodeButton code={code} />
          <SnippetOptionsMenu
            displayLineNumbers={displayLineNumbers}
            setDisplayLineNumbers={setDisplayLineNumbers}
            fontSize={fontSize}
            setFontSize={setFontSize}
          />
        </div>
      </div>
      <CustomEditor
        code={code}
        setCode={setCode}
        language={language}
        displayLineNumbers={displayLineNumbers}
        fontSize={fontSize}
      />
    </div>
  );
}
