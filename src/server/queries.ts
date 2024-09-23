import "server-only";
import { db } from "@/lib/db";

export async function getBrands({
  size = 4,
  search,
}: {
  size?: number;
  search?: string;
}) {
  const brands = await db.brands.getMany({
    pagination: {
      size,
    },
    filter: {
      $all: {
        name: {
          $iContains: search,
        },
      },
    },
  });

  return brands;
}

export async function getBrand({ id }: { id: string }) {
  const brand = await db.brands.read(id, ["*", "location.*"]);
  return brand;
}

export async function getBrandMarkSources({ id }: { id: string }) {
  const brand = await db.mark_sources.getMany({
    filter: {
      "brand.id": id,
    },
  });
  return brand;
}
