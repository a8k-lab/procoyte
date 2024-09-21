import { BadgeCheck } from "lucide-react";
import Image from "next/image";

import { TextSeparator } from "@/components/shared/text-separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <>
      <div
        className={cn(
          "inline-flex items-center gap-1.5",
          "py-2 px-4 rounded-full border border-secondary",
          "font-poppins font-bold text-secondary text-xs",
        )}
      >
        <BadgeCheck />
        Trusted Boycott Checker
      </div>

      <section className="mt-6 text-balance">
        <h1 className="font-bold text-4xl lg:font-extrabold lg:text-5xl">
          Cek Status Boikot Produk dengan Mudah
        </h1>
        <p className="mt-4 text-sm text-muted-foreground lg:text-base">
          Masukkan tautan atau nama produk untuk mengetahui apakah produk
          tersebut termasuk dalam daftar boikot terbaru. Temukan produk
          alternatif yang direkomendasikan dan ambil peran dalam mendukung
          kampanye global.
        </p>
      </section>

      <section className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
        <div className="flex">
          <Image
            src="/images/avatar-1.webp"
            alt="Avatar"
            width={40}
            height={40}
            className="z-[3] rounded-full border-2 border-white"
          />
          <Image
            src="/images/avatar-2.webp"
            alt="Avatar 2"
            width={40}
            height={40}
            className="z-[2] -ml-3 rounded-full border-2 border-white"
          />
          <Image
            src="/images/avatar-3.webp"
            alt="Avatar 3"
            width={40}
            height={40}
            className="-ml-3 rounded-full border-2 border-white"
          />
        </div>
        <h1 className="font-semibold text-sm text-balance">
          Bergabung dengan 289,124 pendukung yang lain
        </h1>
      </section>

      <section className="mt-6 flex flex-col items-center justify-center gap-4 w-full sm:flex-row md:mt-8">
        <Input
          placeholder="Masukkan nama, link, brand"
          className="w-full sm:w-[320px]"
        />

        <div className="flex flex-col items-stretch justify-stretch gap-2 w-full sm:flex-row sm:w-auto">
          <Button>
            <BadgeCheck width={16} height={16} /> Cari
          </Button>

          <TextSeparator>atau</TextSeparator>

          <Button variant="outline">
            <BadgeCheck width={16} height={16} /> Scan QR
          </Button>
        </div>
      </section>
    </>
  );
}
