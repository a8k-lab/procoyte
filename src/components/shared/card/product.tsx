import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

import { rupiahFormatter } from "@/lib/utils";

type ProductCardProps = {
  name: string;
  price: number;
  rating?: number;
  imageSrc: string;
  merchant: "tokopedia" | "shopee"; // Temporary
};

export const ProductCard = ({
  name,
  price,
  rating = 0,
  imageSrc,
  merchant,
}: ProductCardProps) => {
  return (
    <Link href="#" aria-label={name} className="group">
      <article className="bg-white h-full overflow-hidden rounded-xl border text-sm text-left font-semibold">
        <div className="h-[140px] w-full relative overflow-hidden">
          <Image
            src={imageSrc}
            alt={name}
            className="transition-transform object-cover group-hover:scale-110"
            fill
          />
        </div>

        <div className="flex flex-col gap-2 p-2 h-[calc(100%-140px)] border-t">
          <div className="space-y-1.5 flex-grow">
            <div className="flex items-center gap-0.5">
              <Icon
                icon="ph:star-fill"
                width={18}
                className="text-orange-500"
              />
              <span>{rating}</span>
            </div>
            <h1 className="truncate">{name}</h1>
            <h2 className="text-xs text-primary">{rupiahFormatter(price)}</h2>
          </div>

          <Image
            src={`/images/merchants/${merchant}.webp`}
            alt={merchant}
            width={74}
            height={24}
            className="mt-auto"
          />
        </div>
      </article>
    </Link>
  );
};
