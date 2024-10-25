"use client";
import FontSizeAdjuster from "@/components/FontSizeAdjuster";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface SnippetOptionsMenuProps {
  displayLineNumbers: boolean;
  setDisplayLineNumbers: (value: (prev: boolean) => boolean) => void;
  fontSize: number;
  setFontSize: (value: (prev: number) => number) => void;
}

export default function SnippetOptionsMenu({
  displayLineNumbers,
  setDisplayLineNumbers,
  fontSize,
  setFontSize,
}: SnippetOptionsMenuProps) {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      optionsRef.current &&
      !optionsRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    )
      setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isVisible]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsVisible(!isVisible)}
        className="center"
      >
        <Image
          className="filter-black dark:filter-white"
          src="/icons/more_horiz_24dp_FILL0_wght400_GRAD0_opsz24.svg"
          alt="More Options"
          width={25}
          height={25}
        />
      </button>
      {isVisible && (
        <div
          ref={optionsRef}
          className="absolute right-0 top-4 z-20 flex min-w-max flex-col items-start gap-2 rounded-lg bg-white p-4 shadow-lg dark:bg-neutral-800"
        >
          <label className="inline-flex cursor-pointer items-center">
            <span className="mr-3 text-sm">Display line numbers</span>
            <input
              type="checkbox"
              checked={displayLineNumbers}
              className="peer sr-only"
              onChange={() => setDisplayLineNumbers((prev: boolean) => !prev)}
            />
            <div className="peer relative h-5 w-9 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white  rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700"></div>
          </label>
          <FontSizeAdjuster fontSize={fontSize} setFontSize={setFontSize} />
        </div>
      )}
    </div>
  );
}
