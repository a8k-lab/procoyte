import { Icon } from "@iconify/react";
import type { Metadata } from "next";

import { ReportForm } from "@/components/form/report";

export const metadata: Metadata = {
  title: "Laporkan Produk",
};

export default function ReportPage() {
  return (
    <>
      <section>
        <div className="mb-3 flex items-center justify-center gap-1.5">
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
