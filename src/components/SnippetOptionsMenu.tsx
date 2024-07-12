"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function SnippetOptionsMenu() {
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
          className="absolute right-0 top-4 z-20 flex flex-col items-start gap-1.5 rounded-lg bg-white p-4 shadow-lg dark:bg-neutral-800"
        >
          <p>asdasd</p>
          <p>asdsad</p>
          <button>Delete</button>
        </div>
      )}
    </div>
  );
}
