interface SubSidebarProps {
  selectedVault: string | null;
  onBackClick: () => void;
  visible: boolean;
}

export default function SubSidebar({
  selectedVault,
  onBackClick,
  visible,
}: SubSidebarProps) {
  return (
    <div className={`h-full w-full space-y-2 ${visible ? "" : "hidden"}`}>
      <button onClick={onBackClick} className="block hover:text-gray-300">
        ← Back
      </button>
      <div className="pt-2">{selectedVault} Details</div>
      <a href="#" className="block hover:text-gray-300">
        Detail 1
      </a>
      <a href="#" className="block hover:text-gray-300">
        Detail 2
      </a>
      <a href="#" className="block hover:text-gray-300">
        Detail 3
      </a>
    </div>
  );
}
