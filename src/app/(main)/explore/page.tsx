import type { BrandsRecord } from "@/xata";
import { Icon } from "@iconify/react";
import type { Metadata } from "next";
import Link from "next/link";

import BrandCard from "@/components/shared/card/brand";
import { SearchInput } from "@/components/shared/search-input";
import { Button } from "@/components/ui/button";
import { getBrands } from "@/server/queries";

export const metadata: Metadata = {
  title: "Produk & Brand",
};

type ExplorePageProps = {
  searchParams: {
    q: string;
  };
};

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const brands = await getBrands({ size: 4, search: searchParams?.q || "" });
  const searchedBrands = searchParams.q || "";

  return (
    <>
      <section>
        <div className="flex items-center justify-center gap-1.5">
          <Icon icon="streamline:star-2-solid" />
          <h1 className="font-semibold text-lg">List Boikot</h1>
        </div>
        <p className="mt-2.5 text-muted-foreground text-sm text-balance">
          Kami aktif mengupdate informasi daftar produk aktif diboikot, sebagai
          upaya dukungan penuh
        </p>
      </section>

      <BrandNotRegistered />

      <SearchInput placeholder="Masukkan nama brand" />

      {searchedBrands.length > 0 && brands.length < 1 ? (
        <BrandNotFound keyword={searchedBrands} />
      ) : (
        <BrandsSearch brands={brands as BrandsRecord[]} />
      )}
    </>
  );
}

const BrandNotFound = ({ keyword }: { keyword: string }) => {
  return (
    <p className="mt-8 text-muted-foreground">
      Tidak ditemukan brand dengan keyword "{keyword}"
    </p>
  );
};

const BrandsSearch = ({ brands }: { brands: BrandsRecord[] }) => {
  return (
    <section className="mt-3 grid grid-cols-2 gap-3">
      {brands.map(brand => (
        <Link key={brand.id} href={`/brands/${brand.id}`}>
          <BrandCard
            name={brand.name}
            description={"-"}
            imageUrl={brand.imageUrl}
          />
        </Link>
      ))}
    </section>
  );
};

const BrandNotRegistered = () => {
  return (
    <section className="my-3 p-4 block border border-border rounded-md text-center bg-white">
      <h2 className="text-lg font-semibold text-text-primary">
        Produk tidak terdaftar?
      </h2>
      <p className="mt-[2px] text-xs text-muted-foreground">
        Laporkan produk untuk kami analisis lebih dalam
      </p>
      <Button variant="outline" className="mt-3 gap-2 text-error">
        <Icon icon="lucide:badge-check" className="size-4" />
        Laporkan Produk
      </Button>
    </section>
  );
};
