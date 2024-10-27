"use client";
import { handleTextareaKeyDown } from "@/lib/customUtils";
import { updateSnippetData } from "@/lib/snippetOperations";
import { Fira_Code } from "next/font/google";
import { useParams } from "next/navigation";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

interface CustomEditorProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  displayLineNumbers: boolean;
  fontSize: number;
}

interface CodeHistoryEntry {
  code: string;
  cursorPosition: number;
}

const firaCode = Fira_Code({ subsets: ["latin"] });

export default function CustomEditor({
  code,
  setCode,
  language,
  displayLineNumbers,
  fontSize,
}: CustomEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [codeHistory, setCodeHistory] = useState<CodeHistoryEntry[]>([
    { code, cursorPosition: 0 },
  ]);
  const [currentCodeHistoryIndex, setCurrentCodeHistoryIndex] =
    useState<number>(0);
  const [previousCode, setPreviousCode] = useState<string>(code);
  const params = useParams();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<string>("");
  const [updateStatusColor, setUpdateStatusColor] = useState<string>("");

  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkModeQuery.matches);
    const handleThemeChange = (e: MediaQueryListEvent) =>
      setIsDarkMode(e.matches);
    darkModeQuery.addEventListener("change", handleThemeChange);
    return () => darkModeQuery.removeEventListener("change", handleThemeChange);
  }, []);

  const updateCode = (newCode: string) => {
    const cursorPosition = textareaRef.current?.selectionStart ?? 0;
    const newCodeHistoryEntry = { code: newCode, cursorPosition };
    const updatedHistory = codeHistory.slice(0, currentCodeHistoryIndex + 1);
    setCodeHistory([...updatedHistory, newCodeHistoryEntry]);
    setCurrentCodeHistoryIndex(updatedHistory.length);
    setCode(newCode);
  };

  const handleKeyDownCallback = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      const undo = () => {
        if (currentCodeHistoryIndex > 0) {
          const newIndex = currentCodeHistoryIndex - 1;
          const newCodeHistoryEntry = codeHistory[newIndex];
          setCurrentCodeHistoryIndex(newIndex);
          setCode(newCodeHistoryEntry.code);
          restoreCursorPosition(newCodeHistoryEntry.cursorPosition);
        }
      };
      const redo = () => {
        if (currentCodeHistoryIndex < codeHistory.length - 1) {
          const newIndex = currentCodeHistoryIndex + 1;
          setCurrentCodeHistoryIndex(newIndex);
          setCode(codeHistory[newIndex].code);
          restoreCursorPosition(codeHistory[newIndex].cursorPosition);
        }
      };
      handleTextareaKeyDown(e, textareaRef, code, setCode, undo, redo);
    },
    [code, setCode, codeHistory, currentCodeHistoryIndex],
  );

  const restoreCursorPosition = (cursorPosition: number) => {
    const textarea = textareaRef.current;
    if (textarea) {
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = cursorPosition;
      }, 0);
    }
  };

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
  }, [code, params]);

  useEffect(() => {
    if (code && code !== previousCode && code.replace(/\s+/g, "") !== "") {
      const debounceCode = setTimeout(() => updateSnippetContent(), 1000);
      return () => clearTimeout(debounceCode);
    }
  }, [code, updateSnippetContent, previousCode]);

  return (
    <div className="scrollbar relative flex max-h-[300px] w-full max-w-full overflow-y-auto overflow-x-hidden bg-inherit text-[12px]/[18px] focus-within:shadow-2xl focus:shadow-2xl">
      <div
        className={firaCode.className}
        style={{
          ...styles.container,
          fontSize: `${fontSize}px`,
          lineHeight: `${fontSize + 6}px`,
        }}
      >
        <SyntaxHighlighter
          showLineNumbers={displayLineNumbers}
          lineNumberStyle={{
            position: "absolute",
            left: "0",
            display: "flex !important",
            justifyContent: "flex-end !important",
            visibility: "hidden",
            maxWidth: "27px",
          }}
          showInlineLineNumbers={true}
          language={language}
          style={isDarkMode ? oneDark : oneLight}
          PreTag={(props) => (
            <PreTag {...props} showLineNumbers={displayLineNumbers} />
          )}
          CodeTag={(props) => <CodeTag {...props} />}
        >
          {code}
        </SyntaxHighlighter>
        <textarea
          ref={textareaRef}
          style={{
            ...styles.editor,
            ...styles.textarea,
            paddingLeft: displayLineNumbers ? "27px" : "3px",
          }}
          className="scrollbar"
          value={code}
          onChange={(e) => updateCode(e.target.value)}
          onKeyDown={handleKeyDownCallback}
          spellCheck={false}
          data-gramm={false}
        />
      </div>
      {updateStatus !== "" && (
        <div
          className={`animate-slideInFromRight absolute right-0 z-50 select-none rounded-bl-lg pl-2 pr-1 ${updateStatusColor}`}
        >
          <p className="text-sm font-semibold text-white">{updateStatus}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    textAlign: "left",
    boxSizing: "border-box",
    padding: 0,
    overflow: "hidden",
    width: "100%",
    height: "100%",
  },
  textarea: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    resize: "none",
    color: "inherit",
    overflow: "hidden",
    MozOsxFontSmoothing: "grayscale",
    WebkitFontSmoothing: "antialiased",
    WebkitTextFillColor: "transparent",
  },
  highlight: {
    position: "relative",
    pointerEvents: "none",
    fontFamily: "inherit",
  },
  code: {
    fontFamily: "inherit",
    maxWidth: "100%",
    overflowWrap: "break-word",
  },
  editor: {
    margin: 0,
    border: 0,
    background: "none",
    boxSizing: "inherit",
    display: "inherit",
    fontFamily: "inherit",
    fontSize: "inherit",
    fontStyle: "inherit",
    fontVariantLigatures: "inherit",
    fontWeight: "inherit",
    letterSpacing: "inherit",
    lineHeight: "inherit",
    tabSize: "inherit",
    textIndent: "inherit",
    textRendering: "inherit",
    textTransform: "inherit",
    whiteSpace: "pre-wrap",
    wordBreak: "break-all",
    overflowWrap: "break-word",
    outline: "none",
    maxWidth: "100%",
    width: "100%",
  },
} as const;

const PreTag = ({
  children,
  showLineNumbers,
}: {
  children: any;
  showLineNumbers: boolean;
}) => {
  return (
    <pre
      style={{
        ...styles.editor,
        ...styles.highlight,
        paddingLeft: showLineNumbers ? "27px" : "3px",
      }}
    >
      {children}
    </pre>
  );
};

const CodeTag = ({ children }: { children: any }) => {
  return (
    <code style={{ ...styles.code }}>
      {children}
      <span>
        <br />
      </span>
    </code>
  );
};
