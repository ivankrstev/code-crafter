"use client";
import Image from "next/image";
import { KeyboardEvent, useState } from "react";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const handleBlur = () => {
    setIsEditing(false);
    onSave(title);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && handleBlur();

  return isEditing ? (
    <input
      className="w-full border-b-2 border-gray-300 bg-transparent text-xl font-semibold dark:border-gray-700"
      type="text"
      value={title}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      autoFocus
    />
  ) : (
    <h1 className="w-full border-b-2 border-gray-300 bg-transparent text-xl font-semibold dark:border-gray-700">
      {title}
      <button
        className="ml-1"
        title="Edit title"
        onClick={() => setIsEditing(true)}
      >
        <Image
          src="/icons/edit_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
          className="filter-black dark:filter-white"
          alt="Edit"
          width={16}
          height={16}
        />
      </button>
    </h1>
  );
}
