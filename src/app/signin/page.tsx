import SocialSigninButton from "@/components/SocialSigninButton";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Sign in | Code Crafter",
  description: "Sign in to your account to access your snippets and more",
};

export default async function Signin() {
  async function signinUserWithEmail(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    const csrfTokenByFetch = await fetch(
      `${process.env.NEXTAUTH_URL}/api/auth/csrf`,
    );
    const getSetCookie = csrfTokenByFetch.headers.get("set-cookie") || "";
    const { csrfToken } = await csrfTokenByFetch.json();
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/auth/signin/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: getSetCookie,
        },
        body: JSON.stringify({ email, csrfToken, callbackUrl: "/snipboard" }),
      },
    );
    return response.ok
      ? redirect("/verify-request")
      : redirect("/signin?error=email");
  }

  return (
    <Fragment>
      <div className="flex h-screen items-center justify-center">
        <div className="w-96 rounded-lg bg-form p-8 shadow-xl">
          <h1 className="mb-6 text-center text-2xl font-semibold">
            Sign in to your account
          </h1>
          <form action={signinUserWithEmail}>
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                className="mt-2 w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm outline-0 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="mt-5 text-center">
              <button
                type="submit"
                className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition-all hover:bg-indigo-500 focus:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-95"
              >
                Continue
              </button>
            </div>
          </form>
          <div>
            <div className="relative mt-6 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <div className="px-4 text-sm text-gray-500 dark:text-gray-400">
                Or continue with
              </div>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div className="mt-5 flex w-full gap-4 text-sm">
              <SocialSigninButton type="google" />
              <SocialSigninButton type="github" />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
