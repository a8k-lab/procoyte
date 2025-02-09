import { dbKys } from "@/lib/db";

type DedupedBrand = {
  id: string;
  name: string;
  price: number;
  tag: string;
  boosted: boolean;
  imageUrl: string;
  location: string;
  tags: {
    tag_id: string;
    tag_name: string;
  }[];
};
export async function GET(req: Request) {
  // brands_tags as junction table
  const url = new URLSearchParams(req.url);
  const unmarkedOnly = url.get("unmarked_only") === "true";
  let brandQuery = dbKys
    .selectFrom("brands")
    .innerJoin("brands_tags", "brands.id", "brands_tags.brand")
    .innerJoin("tags", "tags.id", "brands_tags.tag")
    // add location
    .leftJoin("locations", "locations.id", "brands.location")
    .select([
      "brands.id as brand_id",
      "brands.name as brand_name",
      "tags.id as tag_id",
      "tags.name as tag_name",
      "price",
      "brands.boosted as boosted",
      "brands.imageUrl",
      "locations.name as location",
      "brands.imageUrl as imageUrl",
    ])
    .limit(1000);

  if (unmarkedOnly) {
    brandQuery = brandQuery.where("brands.marked", "==", 0);
  }

  const brands = await brandQuery.execute();
  const dedupedBrands = brands?.reduce((acc, brand) => {
    const existingBrand = acc.find(b => b.id === brand.brand_id);
    if (existingBrand) {
      existingBrand.tag += `,${brand.tag_name}`;
      if (brand.tag_id)
        existingBrand.tags.push({
          tag_id: brand.tag_id ?? "",
          tag_name: brand.tag_name ?? "",
        });
    } else {
      acc.push({
        id: brand.brand_id,
        name: brand.brand_name ?? "",
        price: brand.price || 0,
        tag: brand.tag_name || "",
        boosted: brand.boosted || false,
        imageUrl: brand.imageUrl || "",
        location: brand.location || "",
        tags: brand.tag_id
          ? [
              {
                tag_id: brand.tag_id ?? "",
                tag_name: brand.tag_name ?? "",
              },
            ]
          : [],
      });
    }
    return acc;
  }, [] as DedupedBrand[]);
  return Response.json(dedupedBrands);
}
