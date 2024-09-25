import { getBrands } from "@/server/queries";

export default async function AdminHome() {
  const brands = await getBrands({ size: Number.MAX_SAFE_INTEGER });

  const uniqueTags: { id: string; name: string }[] = brands.reduce(
    (acc, brand) => {
      if (!brand.tag) return acc;
      const tags = brand.tag.split(",").map(tag => tag.trim());
      for (const tag of tags) {
        const existingTag = acc.find(t => t.name === tag);
        if (!existingTag) {
          acc.push({ id: brand.id, name: tag });
        }
      }
      return acc;
    },
    [] as { id: string; name: string }[],
  );

  return (
    <>
      {uniqueTags.map(tag => {
        return <div key={tag.id}>{tag.name}</div>;
      })}
    </>
  );
}
