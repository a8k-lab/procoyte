import { Icon } from "@iconify/react";
import type { Metadata } from "next";
import Link from "next/link";

import { BrandStoreCard } from "@/components/shared/card/brand";
import { ProductCard } from "@/components/shared/card/product";
import { SearchInput } from "@/components/shared/search-input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBrands } from "@/server/queries";
import type { BrandsRecord } from "@/xata";

export const metadata: Metadata = {
  title: "Store",
};

type StorePageProps = {
  searchParams: {
    q: string;
  };
};

export default async function StorePage({ searchParams }: StorePageProps) {
  const brands = await getBrands({
    size: 8,
    isMarked: false,
    search: searchParams?.q || "",
  });
  const searchedBrands = searchParams.q || "";

  return (
    <>
      <section>
        <div className="flex items-center justify-center gap-1.5">
          <Icon icon="streamline:star-2-solid" />
          <h1 className="font-semibold text-lg">Procoyte Store</h1>
        </div>
        <p className="mt-2.5 text-muted-foreground text-sm text-balance">
          Produk dan Brand alternatif non boikot yang bisa kamu coba
        </p>
      </section>

      <Tabs defaultValue="products" className="mt-3">
        <TabsList className="w-full bg-muted">
          <TabsTrigger value="products" className="w-1/2">
            Produk
          </TabsTrigger>
          <TabsTrigger value="brands" className="w-1/2">
            Brand
          </TabsTrigger>
        </TabsList>

        <SearchInput placeholder="Cari di Procoyte store" />

        <TabsContent value="products">
          <ProductsTab />
        </TabsContent>
        <TabsContent value="brands">
          {searchedBrands.length > 0 && brands.length < 1 ? (
            <NotFound keyword={searchedBrands} />
          ) : (
            <BrandsTab brands={brands} />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}

const NotFound = ({ keyword }: { keyword: string }) => {
  return (
    <section className="mt-8 text-muted-foreground text-balance">
      <p>Tidak ditemukan pencarian untuk "{keyword}"</p>
    </section>
  );
};

const ProductsTab = () => {
  return (
    <section className="grid grid-cols-2 gap-1">
      <ProductCard
        name="Total Care Mouthwash C."
        imageSrc="/images/logo.svg"
        price={1200000}
        rating={4.9}
        merchant="shopee"
      />
      <ProductCard
        name="Total Care Mouthwash C."
        imageSrc="/images/logo.svg"
        price={1200000}
        rating={4.7}
        merchant="tokopedia"
      />
    </section>
  );
};

const BrandsTab = ({ brands }: { brands: BrandsRecord[] }) => {
  return (
    <section className="grid grid-cols-1 gap-6">
      {brands.map(brand => (
        <Link key={brand.id} href={`/brands/${brand.id}`}>
          <BrandStoreCard {...brand} />
        </Link>
      ))}
    </section>
  );
};
