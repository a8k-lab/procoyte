import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") || "";
  const brand = await db.brands.read(id, ["*"]);

  const brandTags = await db.brands_tags.select(["tag.name", "tag.id"]).getAll({
    filter: {
      brand: {
        id,
      },
    },
  });

  const newBrand = {
    ...brand,
    tags: brandTags.map(tag => ({
      id: tag.tag?.id,
      tag: tag.tag?.name,
    })),
    tag: brandTags.map(tag => tag.tag?.name).join(","),
  };
  return Response.json(newBrand);
}
