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
  const brand = await db.brands.getFirstOrThrow({
    filter: {
      id,
    },
  });
  return brand;
}
