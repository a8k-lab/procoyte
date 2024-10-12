import { Icon } from "@iconify/react";
import Image from "next/image";

import { rupiahFormatter } from "@/lib/utils";

type ProductCardProps = {
  name: string;
  price?: number;
  rating?: number;
  imageSrc: string | null | undefined;
  merchant?: "tokopedia" | "shopee"; // Temporary
};

export const ProductCard = ({
  name,
  price,
  rating = 0,
  imageSrc,
  merchant,
}: ProductCardProps) => {
  return (
    <article className="group bg-white min-w-[165px] h-full overflow-hidden rounded-xl border text-sm text-left font-semibold">
      <div className="h-[140px] w-full relative overflow-hidden">
        <Image
          src={imageSrc || "/images/logo.svg"}
          alt={name}
          className="transition-transform object-cover group-hover:scale-110"
          fill
        />
      </div>

      <div className="flex flex-col gap-2 p-2 h-[calc(100%-140px)] border-t">
        <div className="space-y-1.5 flex-grow">
          {rating ? (
            <div className="flex items-center gap-0.5">
              <Icon
                icon="ph:star-fill"
                width={18}
                className="text-orange-500"
              />
              <span>{rating}</span>
            </div>
          ) : null}
          <h1 className="truncate">{name}</h1>
          {price ? (
            <h2 className="text-xs text-primary">{rupiahFormatter(price)}</h2>
          ) : null}
        </div>

        {merchant ? (
          <Image
            src={`/images/merchants/${merchant}.webp`}
            alt={merchant || "Merchant"}
            width={74}
            height={24}
            className="mt-auto"
          />
        ) : null}
      </div>
    </article>
  );
};
