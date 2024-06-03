"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface TypeInfo {
  icon: JSX.Element;
  text: string;
}

export default function SocialSigninButton({ type }: { type: string }) {
  const signInWithExternalProvider = async (provider: string) =>
    await signIn(provider, { callbackUrl: "/snipboard" });

  const types: { [key: string]: TypeInfo } = {
    google: {
      icon: (
        <Image
          src="/icons/google.svg"
          alt="Google Icon"
          width={22}
          height={22}
        />
      ),
      text: "Google",
    },
    github: {
      icon: (
        <Image
          src="/icons/github.svg"
          alt="GitHub Icon"
          width={22}
          height={22}
        />
      ),
      text: "GitHub",
    },
  };

  const { icon, text } = types[type];

  return (
    <button
      title={`Sign in with ${text}`}
      onClick={() => signInWithExternalProvider(text.toLowerCase())}
      className="flex flex-grow items-center justify-center gap-2 rounded-md border bg-white px-4 py-2 text-black shadow-md ring-inset hover:bg-gray-100"
    >
      {icon}
      {text}
    </button>
  );
}
