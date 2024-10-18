import authOptions from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { getServerSession } from "next-auth";

export async function PUT(
  request: Request,
  { params }: { params: { vaultId: string } },
) {
  const { vaultId } = params;
  if (!vaultId || vaultId.trim() === "")
    return Response.json({ error: "Vault id can't be empty" }, { status: 400 });
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email)
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const { name } = body;
  if (!name || name.trim() === "")
    return Response.json({ error: "Name is required" }, { status: 400 });
  try {
    const updatedVault = await prisma.vault.update({
      where: {
        id: vaultId,
        user: {
          email: session.user.email,
        },
      },
      data: { name: name.trim() },
    });
    return Response.json({ updatedVault });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    )
      return Response.json({ error: "Vault not found" }, { status: 404 });
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { vaultId: string } },
) {
  const { vaultId } = params;
  if (!vaultId || vaultId.trim() === "")
    return Response.json({ error: "Vault id can't be empty" }, { status: 400 });
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email)
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const deletedVault = await prisma.vault.delete({
      where: {
        id: vaultId,
        user: {
          email: session.user.email,
        },
      },
    });
    if (!deletedVault)
      return Response.json(
        { error: "Failed to delete vault" },
        { status: 500 },
      );
    return Response.json({ deletedVaultId: deletedVault.id });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    )
      return Response.json({ error: "Vault not found" }, { status: 404 });
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
