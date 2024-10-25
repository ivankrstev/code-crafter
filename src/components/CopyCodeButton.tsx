import { useState } from "react";

interface CustomEditorProps {
  code: string;
}

export default function CopyCodeButton({ code }: CustomEditorProps) {
  const [copyStatus, setCopyStatus] = useState<string>("Copy");

  return (
    <button
      className="-mt-0.5"
      style={{ color: copyStatus === "Copied ✓" ? "#90EE90" : "inherit" }}
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
