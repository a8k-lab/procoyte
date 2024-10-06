"use server";
import {
  type PostBrandParams,
  getBrands,
  getLocations,
  postBrand,
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

export async function postBrandAction({
  name,
  price,
  marked,
  imageUrl,
  location,
  mark_reason,
  owned_by,
}: PostBrandParams) {
  return postBrand({
    name,
    price,
    marked,
    imageUrl,
    location,
    mark_reason,
    owned_by,
  });
}
