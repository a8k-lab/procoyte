import Image from "next/image";

const BrandCard = ({
  name,
  description,
  imageUrl,
}: {
  name?: string | null;
  description?: string | null;
  imageUrl?: string | null;
}) => {
  return (
    <div className="border rounded-md border-border p-4 text-left bg-white h-full">
      <Image
        src={imageUrl ?? "/images/logo.svg"}
        alt={name ?? ""}
        width={48}
        height={48}
        className="rounded-md"
      />

      <h2 className="mt-3 text-lg font-semibold text-text-primary">
        {name ?? "-"}
      </h2>
      <p className="mt-[2px] text-xs text-muted-foreground">
        {description ?? "-"}
      </p>
    </div>
  );
};

export default BrandCard;
