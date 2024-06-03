import prisma from "@/lib/prisma";
import sendMagicLinkEmail from "@/lib/sendMagicLinkEmail";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";

const providers = [
  EmailProvider({
    sendVerificationRequest: async ({ identifier: email, url }) => {
      await sendMagicLinkEmail(url, email);
    },
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
];

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma) as Adapter,
  providers,
  pages: {
    signIn: "/signin",
    verifyRequest: "/verify-request",
  },
};

export default authOptions;
