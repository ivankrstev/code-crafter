import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import EmailProvider from "next-auth/providers/email";
import sendMagicLinkEmail from "./sendMagicLinkEmail";

const providers = [
  EmailProvider({
    sendVerificationRequest: async ({ identifier: email, url }) => {
      await sendMagicLinkEmail(url, email);
    },
  }),
];

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma) as Adapter,
  providers,
};

export default authOptions;
