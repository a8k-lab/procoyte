import { Icon } from "@iconify/react";
import type { Metadata } from "next";
import Link from "next/link";

import BrandCard from "@/components/shared/card/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getBrands } from "@/server/queries";

export const metadata: Metadata = {
  title: "Produk & Brand",
};

export default function ExplorePage() {
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

      <Input
        suffixIcon={<Icon icon="carbon:search" className="size-4" />}
        placeholder="Masukkan nama brand"
        className="mt-3"
      />

      <BrandsSearch />
    </>
  );
}

const BrandsSearch = async () => {
  const brands = await getBrands({ size: 4 });
  return (
    <section className="mt-3 grid grid-cols-2 gap-3">
      {brands.map(brand => (
        <Link key={brand.id} href={`/brands/${brand.id}`}>
          <BrandCard
            name={brand.name}
            description={brand.tag}
            imageUrl={brand.imageUrl}
          />
        </Link>
      ))}
    </section>
  );
};

const BrandNotRegistered = () => {
  return (
    <section className="mt-3 p-4 block border border-border rounded-md text-center bg-white">
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
