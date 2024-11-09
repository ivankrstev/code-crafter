import authOptions from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { vaultId: string; snippetId: string } },
) {
  const { vaultId, snippetId } = params;
  if (!vaultId || vaultId.trim() === "")
    return Response.json({ error: "Vault id can't be empty" }, { status: 400 });
  if (!snippetId || snippetId.trim() === "")
    return Response.json(
      { error: "Snippet id can't be empty" },
      { status: 400 },
    );
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email)
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  const snippet = await prisma.snippet.findUnique({
    where: {
      id: snippetId,
      vaultId,
      user: {
        email: session.user.email,
      },
    },
  });
  if (!snippet)
    return Response.json({ error: "Snippet not found" }, { status: 404 });
  return Response.json({ snippet });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { vaultId: string; snippetId: string } },
) {
  const { vaultId, snippetId } = params;
  if (!vaultId || vaultId.trim() === "")
    return Response.json({ error: "Vault id can't be empty" }, { status: 400 });
  if (!snippetId || snippetId.trim() === "")
    return Response.json(
      { error: "Snippet id can't be empty" },
      { status: 400 },
    );
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email)
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const { title, language, content, isLocked, isShared, isFavorite } = body;
  if (title !== undefined && typeof title !== "string")
    return Response.json({ error: "Title can't be empty" }, { status: 400 });
  if (language !== undefined && typeof language !== "string")
    return Response.json({ error: "Language can't be empty" }, { status: 400 });
  if (content !== undefined && typeof content !== "string")
    return Response.json({ error: "Content can't be empty" }, { status: 400 });
  if (isLocked !== undefined && typeof isLocked !== "boolean")
    return Response.json(
      { error: "isLocked must be a boolean" },
      { status: 400 },
    );
  if (isFavorite !== undefined && typeof isFavorite !== "boolean")
    return Response.json(
      { error: "isFavorite must be a boolean" },
      { status: 400 },
    );
  if (isShared !== undefined && typeof isShared !== "boolean")
    return Response.json(
      { error: "isShared must be a boolean" },
      { status: 400 },
    );
  const fieldsToUpdate: {
    title?: string;
    language?: string;
    content?: string;
    isLocked?: boolean;
    isShared?: boolean;
    isFavorite?: boolean;
    favoritedBy?: {
      connect?: { email: string };
      disconnect?: { email: string };
    };
  } = {};
  if (title && title.trim() !== "") fieldsToUpdate.title = title.trim();
  if (language && language.trim() !== "")
    fieldsToUpdate.language = language.trim();
  if (content) fieldsToUpdate.content = content;
  if (typeof isLocked === "boolean") fieldsToUpdate.isLocked = isLocked;
  if (typeof isShared === "boolean") fieldsToUpdate.isShared = isShared;
  if (typeof isFavorite === "boolean") {
    fieldsToUpdate.isFavorite = isFavorite;
    fieldsToUpdate.favoritedBy = isFavorite
      ? { connect: { email: session.user.email } }
      : { disconnect: { email: session.user.email } };
  }
  try {
    const updatedSnippet = await prisma.snippet.update({
      where: {
        id: snippetId,
        vaultId,
        user: {
          email: session.user.email,
        },
      },
      data: fieldsToUpdate,
    });
    if (!updatedSnippet)
      return Response.json(
        { error: "Failed to update snippet" },
        { status: 500 },
      );
    return Response.json({ updatedSnippet });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    )
      return Response.json({ error: "Snippet not found" }, { status: 404 });
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { vaultId: string; snippetId: string } },
) {
  // Route for deleting a snippet
  const { vaultId, snippetId } = params;
  if (!vaultId || vaultId.trim() === "")
    return Response.json({ error: "Vault id can't be empty" }, { status: 400 });
  if (!snippetId || snippetId.trim() === "")
    return Response.json(
      { error: "Snippet id can't be empty" },
      { status: 400 },
    );
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email)
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const deletedSnippet = await prisma.snippet.delete({
      where: {
        id: snippetId,
        vaultId,
        user: {
          email: session.user.email,
        },
      },
    });
    if (!deletedSnippet)
      return Response.json(
        { error: "Failed to delete snippet" },
        { status: 500 },
      );
    return Response.json({ deletedSnippetId: deletedSnippet.id });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    )
      return Response.json({ error: "Snippet not found" }, { status: 404 });
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
