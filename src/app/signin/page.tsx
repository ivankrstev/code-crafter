"use client";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { FormEvent, Fragment } from "react";

export default function Login() {
  const submitFormWithEmailSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    await signIn("email", { email, callbackUrl: "/" });
  };

  const signInWithExternalProvider = async (provider: string) =>
    await signIn(provider, { callbackUrl: "/" });

  return (
    <Fragment>
      <Head>
        <title>Sign in | Code Crafter</title>
      </Head>
      <div className="flex h-screen items-center justify-center">
        <div className="w-96 rounded-lg bg-form p-8 shadow-xl">
          <h1 className="mb-6 text-center text-2xl font-semibold">
            Sign in to your account
          </h1>
          <form onSubmit={submitFormWithEmailSignin}>
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
                className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
              <button
                onClick={() => signInWithExternalProvider("google")}
                className="flex flex-grow items-center justify-center gap-2 rounded-md border bg-white px-4 py-2 text-black shadow-md ring-inset hover:bg-gray-100"
              >
                <Image
                  src="/icons/google.svg"
                  alt="Google Icon"
                  width={22}
                  height={22}
                />
                Google
              </button>
              <button
                onClick={() => signInWithExternalProvider("github")}
                className="flex flex-grow items-center justify-center gap-2 rounded-md border bg-white px-4 py-2 text-black shadow-md ring-inset hover:bg-gray-100"
              >
                <Image
                  src="/icons/github.svg"
                  alt="GitHub Icon"
                  width={22}
                  height={22}
                />
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
