import { getBrand, getBrandMarkSources } from "@/server/queries";
import { Icon } from "@iconify/react";
import { cx } from "class-variance-authority";
import sanitizeHtml from "sanitize-html";
import Image from "next/image";
import RouterButton from "@/components/shared/router-button";

export default async function BrandPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const brand = await getBrand({ id });
  return (
    <div>
      <Header />

      <Content brand={brand} />
    </div>
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
      className={cx(
        brand?.marked ? "border-error" : "border-secondary",
        "border rounded-md border-border p-4 text-left bg-white",
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
            </div>
          </div>
          <Image
            src={"/images/boikot-stamp.png"}
            alt="boikot!"
            width={48}
            height={48}
            className="rounded-md"
          />
        </div>
        <p
          className="mb-4"
          // biome-ignore lint: This is a sanitized string
          dangerouslySetInnerHTML={{
            __html: brand?.mark_reason ? sanitizeHtml(brand?.mark_reason) : "-",
          }}
        />
        <div>
          <h2 className="text-sm font-semibold text-text-primary">Source:</h2>
          <div>
            {markedSources.map((source, index) => (
              <div
                key={source.id}
                className="flex gap-2 mb-2 text-sm font-bold text-text-text-primary"
              >
                {index + 1}.
                <a href={source.url ?? "-"} target="_blank" rel="noreferrer">
                  <p className="text-sm font-bold text-text-text-primary underline">
                    {source.name}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
