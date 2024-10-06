"use client";

import { usePathname } from "next/navigation";

import { BottomNav } from "@/components/layout/bottom-nav";
import { MainHeader } from "@/components/layout/main-header";
import { BackgroundBlur } from "@/components/shared/background-blur";
import { cn } from "@/lib/utils";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <>
      {isHomePage && <BackgroundBlur />}
      <MainHeader />
      <main
        className={cn(
          "mt-[56px] mx-auto sm:mt-[72px]",
          "px-4 pb-[108px] md:pb-9 xs:px-6 sm:px-10",
          isHomePage ? "pt-12 md:pt-[84px]" : "pt-6 md:pt-14",
          "relative w-full text-center md:w-[560px] lg:w-[768px] xl:w-[672px]",
        )}
      >
        {children}
      </main>
      <BottomNav />
    </>
  );
}
