import ModalBackdrop from "@/components/modals/ModalBackdrop";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";

export default function CreateVaultModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const router = useRouter();

  const handleCreateVault = async (formEvent: FormEvent<HTMLFormElement>) => {
    try {
      formEvent.preventDefault();
      const vaultName = (
        formEvent.currentTarget["vault-name"].value as string
      ).trim();
      const response = await fetch("/api/vaults", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: vaultName }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create vault");
      }
      const { newVault } = await response.json();
      toast.success("Vault created");
      mutate(
        "/api/vaults",
        (data) => ({ vaults: [...data.vaults, newVault] }),
        { populateCache: true },
      );
      router.push(`/snipboard/${newVault.id}`);
      closeModal();
    } catch (error) {
      toast.error((error as any).message || "Failed to create vault");
    }
  };

  return (
    <ModalBackdrop closeModal={closeModal}>
      <div className="relative w-96 rounded-lg bg-form p-10">
        <h2 className="mb-2 text-center text-2xl font-bold">Create Vault</h2>
        <button className="absolute right-4 top-4">
          <Image
            className="filter-black dark:filter-white"
            src="/icons/close_FILL0_wght400_GRAD0_opsz24.svg"
            alt="Close"
            width={25}
            height={25}
            onClick={closeModal}
          />
        </button>
        <form onSubmit={handleCreateVault}>
          <label htmlFor="vault-name" className="text-left text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="vault-name"
            required
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <button className="mt-5 w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white transition-all hover:bg-indigo-500 focus:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-95">
            Create
          </button>
        </form>
      </div>
    </ModalBackdrop>
  );
}
