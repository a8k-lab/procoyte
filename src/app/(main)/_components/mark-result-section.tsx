"use client";

import { MarkResultCard } from "@/components/shared/card/mark-result";
import type { BrandsRecord, MarkSourcesRecord } from "@/xata";
import { useSearchParams } from "next/navigation";

type MarkResultSectionProps = {
  result: BrandsRecord;
  markedSources: MarkSourcesRecord[];
};

export default function MarkResultSection({
  result,
  markedSources,
}: MarkResultSectionProps) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const q = params.get("q");

  // there is no query
  if (!q) {
    return null;
  }

  // there is a query, but no result
  if (q && !result) {
    return (
      <section className="mt-8 text-muted-foreground text-balance">
        <p>Tidak ditemukan pencarian untuk "{q}"</p>
      </section>
    );
  }

  console.log("result", result);

  // there is a query and a result
  return (
    <section className="mt-8">
      <p className="mb-4 text-muted-foreground text-balance">
        Hasil pencarian paling relevan untuk "{q}"
      </p>

      {result.marked === 0 ? (
        <MarkResultCard {...result} />
      ) : (
        <MarkResultCard isMarked markedSources={markedSources} {...result} />
      )}
    </section>
  );
}
