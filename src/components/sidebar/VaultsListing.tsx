"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [vaults, setVaults] = useState<Array<{ id: string; name: string }>>([]);

  const fetchVaults = async () =>
    await fetch("/api/vaults").then((res) => res.json());
  const { data, error, isLoading } = useSWR("/api/vaults", fetchVaults);
  useEffect(() => data && setVaults(data.vaults), [data]);

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
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="scrollbar mt-2 flex max-h-[calc(100vh-165px)] min-h-[100px] w-full flex-col overflow-y-auto overflow-x-hidden pr-1">
      {vaults?.map((vault) => (
        <Link
          key={vault.id}
          id={vault.id}
          href={`/snipboard/${vault.id}`}
          className={`${selectedVault === vault.id ? "bg-white dark:bg-gray-400" : ""} my-0.5 w-full text-nowrap rounded-lg py-1 pl-2.5 text-sm outline-none transition-all duration-200 hover:bg-slate-200 dark:hover:bg-gray-600`}
          onClick={() => {
            setSelectedVault(vault.id);
            closeSidebar();
            closeMainSidebar();
          }}
          title={vault.name}
        >
          <span className="mr-2 inline-block h-2 w-2 bg-gray-600 dark:bg-gray-100" />
          {vault.name}
        </Link>
      ))}
    </div>
  );
}
