"use client";
import HeaderBar from "@/components/HeaderBar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function SnipBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen w-screen max-w-full">
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      <div className="flex grow flex-col">
        <HeaderBar setIsSidebarOpen={setIsSidebarOpen} />
        <div className="h-auto grow">{children}</div>
      </div>
    </div>
  );
}
