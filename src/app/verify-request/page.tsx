import LogoNoText from "@/components/LogoNoText";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Email Verification Sent | Code Crafter",
  description: "Please check your email to complete the verification process.",
};

export default function VerifyRequestPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="w-11/12 rounded-lg px-4 py-8 text-center text-black shadow sm:mx-auto sm:px-10 md:max-w-md dark:text-white">
        <LogoNoText />
        <h1 className="mb-6 text-center text-3xl font-semibold">
          Verify Request
        </h1>
        <p className="mb-4 text-center text-sm">
          A sign in link has been sent to your email address.
        </p>
        <p className="mb-4 text-center text-sm">
          Please check your email and follow the instructions to complete the
          verification process.
        </p>
        <Link
          href="/signin"
          className="block w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-95"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
