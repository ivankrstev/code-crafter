import VaultsListing from "@/components/sidebar/VaultsListing";

interface MainSidebarProps {
  visible: boolean;
  selectedVault: string | null;
  setSelectedVault: (vault: string) => void;
  closeMainSidebar: () => void;
}

export default function MainSidebar({
  selectedVault,
  setSelectedVault,
  visible,
  closeMainSidebar,
}: MainSidebarProps) {
  return (
    <div className={`h-full w-full ${visible ? "" : "hidden"}`}>
      <VaultsListing
        closeMainSidebar={closeMainSidebar}
        closeSidebar={() => console.log("CLOSE SIDEBAR !!!!!!")}
        setSelectedVault={setSelectedVault}
        selectedVault={selectedVault}
      />
    </div>
  );
}
