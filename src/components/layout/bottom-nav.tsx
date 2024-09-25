"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { bottomNavLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

export const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed bottom-0 inset-x-0 z-20 md:hidden",
        "bg-white p-4 border-t border-input",
      )}
    >
      <ul className="grid grid-cols-5">
        {bottomNavLinks.map(nav => (
          <li key={nav.name}>
            <Link
              href={nav.href}
              aria-label={nav.name}
              className={cn(
                "flex flex-col items-center justify-center text-xs text-center",
                pathname === nav.href
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            >
              <Icon icon={nav.icon} className="size-6" />
              <span>{nav.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
