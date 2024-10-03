import { Icon } from "@iconify/react";

import { ProductCard } from "@/components/shared/card/product";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function StorePage() {
  return (
    <>
      <title>Procoyte | Store</title>

      <section>
        <div className="flex items-center justify-center gap-1.5">
          <Icon icon="streamline:star-2-solid" />
          <h1 className="font-semibold text-lg">Procoyte Store</h1>
        </div>
        <p className="mt-2.5 text-muted-foreground text-sm text-balance">
          Produk dan Brand alternatif non boikot yang bisa kamu coba
        </p>
      </section>

      <section className="mt-3">
        <Tabs defaultValue="product">
          <TabsList className="w-full bg-muted">
            <TabsTrigger value="product" className="w-1/2">
              Produk
            </TabsTrigger>
            <TabsTrigger value="brand" className="w-1/2">
              Brand
            </TabsTrigger>
          </TabsList>
          <TabsContent value="product">
            <Input
              suffixIcon={<Icon icon="carbon:search" className="w-4 h-4" />}
              placeholder="Cari di Procoyte store"
            />
          </TabsContent>
          <TabsContent value="brand">
            <Input
              suffixIcon={<Icon icon="carbon:search" className="w-4 h-4" />}
              placeholder="Cari di Procoyte store"
            />
          </TabsContent>
        </Tabs>
      </section>

      <section className="mt-3 grid grid-cols-2 gap-1">
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
    </>
  );
}
