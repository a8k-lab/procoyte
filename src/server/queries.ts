import "server-only";
import { db } from "@/lib/db";
import type { BrandsRecord } from "@/xata";
import type {
  EditableData,
  Identifiable,
  OffsetNavigationOptions,
} from "@xata.io/client";

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
      "tag.*",
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
      sort: {
        "xata.createdAt": "desc",
      },
    });

  return JSON.parse(JSON.stringify(brands)) as Awaited<BrandsRecord[]>;
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

export type PostBrandParams = Omit<EditableData<BrandsRecord>, "id"> &
  Partial<Identifiable>;

export async function postBrand({
  name,
  price,
  marked,
  imageUrl,
  location,
  mark_reason,
  owned_by,
}: PostBrandParams) {
  const brand = await db.brands.create({
    name,
    price,
    marked,
    imageUrl,
    location,
    mark_reason,
    owned_by,
  });
  return brand;
}

export type PatchBrandParams = Partial<EditableData<BrandsRecord>> &
  Identifiable;

export async function patchBrand({
  id,
  name,
  price,
  marked,
  imageUrl,
  location,
  mark_reason,
  owned_by,
}: PatchBrandParams) {
  const brand = await db.brands.updateOrThrow({
    id,
    name,
    price,
    marked,
    imageUrl,
    location,
    mark_reason,
    owned_by,
  });
  return brand;
}
