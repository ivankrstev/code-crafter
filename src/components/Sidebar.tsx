"use client";
import CreateVaultModal from "@/components/CreateVaultModal";
import VaultsListing from "@/components/VaultsListing";
import Image from "next/image";
import { Fragment, useState } from "react";

export default function Sidebar({
  isSidebarOpen,
  closeSidebar,
}: {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}) {
  const [createVaultModalOpen, setCreateVaultModalOpen] = useState(false);

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
            className="h-auto w-7/12"
            priority
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
          <VaultsListing closeSidebar={() => closeSidebar()} />
        </div>
      </div>
    </Fragment>
  );
}
