import { BrandCard } from "@/components/shared/card/brand";
import { ProductCard } from "@/components/shared/card/product";
import Price from "@/components/shared/price";
import RouterButton from "@/components/shared/router-button";
import { cn } from "@/lib/utils";
import { getBrandRecommendations } from "@/server/api";
import {
  getBrand,
  getBrandMarkSources,
  getProductsByBrandId,
} from "@/server/queries";
import { Icon } from "@iconify/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";

type BrandPageProps = {
  params: { id: string };
};

export async function generateMetadata({
  params: { id },
}: BrandPageProps): Promise<Metadata> {
  const brand = await getBrand({ id });
  return {
    title: brand?.name ?? "Unknown brand",
  };
}

export default async function BrandPage({ params: { id } }: BrandPageProps) {
  const brand = await getBrand({ id });
  return (
    <>
      <Header />
      <Content brand={brand} />
      {brand.marked === 1 ? <Alternative brand={brand} /> : null}
      {brand.marked === 0 ? <ProductList brand={brand} /> : null}
    </>
  );
}

function Header() {
  return (
    <header className="flex justify-between mb-3 h-full">
      <RouterButton variant="ghost" className="bg-white">
        <Icon icon="lucide:chevron-left" className="w-4 h-4" />
        Kembali
      </RouterButton>
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        <span className="texgtg-text-muted-foreground">List Boikot</span>
        <Icon icon="lucide:chevron-right" className="w-4 h-4" />

        <span className="text-text-primary">Detail informasi</span>
      </div>
    </header>
  );
}
async function Content({
  brand,
}: {
  brand: Awaited<ReturnType<typeof getBrand>>;
}) {
  const markedSources = brand?.id
    ? await getBrandMarkSources({ id: brand?.id })
    : [];

  return (
    <div
      className={cn(
        brand?.marked === 1 ? "border-error" : "border-border",
        "border rounded-md  p-4 text-left bg-white",
      )}
    >
      {brand?.marked ? (
        <div className="mb-3">
          <span className="text-error text-xl font-bold">
            Brand ini masuk ke List Boikot!
          </span>
        </div>
      ) : null}

      <article>
        <div className="flex gap-3 justify-between mb-3 items-center">
          <div className="flex gap-3 items-center">
            <Image
              src={brand?.imageUrl ?? "/images/logo.svg"}
              alt={brand?.name ?? ""}
              width={84}
              height={84}
              className="rounded-md"
            />
            <div>
              <h2 className="mt-0.5 text-lg font-semibold text-text-primary">
                {brand?.name ?? "-"}
              </h2>
              <p className="text-xs text-muted-foreground">
                {brand?.location?.name ?? "-"}
              </p>
              <Price price={brand?.price || 0} />
            </div>
          </div>
          {brand?.marked === 1 ? (
            <Image
              src={"/images/boikot-stamp.png"}
              alt="boikot!"
              width={48}
              height={48}
              className="rounded-md"
            />
          ) : null}
        </div>
        {brand?.brand_description ? (
          <div
            className="mb-4 text-sm"
            // biome-ignore lint: This is a sanitized string
            dangerouslySetInnerHTML={{
              __html: brand?.brand_description
                ? sanitizeHtml(brand?.brand_description)
                : "",
            }}
          />
        ) : null}
        {brand?.marked === 1 ? (
          <>
            <div
              className="mb-4 text-sm"
              // biome-ignore lint: This is a sanitized string
              dangerouslySetInnerHTML={{
                __html: brand?.mark_reason
                  ? sanitizeHtml(brand?.mark_reason)
                  : "-",
              }}
            />
            <div>
              <h2 className="text-sm font-semibold text-text-primary">
                Source:
              </h2>
              <div>
                {markedSources.map((source, index) => (
                  <div
                    key={source.id}
                    className="flex gap-2 mb-2 text-sm font-bold text-text-text-primary"
                  >
                    {index + 1}.
                    <a
                      href={source.url ?? "-"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <p className="text-sm font-bold text-text-text-primary underline">
                        {source.name}
                      </p>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </article>
    </div>
  );
}

async function Alternative({
  brand,
}: {
  brand: {
    id: string;
  };
}) {
  const alternativeBrands = await getBrandRecommendations({
    id: brand?.id,

    limit: 6,
  });
  return (
    <section className="mt-8 text-left">
      <div className="flex items-center justify-between gap-2">
        <h1 className="font-semibold text-lg">Brand Alternatif</h1>
      </div>

      <section className="mt-3 grid grid-cols-2 gap-3">
        {alternativeBrands?.recommendations?.map(brand => (
          <Link key={brand.id} href={`/brands/${brand.id}`}>
            <BrandCard
              name={brand.name}
              description={brand?.location || "-"}
              imageUrl={brand.imageUrl}
            />
          </Link>
        ))}
      </section>
    </section>
  );
}

async function ProductList({
  brand,
}: {
  brand: {
    id: string;
  };
}) {
  const products = await getProductsByBrandId(brand?.id);

  return (
    <section className="mt-8 text-left">
      <div className="flex items-center justify-between gap-2">
        <h1 className="font-semibold text-lg">Produk dari Brand</h1>
      </div>
      {products?.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          Tidak ada produk yang ditemukan
        </p>
      ) : null}
      <section className="mt-3 grid grid-cols-2 gap-3">
        {products?.map(product => (
          <a
            key={product.id}
            href={product.url || ""}
            target="_blank"
            rel="noreferrer"
          >
            <ProductCard
              name={product?.name ?? ""}
              imageSrc={product.imageUrl}
              price={product.price || 0}
              // rating={product.rating}
              imageFromOtherSource={!!product.image_from_outsource}
              merchant={"shopee"}
            />
          </a>
        ))}
      </section>
    </section>
  );
}
