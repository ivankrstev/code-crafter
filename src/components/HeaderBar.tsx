"use client";
import CloseSidebarButton from "@/components/CloseSidebarButton";
import LogoWrapper from "@/components/LogoWrapper";

export default function HeaderBar() {
  return (
    <header className="flex items-center bg-slate-300 md:hidden dark:bg-slate-800">
      <div className="p-1">
        <CloseSidebarButton />
      </div>
      <div className="mx-auto py-3">
        <LogoWrapper />
      </div>
    </header>
  );
}
