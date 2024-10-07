import Link from "next/link";

import BrandCard from "@/components/shared/card/brand";
import { getBrands } from "@/server/queries";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { q } = searchParams;
  const brands = await getBrands({
    size: 4,
    search: q ? (q as string) : undefined,
  });
  return (
    <section className="mt-3 grid grid-cols-2 gap-3">
      {brands.map(brand => (
        <Link key={brand.id} href={`/brands/${brand.id}`}>
          <BrandCard
            name={brand.name}
            description={brand.tag?.name ?? "-"}
            imageUrl={brand.imageUrl}
          />
        </Link>
      ))}
    </section>
  );
}
