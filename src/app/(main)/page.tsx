import { Icon } from "@iconify/react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { getBrandRecommendations } from "@/server/api";
import { getBrand, getBrandMarkSources, getBrands } from "@/server/queries";
import type { BrandsRecord, MarkSourcesRecord } from "@/xata";
import MarkResultSection from "./_components/mark-result-section";
import RecommendationsSection from "./_components/recommendations-section";
import SearchSection from "./_components/search-section";

type HomePageProps = {
  searchParams: {
    q: string;
  };
};

export default async function Home({ searchParams: { q } }: HomePageProps) {
  const brands = await getBrands({
    search: q,
    size: 1,
  });

  const [brand, markedSources, brandRecommendations] = await Promise.all([
    q && brands[0]?.id ? getBrand({ id: brands[0].id }) : null,
    q && brands[0]?.id ? getBrandMarkSources({ id: brands[0].id }) : [],
    q && brands[0]?.id
      ? getBrandRecommendations({ id: brands[0].id, limit: 3 })
      : null,
  ]);

  return (
    <>
      <div
        className={cn(
          "inline-flex items-center gap-1.5",
          "py-2 px-4 rounded-full border border-secondary",
          "font-poppins font-bold text-secondary text-xs",
        )}
      >
        <Icon icon="lucide:badge-check" className="size-6" />
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

      <SearchSection />

      <MarkResultSection
        result={brand as BrandsRecord}
        markedSources={markedSources as MarkSourcesRecord[]}
      />

      {/* only show recommendations if the brand is marked */}
      {brand?.marked === 1 && brandRecommendations ? (
        <RecommendationsSection
          recommendations={brandRecommendations?.recommendations}
        />
      ) : null}
    </>
  );
}
