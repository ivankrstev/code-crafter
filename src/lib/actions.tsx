"use server";
import { getServerSession } from "next-auth";
import { encode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleNameUpdate(formData: FormData) {
  const name = formData.get("name") as string;
  if (!name || name.trim() === "") return;
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email)
    return redirect("/signin");
  try {
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: { name: name.trim() },
    });
    // Generate jwt token with the updated user data
    const token = await encode({
      token: {
        ...session.user,
        name: updatedUser.name,
        image: updatedUser.image || null,
      },
      secret: process.env.NEXTAUTH_SECRET!,
      maxAge: 2592000, // 30 days
    });
    const cookieStore = cookies();
    cookieStore.set("next-auth.session-token", token, {
      httpOnly: true,
    });
  } catch (error) {
    throw new Error("An unexpected error occurred");
  }
}
