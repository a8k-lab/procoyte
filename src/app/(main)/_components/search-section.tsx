"use client";

import { Icon } from "@iconify/react";

import { TextSeparator } from "@/components/shared/text-separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchSection() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("q", e.currentTarget.q.value);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <section>
      <form
        className="mt-6 flex flex-col items-center justify-center gap-4 w-full sm:flex-row md:mt-8"
        onSubmit={handleSubmit}
      >
        <Input
          name="q"
          placeholder="Masukkan nama, link, brand"
          className="w-full sm:w-[320px]"
          minLength={3}
          required
        />

        <div className="flex flex-col items-stretch justify-stretch gap-2 w-full sm:flex-row sm:w-auto">
          <Button type="submit">
            <Icon icon="lucide:badge-check" className="size-4" /> Cari
          </Button>

          <TextSeparator className="sm:hidden">atau</TextSeparator>

          <Button variant="outline">
            <Icon icon="lucide:badge-check" className="size-4" /> Scan QR
          </Button>
        </div>
      </form>
    </section>
  );
}
