"use server";
import { getLocations } from "./queries";

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
