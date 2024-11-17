import { handleNameUpdate } from "@/lib/actions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function UpdateNamePage() {
  const session = await getServerSession();
  if (!session || !session.user) redirect("/signin"); // Redirect if not logged in
  if (session.user.name) redirect("/snipboard"); // Redirect if name is already set

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        className="w-96 w-full max-w-md rounded-lg bg-form p-8 shadow-xl"
        action={handleNameUpdate}
        method="POST"
      >
        <h2 className="mb-4 text-center text-xl font-bold">Enter Your Name</h2>
        <div className="mb-4">
          <label className="text-sm font-medium" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-2 w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm outline-0 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition-all hover:bg-indigo-500 focus:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-95"
          >
            Continue
          </button>
        </div>
        <div className="mt-2 flex items-start rounded-md p-3 pl-0 text-sm">
          <Image
            className="filter-black dark:filter-white me-3 mt-[2px]"
            src="/icons/info_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
            alt="Info icon"
            width={20}
            height={20}
          />
          <p className="text-cente text-sm opacity-70">
            You must provide your name to proceed further and access the
            dashboard.
          </p>
        </div>
      </form>
    </div>
  );
}
