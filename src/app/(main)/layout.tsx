import type { Metadata } from "next";

import { BottomNav } from "@/components/layout/bottom-nav";
import { MainHeader } from "@/components/layout/main-header";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Procoyte | Cek Status Boikot Produk dengan Mudah",
  description:
    "Cek status boikot produk secara cepat dan mudah. Masukkan tautan atau nama produk untuk melihat apakah masuk daftar boikot terbaru. Dukung kampanye global dan temukan alternatif yang direkomendasikan.",
};

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
          "py-12 px-4 md:py-[84px] xs:px-6 sm:px-10",
          "relative w-full text-center md:w-[560px] lg:w-[768px] xl:w-[672px]",
        )}
      >
        {children}
      </main>
      <BottomNav />
    </>
  );
}
