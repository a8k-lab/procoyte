import { Icon } from "@iconify/react";
import type { Metadata } from "next";
import Link from "next/link";

import BrandCard from "@/components/shared/card/brand";
import { NewsCard } from "@/components/shared/card/news";
import { getBrands } from "@/server/queries";

export const metadata: Metadata = {
  title: "Berita",
};

export default function NewsPage() {
  return (
    <>
      <section>
        <div className="flex items-center justify-center gap-1.5">
          <Icon icon="streamline:star-2-solid" />
          <h1 className="font-semibold text-lg">Berita Update</h1>
        </div>
        <p className="mt-2.5 text-muted-foreground text-sm text-balance">
          Berita terkini brand/produk diboikot, serta berita terkait bentuk
          dukungan
        </p>
      </section>

      <NewBrandsToBoycott />

      <TodayNews />
    </>
  );
}

const NewBrandsToBoycott = async () => {
  const brands = await getBrands({ size: 2 });
  return (
    <section className="mt-4 text-left">
      <h1 className="text-lg font-semibold">Baru Diboikot</h1>
      <p className="text-sm">Brand baru masuk ke list boikot</p>

      <div className="mt-3 grid grid-cols-2 gap-3">
        {brands.map(brand => (
          <Link key={brand.id} href={`/brands/${brand.id}`}>
            <BrandCard
              name={brand.name}
              description={brand.tag?.name ?? "-"}
              imageUrl={brand.imageUrl}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

const TodayNews = () => {
  return (
    <section className="mt-4 text-left">
      <h1 className="text-lg font-semibold">Berita Hari Ini</h1>

      <div className="mt-3 flex flex-col gap-3">
        <Link href="#">
          <NewsCard
            title="Boikot Unilever !?"
            description="Unilever secara terbuka menegaskan dukungannya terhadap Israel"
            imageUrl="/images/logo.svg"
            date="17 Agustus 2024"
          />
        </Link>
        <Link href="#">
          <NewsCard
            title="Boikot Unilever !?"
            description="Unilever secara terbuka menegaskan dukungannya terhadap Israel"
            imageUrl="/images/logo.svg"
            date="17 Agustus 2024"
          />
        </Link>
      </div>
    </section>
  );
};
