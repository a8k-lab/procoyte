import Image from "next/image";
import Link from "next/link";

export const AuthHeader = () => {
  return (
    <header className="flex items-center py-[22px] md:justify-center">
      <Link href="/" className="flex items-center gap-3 py-2">
        <Image
          src="/images/logo.svg"
          alt="Procoyte Logo"
          width={20}
          height={23}
        />
        <h1 className="font-medium">Procoyte</h1>
      </Link>
    </header>
  );
};
