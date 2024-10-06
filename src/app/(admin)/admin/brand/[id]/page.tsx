import BrandFormPage from "@/components/form/Brand/page";
import { getBrand } from "@/server/queries";

export default async function AdminBrandPage({
  params,
}: {
  params: { id: string };
}) {
  const brand = await getBrand({ id: params.id });
  return (
    <div className="p-4 bg-white rounded text-left">
      <BrandFormPage
        edit
        defaultValues={{
          imageUrl: brand?.imageUrl || undefined,
          name: brand?.name || undefined,
          price: brand?.price || undefined,
          marked: brand?.marked ? (`${brand.marked}` as "0" | "1") : undefined,
          location: {
            value: brand?.location?.id || "",
            label: brand?.location?.name || "",
          },
          markReason: brand?.mark_reason || undefined,
          ownedBy: {
            value: brand?.owned_by?.id || "",
            label: brand?.owned_by?.name || "",
          },
        }}
      />
    </div>
  );
}
