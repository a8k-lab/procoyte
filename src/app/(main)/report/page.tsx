import { Icon } from "@iconify/react";
import type { Metadata } from "next";

import { ReportForm } from "@/components/form/report";

export const metadata: Metadata = {
  title: "Laporkan Brand atau Produk",
};

export default function ReportPage() {
  return (
    <>
      <section className="mb-3">
        <div className="flex items-center justify-center gap-1.5">
          <Icon icon="streamline:star-2-solid" />
          <h1 className="font-semibold text-lg">Form Laporan Boikot</h1>
        </div>
        <p className="mt-2.5 text-muted-foreground text-sm text-balance">
          Dengar kabar boikot? Bantu kami dengan menyarankan brand atau produk
        </p>
      </section>

      <ReportForm />
    </>
  );
}
