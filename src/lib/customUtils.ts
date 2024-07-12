import { RefObject } from "react";

const resizeSelectToFitText = (selectElement: HTMLSelectElement) => {
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  var oStyles = getComputedStyle(selectedOption);
  const tmpElement = document.createElement("span");
  tmpElement.style.visibility = "hidden";
  tmpElement.style.whiteSpace = "nowrap";
  tmpElement.style.position = "absolute";
  tmpElement.style.fontFamily = oStyles.fontFamily;
  tmpElement.style.fontStyle = oStyles.fontStyle;
  tmpElement.style.fontWeight = oStyles.fontWeight;
  tmpElement.style.fontSize = oStyles.fontSize;
  tmpElement.textContent = selectedOption.textContent;
  document.body.appendChild(tmpElement);
  const width = tmpElement.offsetWidth;
  document.body.removeChild(tmpElement);
  selectElement.style.minWidth = `${width + 25}px`;
  selectElement.style.width = `${width + 25}px`;
};

const handleTextareaKeyDown = (
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  textareaRef: RefObject<HTMLTextAreaElement | null>,
  code: string,
  setCode: (code: string) => void,
  undo: () => void,
  redo: () => void,
) => {
  const textarea = textareaRef.current;
  if (!textarea) return;
  const { selectionStart, selectionEnd } = textarea;

  if (e.key === "Tab") {
    e.preventDefault();
    if (e.shiftKey) {
      const start = code.lastIndexOf("\t", selectionStart - 1);
      if (start >= 0 && code.substring(start, start + 1) === "\t") {
        const newValue = code.substring(0, start) + code.substring(start + 1);
        setCode(newValue);
        setTimeout(() => {
          if (textarea) textarea.selectionStart = textarea.selectionEnd = start;
        }, 0);
      }
      return;
    }
    const newValue =
      code.substring(0, selectionStart) + "\t" + code.substring(selectionEnd);
    setCode(newValue);
    setTimeout(() => {
      if (textarea) {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
      }
    }, 0);
  } else if (["[", "{", "("].includes(e.key)) {
    // Handle brackets
    e.preventDefault();
    const openingBracket = e.key;
    const closingBracket = e.key === "[" ? "]" : e.key === "{" ? "}" : ")";
    let newValue = code.substring(0, selectionStart);
    if (selectionStart === selectionEnd)
      newValue += openingBracket + closingBracket;
    else
      newValue +=
        openingBracket +
        code.substring(selectionStart, selectionEnd) +
        closingBracket;
    newValue += code.substring(selectionEnd);
    setCode(newValue);
    setTimeout(() => {
      if (textarea)
        textarea.selectionStart = textarea.selectionEnd = selectionEnd + 1;
    }, 0);
  } else if (e.ctrlKey || e.metaKey) {
    if (e.key === "z") {
      e.preventDefault();
      if (e.shiftKey) redo();
      else undo();
    } else if (e.key === "y") {
      e.preventDefault();
      redo();
    }
  }
};

export { handleTextareaKeyDown, resizeSelectToFitText };

declare global {
  interface Window {
    resizeSelectToFitText: typeof resizeSelectToFitText;
  }
}
