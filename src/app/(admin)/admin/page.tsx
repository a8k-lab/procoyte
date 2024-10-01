import BrandTable from "@/components/table/brand";

import { getBrands } from "@/server/queries";

export default async function AdminHome({
  searchParams,
}: {
  searchParams: {
    size?: string;
    search?: string;
    page?: string;
  };
}) {
  const { page = "0", size = "10", search = "" } = searchParams;

  const brands = await getBrands({
    offset: (+page - 1) * +size,
    search: search,
    size: +size,
  });

  return (
    <div className="bg-white rounded-lg border border-border p-4 text-left">
      <BrandTable brands={brands} />
    </div>
  );
}
