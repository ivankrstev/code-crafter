"use client";
import { handleTextareaKeyDown } from "@/lib/customUtils";
import { Fira_Code } from "next/font/google";
import { KeyboardEvent, useCallback, useRef, useState } from "react";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark as atomOneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CustomEditorProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  displayLineNumbers: boolean;
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
}: CustomEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [codeHistory, setCodeHistory] = useState<CodeHistoryEntry[]>([
    { code, cursorPosition: 0 },
  ]);
  const [currentCodeHistoryIndex, setCurrentCodeHistoryIndex] =
    useState<number>(0);

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

  return (
    <div className="editor-container scrollbar relative flex max-h-[300px] w-full max-w-full overflow-auto text-[12px]/[18px] focus-within:shadow-2xl focus:shadow-2xl">
      <div className={firaCode.className} style={{ ...styles.container }}>
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
          style={atomOneDark}
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
