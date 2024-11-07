"use client";
import ConfirmDiscardButtons from "@/components/ConfirmDiscardButtons";
import LoadingSpinner from "@/components/LoadingSpinner";
import { deleteVault, updateVaultName } from "@/lib/vaultOperations";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";

export default function SingleVaultListing({
  id,
  name,
  selectedVault,
  setSelectedVault,
  closeSidebar,
  closeMainSidebar,
}: {
  id: string;
  name: string;
  selectedVault: string | null;
  setSelectedVault: (vault: string) => void;
  closeSidebar: () => void;
  closeMainSidebar: () => void;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(name);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Link
      id={id}
      href={`/snipboard/${id}`}
      className={`${selectedVault === id ? "bg-white dark:bg-gray-400" : ""} group my-0.5 flex w-full items-center text-nowrap rounded-lg py-0.5 pl-2.5 text-sm outline-none transition-all duration-200 hover:bg-slate-200 dark:hover:bg-gray-600`}
      title={name}
      onBlur={async (e) => {
        if (isEditing && e.relatedTarget === null) {
          await updateVaultName({ id, newName, setIsLoading });
          setIsEditing(false);
        }
        if (isDeleting) setIsDeleting(false);
      }}
      onClick={() => {
        setSelectedVault(id);
        closeSidebar();
        closeMainSidebar();
      }}
    >
      <span className="mr-2 inline-block min-h-2 min-w-2 bg-gray-600 dark:bg-gray-100" />
      {isEditing ? (
        <input
          type="text"
          className="flex-1 bg-transparent py-1.5"
          defaultValue={name}
          autoFocus
          onChange={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setNewName(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
              updateVaultName({ id, newName, setIsLoading });
              setIsEditing(false);
            }
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        />
      ) : (
        <p className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap py-1.5">
          {name}
        </p>
      )}
      {isLoading && (
        <div className="flex px-2">
          <LoadingSpinner size="extrasmall" text="" />
        </div>
      )}
      {!isLoading && (
        <div
          className={`${selectedVault === id ? "block" : "hidden"} flex group-hover:md:block`}
        >
          {isEditing && (
            <ConfirmDiscardButtons
              confirmText="Save changes"
              cancelText="Cancel changes"
              onConfirm={async () => {
                await updateVaultName({ id, newName, setIsLoading });
                setIsEditing(false);
              }}
              onCancel={() => setIsEditing(false)}
            />
          )}
          {isDeleting && (
            <ConfirmDiscardButtons
              confirmText="Delete vault"
              cancelText="Cancel deletion"
              onConfirm={async () => {
                await deleteVault({ id, setIsLoading });
                setIsDeleting(false);
              }}
              onCancel={() => setIsDeleting(false)}
              autoFocus
            />
          )}
          {!isEditing && !isDeleting && (
            <Fragment>
              <button
                className="mx-1 rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-400"
                title="Edit vault name"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setIsEditing(true);
                }}
              >
                <span className="sr-only">Edit vault name</span>
                <Image
                  className="filter-black dark:filter-white"
                  src="/icons/edit_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
                  alt="Edit vault name"
                  width={20}
                  height={20}
                />
              </button>
              <button
                className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-400"
                title="Delete vault"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setIsDeleting(true);
                }}
              >
                <span className="sr-only">Delete vault</span>
                <Image
                  className="filter-black dark:filter-white"
                  src="/icons/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
                  alt="Delete vault"
                  width={20}
                  height={20}
                />
              </button>
            </Fragment>
          )}
        </div>
      )}
    </Link>
  );
}
