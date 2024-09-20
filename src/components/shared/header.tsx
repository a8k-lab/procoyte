import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AlignJustify, BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Header = () => {
  return (
    <header
      className={cn(
        "bg-background fixed top-0 inset-x-0 z-10",
        "flex items-center justify-between gap-4 border-b border-muted",
        "py-2 sm:py-4 px-4 xs:px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20",
      )}
    >
      <nav className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-3 py-2">
          <Image
            src="/images/logo.svg"
            alt="Procoyte Logo"
            width={20}
            height={23}
          />
          <h1 className="font-medium">Procoyte</h1>
        </Link>

        <ul className="hidden gap-5 text-sm md:flex lg:gap-8">
          {navLinks.map(nav => (
            <li key={nav.name}>
              <Link href={nav.href} aria-label={nav.name}>
                {nav.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton>
            <Button>
              <BadgeCheck width={16} height={16} />
              Sign in
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>

        <button type="button" className="block md:hidden">
          <AlignJustify />
        </button>
      </div>
    </header>
  );
};
