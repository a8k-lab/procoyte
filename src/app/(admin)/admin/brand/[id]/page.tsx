import BrandFormPage from "@/components/form/Brand/page";
import { getBrand } from "@/server/queries";

export default async function AdminBrandPage({
  params,
}: {
  params: { id: string };
}) {
  const brand = await getBrand({ id: params.id });
  return (
    <BrandFormPage
      defaultValues={{
        imageUrl: brand?.imageUrl || undefined,
        name: brand?.name || undefined,
        price: brand?.price || undefined,
        marked: brand?.marked || undefined,
        location: brand?.location?.id,
        markReason: brand?.mark_reason || undefined,
        ownedBy: brand?.owned_by?.id,
      }}
    />
  );
}
