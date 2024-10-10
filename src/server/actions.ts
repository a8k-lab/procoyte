"use server";
import {
  type PatchBrandParams,
  type PostBrandParams,
  getBrandTags,
  getBrands,
  getLocations,
  getTags,
  patchBrand,
  postBrand,
  postLocation,
  postTag,
  replaceTags,
} from "./queries";

export async function getLocationsAction({
  size = 10,
  search,
}: {
  size?: number;
  search?: string;
}) {
  return getLocations({
    size,
    search,
  });
}

export async function getBrandsAction({
  size = 10,
  search,
}: {
  size?: number;
  search?: string;
}) {
  return getBrands({
    size,
    search,
  });
}

export async function postBrandAction(params: PostBrandParams) {
  return postBrand(params);
}

export async function patchBrandAction(params: PatchBrandParams) {
  return patchBrand(params);
}

export async function getTagsAction({
  size = 10,
  search,
}: {
  size?: number;
  search?: string;
}) {
  return getTags({
    size,
    search,
  });
}

export async function postLocationAction({
  name,
}: {
  name: string;
}) {
  return postLocation({
    name,
  });
}

export async function postTagAction({
  name,
}: {
  name: string;
}) {
  return postTag({
    name,
  });
}

export async function replaceTagsAction({
  brandId,
  tagIds,
}: {
  brandId: string;
  tagIds: string[];
}) {
  return replaceTags({
    brandId,
    tagIds,
  });
}

export async function getBrandTagsAction({
  id,
}: {
  id: string;
}) {
  return getBrandTags({
    id,
  });
}
