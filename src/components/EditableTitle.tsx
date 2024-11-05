"use client";
import ConfirmDiscardButtons from "@/components/ConfirmDiscardButtons";
import Image from "next/image";
import { Fragment, KeyboardEvent, useEffect, useRef, useState } from "react";

interface EditableTitleProps {
  initialTitle: string;
  onSave: (newTitle: string) => void;
}

export default function EditableTitle({
  initialTitle,
  onSave,
}: EditableTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current && isEditing) {
      titleRef.current.focus();
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(titleRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [title, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLDivElement>) =>
    setTitle(e.target.innerText);

  const handleBlur = () => {
    setIsEditing(false);
    onSave(title);
    document.body.blur();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) =>
    e.key === "Enter" && handleBlur();

  return (
    <div className="flex w-full max-w-full items-center border-b-2 border-gray-300 bg-transparent dark:border-gray-700">
      {isEditing ? (
        <Fragment>
          <div
            ref={titleRef}
            autoFocus={true}
            contentEditable={true}
            suppressContentEditableWarning={true}
            className="flex- resize-none break-all bg-transparent text-xl font-semibold outline-none dark:border-gray-700"
            onInput={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          >
            {title}
          </div>
          <ConfirmDiscardButtons
            confirmText="Save changes"
            cancelText="Discard changes"
            onConfirm={handleBlur}
            onCancel={() => setIsEditing(!isEditing)}
          />
        </Fragment>
      ) : (
        <Fragment>
          <h1 className="break-all text-xl font-semibold">{title}</h1>
          <button
            className="ml-1 min-h-fit min-w-fit rounded-lg px-1.5 py-1.5 hover:bg-gray-300 dark:hover:bg-gray-600"
            title="Edit title"
            onClick={() => setIsEditing(true)}
          >
            <Image
              src="/icons/edit_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
              className="filter-black dark:filter-white"
              alt="Edit"
              width={20}
              height={20}
            />
          </button>
        </Fragment>
      )}
    </div>
  );
}
