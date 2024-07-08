"use client";
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
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline">Something went wrong.</span>
      </div>
    );
  if (isLoading)
    return (
      <div className="mt-2 flex max-h-72 w-full animate-pulse flex-col pr-1">
        <div className="mb-4 h-7 w-full rounded bg-gray-300" />
        <div className="mb-4 h-7 w-full rounded bg-gray-300" />
        <div className="mb-4 h-7 w-full rounded bg-gray-300" />
        <div className="mb-4 h-7 w-full rounded bg-gray-300" />
        <div className="mb-4 h-7 w-full rounded bg-gray-300" />
      </div>
    );

  return (
    <div className="scrollbar mt-2 flex max-h-72 w-full flex-col overflow-y-auto overflow-x-hidden pr-1">
      {vaults?.map((vault) => (
        <Link
          key={vault.id}
          id={vault.id}
          href={`/snipboard/${vault.id}`}
          className={`${selectedVault === vault.id ? "bg-white dark:bg-gray-400" : ""} w-full text-nowrap rounded-lg pl-3 outline-none transition-all duration-200 hover:bg-slate-200 dark:hover:bg-gray-600`}
          onClick={() => {
            setSelectedVault(vault.id);
            closeSidebar();
            closeMainSidebar();
          }}
          title={vault.name}
        >
          <p
            className="py-2"
            onMouseOver={(
              e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
            ) => {
              const link = e.target as HTMLParagraphElement;
              if (link.scrollWidth > link.clientWidth) {
                const distance = link.scrollWidth - link.clientWidth;
                const duration = distance / 55;
                link.style.setProperty("--duration", duration + "s");
                link.style.setProperty("--distance", -distance + "px");
                link.classList.add("slide");
              }
            }}
            onMouseOut={(
              e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
            ) => {
              const vaultName = e.target as HTMLParagraphElement;
              vaultName.classList.remove("slide");
            }}
          >
            {vault.name}
          </p>
        </Link>
      ))}
    </div>
  );
}
