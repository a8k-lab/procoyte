import { BottomNav } from "@/components/layout/bottom-nav";
import { MainHeader } from "@/components/layout/main-header";
import { cn } from "@/lib/utils";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainHeader />
      <main
        className={cn(
          "mt-[56px] mx-auto sm:mt-[72px]",
          "pt-12 px-4 pb-[108px] md:pt-[84px] md:pb-9 xs:px-6 sm:px-10",
          "relative w-full text-center md:w-[560px] lg:w-[768px] xl:w-[672px]",
        )}
      >
        {children}
      </main>
      <BottomNav />
    </>
  );
}
