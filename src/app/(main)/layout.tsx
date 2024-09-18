import { Header } from "@/components/layout/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Procoyte | Cek Status Boikot Produk dengan Mudah",
  description:
    "Cek status boikot produk secara cepat dan mudah. Masukkan tautan atau nama produk untuk melihat apakah masuk daftar boikot terbaru. Dukung kampanye global dan temukan alternatif yang direkomendasikan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
