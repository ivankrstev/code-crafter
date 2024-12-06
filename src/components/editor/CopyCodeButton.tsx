import { useState } from "react";

interface CustomEditorProps {
  code: string;
}

export default function CopyCodeButton({ code }: CustomEditorProps) {
  const [copyStatus, setCopyStatus] = useState<string>("Copy");

  return (
    <button
      className={`-mt-0.5 ${copyStatus === "Copied ✓" ? "text-green-600 dark:text-green-400" : ""}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code);
          setCopyStatus("Copied ✓");
          setTimeout(() => setCopyStatus("Copy"), 2000); // Reset after 2 seconds
        } catch (error) {
          setCopyStatus("Failed");
        }
      }}
    >
      {copyStatus}
    </button>
  );
}
