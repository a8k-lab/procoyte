import "server-only";
import { db } from "@/lib/db";
import type { BrandsRecord, MarkSourcesRecord, TagsRecord } from "@/xata";
import type {
  EditableData,
  Identifiable,
  OffsetNavigationOptions,
} from "@xata.io/client";

export async function getBrands({
  size = 4,
  search,
  isMarked,
  offset,
}: {
  search?: string;
  isMarked?: boolean;
} & OffsetNavigationOptions = {}) {
  // biome-ignore lint:
  const filter: any = {};

  if (search) {
    filter.name = { $iContains: search };
  }
  if (isMarked !== undefined) {
    filter.marked = isMarked ? 1 : 0;
  }

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
      filter,
      sort: {
        "xata.createdAt": "desc",
      },
    });

  return JSON.parse(JSON.stringify(brands)) as Awaited<BrandsRecord[]>;
}

export async function getBrand({ id }: { id: string }) {
  const brand = await db.brands.read(id, ["*", "location.*", "owned_by.*"]);
  return brand as Awaited<BrandsRecord>;
}

export async function getBrandMarkSources({ id }: { id: string }) {
  const brand = await db.mark_sources.getMany({
    filter: {
      "brand.id": id,
    },
  });
  return brand as Awaited<MarkSourcesRecord[]>;
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
  return tag as Awaited<TagsRecord>;
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

export async function getTags({
  size = 10,
  search,
}: {
  size?: number;
  search?: string;
}) {
  const tags = await db.tags.getMany({
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

  return JSON.parse(JSON.stringify(tags)) as Awaited<
    ReturnType<typeof db.tags.getMany>
  >;
}

export async function postLocation({
  name,
}: {
  name: string;
}) {
  const location = await db.locations.create({
    name,
  });
  return location;
}

export async function replaceTags({
  brandId,
  tagIds,
}: {
  brandId: string;
  tagIds: string[];
}) {
  const tagsWithMatchingBrandId = await db.brands_tags.getAll({
    filter: {
      brand: {
        id: brandId,
      },
      tag: {
        id: {
          $any: tagIds,
        },
      },
    },
  });

  const tagsToDelete = tagsWithMatchingBrandId.filter(
    tag => !tagIds.includes(tag?.tag?.id ?? ""),
  );

  console.log(tagsToDelete, tagsWithMatchingBrandId, brandId);

  await db.brands_tags.delete(tagsToDelete);

  const tagsToCreate = tagIds.filter(
    tagId => !tagsWithMatchingBrandId.find(tag => tag.tag?.id === tagId),
  );

  console.log(tagsToCreate, tagsWithMatchingBrandId, brandId);

  await db.brands_tags.create(
    tagsToCreate.map(tagId => ({
      brand: {
        id: brandId,
      },
      tag: {
        id: tagId,
      },
    })),
  );
}

export async function getBrandTags({
  id,
}: {
  id: string;
}) {
  const tags = await db.brands_tags.select(["id", "brand.*", "tag.*"]).getAll({
    filter: {
      brand: {
        id,
      },
    },
  });

  return JSON.parse(JSON.stringify(tags)) as typeof tags;
}

export function getProductsByBrandId(id: string) {
  return db.products.select(["*", "brand.*"]).getAll({
    filter: {
      brand: {
        id,
      },
    },
  });
}
