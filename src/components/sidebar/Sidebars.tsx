"use client";
import LogoWrapper from "@/components/LogoWrapper";
import CreateVaultModal from "@/components/modals/CreateVaultModal";
import MainSidebar from "@/components/sidebar/MainSidebar";
import SubSidebar from "@/components/sidebar/SubSidebar";
import Image from "next/image";
import { useSelectedLayoutSegment } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

export default function Sidebars() {
  const vaultParam = useSelectedLayoutSegment();
  const [selectedVault, setSelectedVault] = useState<string | null>(vaultParam);
  const [mainSidebarVisible, setMainSidebarVisible] = useState<boolean>(true);
  const [createVaultModalOpen, setCreateVaultModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    setSelectedVault(vaultParam);
    setMainSidebarVisible(vaultParam ? false : true);
  }, [vaultParam]);

  return (
    <Fragment>
      {/* Sidebar */}
      <div
        id="sidebar"
        data-open="false"
        className="fixed z-50 hidden min-h-screen min-w-80 max-w-80 flex-col bg-slate-300 md:static md:block md:w-72 md:border-r dark:bg-slate-800"
        // className={`${isSidebarOpen ? "block" : "hidden md:block"} fixed z-50 min-h-screen min-w-80 max-w-80 flex-col bg-slate-300 md:static md:w-72 md:border-r dark:bg-slate-800`}
      >
        <div className="flex w-full justify-center py-4">
          <LogoWrapper />
          <button
            id="close-sidebar"
            className="absolute right-3 top-6 block md:hidden"
            onClick={() =>
              document
                .querySelector("#sidebar")
                ?.setAttribute("data-open", "false")
            }
          >
            <Image
              className="filter-black dark:filter-white"
              src="/icons/menu_open_FILL0_wght400_GRAD0_opsz24.svg"
              alt="Close Menu"
              width={32}
              height={32}
            />
          </button>
        </div>
        <div className="flex flex-col p-4">
          {mainSidebarVisible && (
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Vaults</h3>
              <button
                className="rounded-lg p-1 transition-colors duration-200 hover:bg-slate-200 dark:hover:bg-gray-600"
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
          )}
          <MainSidebar
            setSelectedVault={setSelectedVault}
            selectedVault={selectedVault}
            visible={mainSidebarVisible}
            closeMainSidebar={() => setMainSidebarVisible(false)}
          />
          {selectedVault && (
            <SubSidebar
              selectedVault={selectedVault}
              onBackClick={() => setMainSidebarVisible(true)}
              visible={!mainSidebarVisible}
            />
          )}
        </div>
      </div>
      {/* Sidebar Backdrop */}
      <div
        id="sidebar-backdrop"
        className={
          "fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity md:hidden"
        }
      />
    </Fragment>
  );
}
