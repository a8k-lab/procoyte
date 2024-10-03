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

      <Tabs defaultValue="product" className="mt-3">
        <TabsList className="w-full bg-muted">
          <TabsTrigger value="product" className="w-1/2">
            Produk
          </TabsTrigger>
          <TabsTrigger value="brand" className="w-1/2">
            Brand
          </TabsTrigger>
        </TabsList>

        <Input
          suffixIcon={<Icon icon="carbon:search" className="size-4" />}
          placeholder="Cari di Procoyte store"
          className="my-3"
        />

        <TabsContent value="product">
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
        </TabsContent>
        <TabsContent value="brand">
          <section>
            <h1 className="text-muted-foreground">Brand tab here</h1>
          </section>
        </TabsContent>
      </Tabs>
    </>
  );
}
