import { getBrand } from "@/server/queries";

export default async function BrandPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const brand = await getBrand({ id });
  return <div>{brand.name}</div>;
}
