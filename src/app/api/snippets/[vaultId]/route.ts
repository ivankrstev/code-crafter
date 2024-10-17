import authOptions from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { vaultId: string } },
) {
  // Route for fetching all snippets in a vault
  const { vaultId } = params;
  if (!vaultId || vaultId.trim() === "")
    return Response.json({ error: "Vault id can't be empty" }, { status: 400 });
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email)
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  const email = session.user.email;
  // Fetch all snippets in a vault
  const vault = await prisma.vault.findFirst({
    where: {
      id: vaultId,
      user: {
        email,
      },
    },
    include: {
      snippets: true,
    },
  });
  if (!vault)
    return Response.json({ error: "Vault not found" }, { status: 404 });
  return Response.json({
    vaultName: vault.name,
    snippets: vault.snippets,
  });
}

export async function POST(
  request: Request,
  { params }: { params: { vaultId: string } },
) {
  // Route for creating a new snippet
  const { vaultId } = params;
  if (!vaultId || vaultId.trim() === "")
    return Response.json({ error: "Vault id can't be empty" }, { status: 400 });
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email)
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  const email = session.user.email;
  const body = await request.json();
  const { title } = body;
  if (!title || title.trim() === "")
    return Response.json({ error: "Title can't be empty" }, { status: 400 });
  try {
    const newSnippet = await prisma.snippet.create({
      data: {
        title: title.trim(),
        language: "plaintext",
        content: "",
        user: {
          connect: { email },
        },
        vault: {
          connect: { id: vaultId },
        },
      },
    });
    if (!newSnippet)
      return Response.json(
        { error: "Failed to create snippet" },
        { status: 500 },
      );
    return Response.json({ newSnippet });
  } catch (error) {
    return Response.json(
      { error: "Failed to create snippet" },
      { status: 500 },
    );
  }
}
