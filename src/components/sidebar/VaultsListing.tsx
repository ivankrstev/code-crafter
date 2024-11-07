"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import SingleVaultListing from "@/components/sidebar/SingleVaultListing";
import { swrFetcher } from "@/lib/fetchHandlers";
import { Vault } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

export default function VaultsListing({
  closeSidebar,
  setSelectedVault,
  selectedVault,
  closeMainSidebar,
}: {
  selectedVault: string | null;
  setSelectedVault: (vault: string) => void;
  closeSidebar: () => void;
  closeMainSidebar: () => void;
}) {
  const router = useRouter();
  const { data, error, isLoading } = useSWR("/api/vaults", swrFetcher);

  useEffect(() => {
    if (
      selectedVault &&
      data &&
      data.vaults &&
      !data.vaults.find((vault: Vault) => vault.id === selectedVault)
    )
      router.push("/snipboard");
  }, [data, router, selectedVault]);

  if (error)
    return (
      <div
        className="relative mt-3 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
        role="alert"
      >
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">Something went wrong.</span>
      </div>
    );
  if (isLoading)
    return (
      <div className="mt-8">
        <LoadingSpinner text="Loading vaults..." />
      </div>
    );

  return (
    <div className="scrollbar mt-2 flex max-h-[calc(100vh-165px)] min-h-[100px] w-full flex-col overflow-y-auto overflow-x-hidden pr-1">
      {data &&
        data.vaults?.map((vault: Vault) => (
          <SingleVaultListing
            key={vault.id}
            id={vault.id}
            name={vault.name}
            selectedVault={selectedVault}
            setSelectedVault={setSelectedVault}
            closeSidebar={closeSidebar}
            closeMainSidebar={closeMainSidebar}
          />
        ))}
    </div>
  );
}
