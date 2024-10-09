import { Icon } from "@iconify/react";

import RouterButton from "@/components/shared/router-button";
import Image from "next/image";

// TODO: dynamic metadata title
export const metadata = {
  title: "Detail Berita",
};

export default function NewsDetailPage() {
  return (
    <>
      <Header />
      <Content />
    </>
  );
}

const Header = () => {
  return (
    <header className="flex justify-between mb-3 h-full">
      <RouterButton variant="ghost" className="bg-white">
        <Icon icon="lucide:chevron-left" className="w-4 h-4" />
        Kembali
      </RouterButton>
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        <span className="texgtg-text-muted-foreground">Berita</span>
        <Icon icon="lucide:chevron-right" className="w-4 h-4" />

        <span className="text-text-primary">Detail informasi</span>
      </div>
    </header>
  );
};

const Content = () => {
  return (
    <>
      <section className="mt-6">
        <div className="w-full h-[202px] relative bg-white overflow-hidden">
          <Image
            src="/images/logo.svg"
            alt="Unilever"
            className="object-cover"
            fill
          />
        </div>
      </section>

      <section className="mt-3 text-left">
        <h1 className="font-semibold text-lg">Boikot Unilever !?</h1>
        <p className="font-medium text-xs text-primary">17 Agustus 2024</p>

        <p className="mt-3 text-sm">
          Unilever secara terbuka menegaskan dukungannya terhadap Israel di
          tengah meningkatnya ketegangan global. Dalam pernyataan terakhirnya,
          pimpinan Unilever menekankan komitmen mereka terhadap Israel, meskipun
          menghadapi boikot dan kritik dari berbagai pihak. Sikap ini memicu
          reaksi, terutama di Asia Tenggara, di mana penjualan Unilever menurun
          karena sentimen anti-Israel. <br />
          <br /> Dukungan ini telah memicu seruan boikot, terutama di wilayah
          yang bersimpati pada Palestina. Meskipun demikian, Unilever tetap
          teguh pada posisinya, memprioritaskan kepentingan bisnisnya di Israel,
          meski menghadapi tantangan finansial dan reputasi di pasar lain
        </p>
        <SourceOfProof
          sources={[
            {
              name: "The Times of Israel",
              url: "https://www.timesofisrael.com/unilever-reports-diving-sales-in-southeast-asia-amid-anti-israel-boycotts/",
            },
          ]}
        />
      </section>
    </>
  );
};

type SourceOfProofProps = {
  sources: Array<{
    name: string;
    url: string;
  }>;
};

const SourceOfProof = ({ sources }: SourceOfProofProps) => {
  return (
    <section className="mt-2.5 text-sm">
      <h2 className="font-semibold">Source of Proof</h2>
      <ul className="mt-2 text-muted-foreground">
        {sources.map((source, idx) => (
          <li key={source.name}>
            {idx + 1}.{" "}
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer noopener"
              className="underline"
            >
              {source.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
