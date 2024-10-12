import { ProductCard } from "@/components/shared/card/product";
import type { BrandsRecord } from "@/xata";
import Link from "next/link";

type RecommendationsSectionProps = {
  recommendations: BrandsRecord[];
};

export default function RecommendationsSection({
  recommendations,
}: RecommendationsSectionProps) {
  return (
    <section className="mt-8 text-left">
      <div className="flex items-center justify-between gap-2">
        <h1 className="font-semibold text-lg">Alternatif</h1>
        <Link href="/store" className="text-sm text-primary">
          Lihat Semua
        </Link>
      </div>

      <ul className="flex overflow-x-auto gap-[18px] mt-3">
        {recommendations.map(recommendation => (
          <li key={recommendation.id} className="flex-shrink-0">
            <Link href={`/brands/${recommendation.id}`}>
              <ProductCard
                name={recommendation?.name || "-"}
                imageSrc={recommendation?.imageUrl}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
