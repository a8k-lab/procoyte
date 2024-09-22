import BrandCard from "@/components/shared/card/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getBrands } from "@/server/queries";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function ExplorePage() {
  return (
    <div>
      <header className="text-left">
        <h1 className="text-lg  text-text-primary font-semibold">
          Brand di Boikot
        </h1>
        <p className="text-sm text-muted-foreground mb-3">
          Cari produk yang di boikot berdasarkan nama brand
        </p>

        <Input
          suffixIcon={<Icon icon="carbon:search" className="w-4 h-4" />}
          placeholder="Masukkan nama brand"
        />

        <BrandsSearch />
        <BrandNotRegistered />
      </header>
    </div>
  );
}

const BrandsSearch = async () => {
  const brands = await getBrands({ size: 4 });
  return (
    <section className="mt-3 grid grid-cols-2 gap-3">
      {brands.map(brand => (
        <Link key={brand.id} href={`/brands/${brand.id}`}>
          <BrandCard
            name={brand.name}
            description={brand.tag}
            imageUrl={brand.imageUrl}
          />
        </Link>
      ))}
    </section>
  );
};

const BrandNotRegistered = () => {
  return (
    <section className="p-4 block mt-6 border border-border rounded-md text-center">
      <h2 className="text-lg font-semibold text-text-primary">
        Produk tidak terdaftar?
      </h2>
      <p className="mt-[2px] text-xs text-muted-foreground">
        Laporkan produk untuk kami analisis lebih dalam
      </p>
      <Button variant="outline" className="mt-3 gap-2 text-error">
        <BadgeCheckIcon />
        Laporkan Produk
      </Button>
    </section>
  );
};

const BadgeCheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      name="badge-check"
    >
      <title>Badge Check</title>
      <path
        d="M6.50001 7.9999L7.83334 9.33324L10.5 6.66657M3.06667 5.74657C2.96937 5.30825 2.98431 4.85246 3.11011 4.42146C3.23591 3.99046 3.4685 3.5982 3.78632 3.28105C4.10413 2.9639 4.49688 2.73213 4.92814 2.60723C5.35941 2.48233 5.81523 2.46835 6.25334 2.56657C6.49448 2.18944 6.82668 1.87907 7.21931 1.66409C7.61194 1.44911 8.05237 1.33643 8.50001 1.33643C8.94764 1.33643 9.38807 1.44911 9.78071 1.66409C10.1733 1.87907 10.5055 2.18944 10.7467 2.56657C11.1855 2.46792 11.6421 2.48184 12.074 2.60704C12.506 2.73225 12.8992 2.96466 13.2172 3.28267C13.5352 3.60068 13.7677 3.99395 13.8929 4.4259C14.0181 4.85786 14.032 5.31446 13.9333 5.75324C14.3105 5.99437 14.6208 6.32657 14.8358 6.7192C15.0508 7.11183 15.1635 7.55227 15.1635 7.9999C15.1635 8.44754 15.0508 8.88797 14.8358 9.2806C14.6208 9.67323 14.3105 10.0054 13.9333 10.2466C14.0316 10.6847 14.0176 11.1405 13.8927 11.5718C13.7678 12.003 13.536 12.3958 13.2189 12.7136C12.9017 13.0314 12.5094 13.264 12.0784 13.3898C11.6474 13.5156 11.1917 13.5305 10.7533 13.4332C10.5125 13.8118 10.1801 14.1235 9.78676 14.3394C9.39346 14.5554 8.95202 14.6686 8.50334 14.6686C8.05466 14.6686 7.61322 14.5554 7.21992 14.3394C6.82662 14.1235 6.49417 13.8118 6.25334 13.4332C5.81523 13.5315 5.35941 13.5175 4.92814 13.3926C4.49688 13.2677 4.10413 13.0359 3.78632 12.7188C3.4685 12.4016 3.23591 12.0093 3.11011 11.5783C2.98431 11.1473 2.96937 10.6916 3.06667 10.2532C2.68664 10.0127 2.37362 9.68002 2.15671 9.28605C1.9398 8.89207 1.82605 8.44964 1.82605 7.9999C1.82605 7.55016 1.9398 7.10773 2.15671 6.71376C2.37362 6.31979 2.68664 5.98707 3.06667 5.74657Z"
        stroke="#EB5757"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
