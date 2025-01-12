import Image from "next/image";

export default function LogoNoText() {
  return (
    <Image
      src="/code-crafter-logo.svg"
      alt="Logo"
      className="mx-auto mb-6 h-16 w-auto sm:h-20 md:h-24"
      priority
      width={0}
      height={0}
    />
  );
}
