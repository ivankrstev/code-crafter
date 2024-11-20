import Image from "next/image";

export default function LogoWrapper() {
  return (
    <div className="flex items-center">
      <Image
        src="/code-crafter-logo.svg"
        alt="Logo"
        className="h-10 w-auto md:h-16 md:w-auto"
        priority
        width={0}
        height={0}
      />
      <p className="ml-2 text-2xl font-bold">Code Crafter</p>
    </div>
  );
}
