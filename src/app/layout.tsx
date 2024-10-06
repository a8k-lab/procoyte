import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";
import { BackgroundBlur } from "@/components/shared/background-blur";
import { Toaster } from "@/components/ui/toaster";

export const runtime = "edge";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${poppins.variable} ${inter.variable} `}>
        <head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#18181b" />
          <meta name="theme-color" content="#ffffff" />
        </head>
        <body className="relative bg-[#F4F4F5]">
          <NextTopLoader color="#1A96F7" height={4} />
          <BackgroundBlur />
          <Toaster />

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
