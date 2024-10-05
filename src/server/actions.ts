"use server";
import { getBrands, getLocations } from "./queries";

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
