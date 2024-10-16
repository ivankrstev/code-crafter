"use client";
import CloseSidebarButton from "@/components/CloseSidebarButton";

export default function HeaderBar() {
  return (
    <header className="flex items-center bg-slate-300 dark:bg-slate-800">
      <div className="block p-1 md:hidden">
        <CloseSidebarButton />
      </div>
    </header>
  );
}
