"use client";
import Image from "next/image";

export default function HeaderBar({
  setIsSidebarOpen,
}: {
  setIsSidebarOpen: (isOpen: boolean) => void;
}) {
  return (
    <header className="flex items-center bg-slate-300 p-3 dark:bg-slate-800">
      <div className="block md:hidden">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="rounded hover:bg-gray-800 focus:outline-none"
        >
          <Image
            className="filter-black dark:filter-white"
            src="/icons/menu_FILL0_wght400_GRAD0_opsz24.svg"
            alt="Menu Icon"
            width={32}
            height={32}
          />
        </button>
      </div>
    </header>
  );
}
