"use client";
import CreateVaultModal from "@/components/CreateVaultModal";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

export default function Sidebar({
  isSidebarOpen,
  closeSidebar,
}: {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}) {
  const [createVaultModalOpen, setCreateVaultModalOpen] = useState(false);
  const vaultParam = useSelectedLayoutSegment();
  useEffect(() => {
    setSelectedVault(vaultParam);
    if (vaultParam) document.getElementById(vaultParam)?.focus();
  }, [vaultParam]);

  const [selectedVault, setSelectedVault] = useState<string | null>(vaultParam);
  const [vaults, setVaults] = useState([{ id: "vault1", name: "Vault 1" }]);

  return (
    <Fragment>
      {/* Sidebar Backdrop */}
      <div
        className={`${!isSidebarOpen && "hidden"} fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity`}
      />
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "block" : "hidden md:block"} fixed z-50 min-h-screen w-80 max-w-full flex-col bg-slate-300 sm:w-72 md:static md:border-r dark:bg-slate-800`}
      >
        <div className="flex w-full justify-center py-4">
          <Image
            src="/code-crafter-full-logo.svg"
            alt="Logo"
            width={150}
            height={100}
          />
          {isSidebarOpen && (
            <button className="absolute right-3 top-6" onClick={closeSidebar}>
              <Image
                className="filter-black dark:filter-white"
                src="/icons/menu_open_FILL0_wght400_GRAD0_opsz24.svg"
                alt="Close Menu"
                width={32}
                height={32}
              />
            </button>
          )}
        </div>
        <div className="flex flex-col p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Vaults</h3>
            <button
              className="rounded-lg p-1 transition-colors duration-200 hover:bg-gray-700"
              title="New Vault"
              onClick={() => setCreateVaultModalOpen(true)}
            >
              <Image
                className="filter-black dark:filter-white"
                src="/icons/add_FILL0_wght400_GRAD0_opsz24.svg"
                alt="New"
                width={20}
                height={20}
              />
            </button>
            {createVaultModalOpen && (
              <CreateVaultModal
                closeModal={() => setCreateVaultModalOpen(false)}
              />
            )}
          </div>
          <div className="scrollbar mt-2 flex max-h-72 w-full flex-col overflow-y-auto overflow-x-hidden pr-1">
            {vaults.map((vault) => (
              <Link
                key={vault.id}
                id={vault.id}
                href={`/snipboard/${vault.id}`}
                className={`${selectedVault === vault.id ? "bg-white dark:bg-gray-400" : ""} w-full text-nowrap rounded-lg pl-3 outline-none transition-all duration-200 hover:bg-slate-200 dark:hover:bg-gray-600`}
                onClick={closeSidebar}
                title={vault.name}
              >
                <p
                  className="py-2"
                  onMouseOver={(
                    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
                  ) => {
                    const link = e.target as HTMLParagraphElement;
                    if (link.scrollWidth > link.clientWidth) {
                      const duration =
                        (link.scrollWidth - link.clientWidth) / 50;
                      link.style.setProperty("--duration", duration + "s");
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
        </div>
      </div>
    </Fragment>
  );
}
