import Image from "next/image";

import type { BrandsRecord } from "@/xata";

type BrandCardProps = Partial<
  BrandsRecord & {
    description: string;
  }
>;

export const BrandCard = ({ name, description, imageUrl }: BrandCardProps) => {
  return (
    <article className="border rounded-md border-border p-4 text-left bg-white h-full">
      <Image
        src={imageUrl || "/images/logo.svg"}
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
    </article>
  );
};

export const BrandStoreCard = ({ name, imageUrl }: BrandsRecord) => {
  return (
    <article className="group">
      <div className="w-full h-40 bg-white overflow-hidden border rounded-xl">
        <Image
          src={imageUrl ?? "/images/logo.svg"}
          alt={name ?? "Brand"}
          width={160}
          height={160}
          className="w-auto h-full mx-auto transition-transform group-hover:scale-110"
        />
      </div>
      <div className="mt-4 text-left space-y-1">
        <h1 className="font-semibold">
          {name}{" "}
          <span className="text-xs text-muted-foreground">(12 products)</span>
        </h1>
        <p className="font-medium text-xs text-muted-foreground">
          Range from Rp. 10.000,00 - Rp. 500.000,00
        </p>
      </div>
    </article>
  );
};
