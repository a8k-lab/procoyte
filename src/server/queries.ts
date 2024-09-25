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

export async function postTag({ name }: { name: string }) {
  const tag = await db.tags.create({
    name,
  });
  return tag;
}

export async function getTagByName({ name }: { name: string }) {
  const tag = await db.tags.getFirstOrThrow({
    filter: {
      name,
    },
  });
  return tag;
}

export async function postBrandTag({
  brandId,
  tagId,
}: { brandId: string; tagId: string }) {
  const brandTag = await db.brands_tags.create({
    brand: {
      id: brandId,
    },
    tag: {
      id: tagId,
    },
  });
  return brandTag;
}
