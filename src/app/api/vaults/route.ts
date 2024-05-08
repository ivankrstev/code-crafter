import authOptions from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email)
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  const email = session.user?.email;
  const user = await prisma.user.findUnique({
    where: { email },
    include: { vaults: true },
  });
  return Response.json({ vaults: user?.vaults });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email)
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const { name } = body;
  if (!name || name.trim() === "")
    return Response.json({ error: "Name is required" }, { status: 400 });
  const newVault = await prisma.vault.create({
    data: {
      name: name.trim(),
      user: {
        connect: { email: session.user.email },
      },
    },
  });
  return Response.json({ newVault });
}
