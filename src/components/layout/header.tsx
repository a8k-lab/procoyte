import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-muted px-4 py-2 sm:px-6 sm:py-4">
      <Link href="/" className="flex items-center gap-3 py-2">
        <Image
          src="/images/logo.svg"
          alt="Procoyte Logo"
          width={20}
          height={23}
        />
        <h1 className="font-medium">Procoyte</h1>
      </Link>

      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};
