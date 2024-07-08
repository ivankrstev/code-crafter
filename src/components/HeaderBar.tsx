"use client";
import CloseSidebarButton from "@/components/CloseSidebarButton";

export default function HeaderBar() {
  return (
    <header className="flex items-center bg-slate-300 p-3 dark:bg-slate-800">
      <div className="block md:hidden">
        <CloseSidebarButton />
      </div>
    </header>
  );
}
