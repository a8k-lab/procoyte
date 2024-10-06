import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";
import { BackgroundBlur } from "@/components/shared/background-blur";

const poppins = Poppins({
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const runtime = "edge";

export const viewport: Viewport = {
  themeColor: "#fff",
};

export const metadata: Metadata = {
  title: {
    template: "%s | Procoyte",
    default: "Procoyte | Cek Status Boikot Produk dengan Mudah",
  },
  description:
    "Cek status boikot produk secara cepat dan mudah. Masukkan tautan atau nama produk untuk melihat apakah masuk daftar boikot terbaru. Dukung kampanye global dan temukan alternatif yang direkomendasikan.",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "manifest",
      url: "/site.webmanifest",
    },
    {
      rel: "mask-icon",
      url: "/safari-pinned-tab.svg",
      color: "#18181b",
    },
    {
      rel: "shortcut icon",
      url: "/favicon.ico",
      type: "image/x-icon",
    },
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${poppins.variable} ${inter.variable} `}>
        <body className="relative bg-[#F4F4F5]">
          <NextTopLoader color="#1A96F7" height={4} />
          <BackgroundBlur />

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
