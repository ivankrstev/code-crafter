import { Vault } from "@prisma/client";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface VaultUpdateProps {
  id: string;
  newName: string;
  setIsLoading: (loading: boolean) => void;
}

interface VaultDeleteProps {
  id: string;
  setIsLoading: (loading: boolean) => void;
}

export const updateVaultName = async ({
  id,
  newName,
  setIsLoading,
}: VaultUpdateProps) => {
  setIsLoading(true);
  try {
    const response = await fetch(`/api/vaults/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName }),
    });
    if (response.ok) {
      const { updatedVault } = await response.json();
      mutate(`/api/vaults`, (data: any) => {
        return {
          ...data,
          vaults: data.vaults.map((vault: Vault) =>
            vault.id === id ? { ...updatedVault } : vault,
          ),
        };
      });
    } else toast.error("Error updating vault name!");
  } catch (error) {
    toast.error("Error updating vault name!");
  } finally {
    setIsLoading(false);
  }
};

export const deleteVault = async ({ id, setIsLoading }: VaultDeleteProps) => {
  setIsLoading(true);
  try {
    const response = await fetch(`/api/vaults/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      mutate(
        `/api/vaults`,
        (data: any) => {
          return {
            ...data,
            vaults: data.vaults.filter((vault: Vault) => vault.id !== id),
          };
        },
        true,
      );
    } else toast.error("Error deleting vault!");
  } catch (error) {
    toast.error("Error deleting vault!");
  } finally {
    setIsLoading(false);
  }
};
