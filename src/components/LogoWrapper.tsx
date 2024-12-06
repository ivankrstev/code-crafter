import Image from "next/image";

export default function LogoWrapper() {
  return (
    <div className="flex md:items-center">
      <Image
        src="/code-crafter-logo.svg"
        alt="Logo"
        className="h-10 w-6 md:h-16 md:w-auto"
        priority
        width={0}
        height={0}
      />
      <p className="ml-2 w-fit whitespace-nowrap text-2xl font-bold">
        Code Crafter
      </p>
    </div>
  );
}
