import HeaderBar from "@/components/HeaderBar";
import Sidebars from "@/components/sidebar/Sidebars";

export default function SnipBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebars />
      <div
        id="main-content"
        className="max-w-[100%] flex-1 overflow-y-auto md:max-w-[calc(100%-320px)]"
      >
        <HeaderBar />
        {children}
      </div>
    </div>
  );
}
