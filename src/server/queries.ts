import "server-only";
import { db } from "@/lib/db";
import type { OffsetNavigationOptions } from "@xata.io/client";

export async function getBrands({
  size = 4,
  search,
  offset,
}: {
  search?: string;
} & OffsetNavigationOptions = {}) {
  const brands = await db.brands
    .select([
      "id",
      "name",
      "imageUrl",
      "price",
      "marked",
      "owned_by.*",
      "location.*",
    ])
    .getMany({
      pagination: {
        size,
        offset,
      },
      filter: {
        $all: {
          name: {
            $iContains: search,
          },
        },
      },
    });

  return JSON.parse(JSON.stringify(brands)) as Awaited<
    ReturnType<typeof db.brands.getMany>
  >;
}

export async function getBrand({ id }: { id: string }) {
  const brand = await db.brands.read(id, ["*", "location.*", "owned_by.*"]);
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

export async function getLocations({
  size = 10,
  search,
}: {
  size?: number;
  search?: string;
}) {
  const locations = await db.locations.getMany({
    pagination: {
      size: size,
    },
    filter: {
      $all: {
        name: {
          $iContains: search,
        },
      },
    },
  });

  return JSON.parse(JSON.stringify(locations)) as Awaited<
    ReturnType<typeof db.locations.getMany>
  >;
}
