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
  const [codeHistory, setCodeHistory] = useState<string[]>([code]);
  const [codeHistoryIndex, setCodeHistoryIndex] = useState<number>(0);

  const updateCode = (newCode: string) => {
    const newCodeHistory = codeHistory.slice(0, codeHistoryIndex + 1);
    setCodeHistory([...newCodeHistory, newCode]);
    setCodeHistoryIndex(newCodeHistory.length);
    setCode(newCode);
  };

  const handleKeyDownCallback = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      const textarea = textareaRef.current!;
      const { selectionStart, selectionEnd } = textarea;
      const undo = () => {
        if (codeHistoryIndex > 0) {
          setCodeHistoryIndex(codeHistoryIndex - 1);
          setCode(codeHistory[codeHistoryIndex - 1]);
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd =
              selectionStart - 1;
          }, 0);
        }
      };
      const redo = () => {
        if (codeHistoryIndex < codeHistory.length - 1) {
          setCodeHistoryIndex(codeHistoryIndex + 1);
          setCode(codeHistory[codeHistoryIndex + 1]);
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd =
              selectionStart + 1;
          }, 0);
        }
      };
      handleTextareaKeyDown(e, textareaRef, code, setCode, undo, redo);
    },
    [code, setCode, codeHistory, codeHistoryIndex],
  );

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
