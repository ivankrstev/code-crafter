"use client";
import Image from "next/image";

export default function CloseSidebarButton() {
    return (
      <button
        onClick={() => {
          const sidebar = document.querySelector("#sidebar")!;
          sidebar.setAttribute(
            "data-open",
            sidebar.getAttribute("data-open") !== "true" ? "true" : "false",
          );
        }}
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
    );
}