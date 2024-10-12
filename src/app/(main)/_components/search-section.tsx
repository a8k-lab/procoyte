"use client";

import { Icon } from "@iconify/react";

import { TextSeparator } from "@/components/shared/text-separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchSection() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    params.set("q", e.currentTarget.q.value);

    replace(`${pathname}?${params.toString()}`);
  };

  const handleQRClick = () => {
    // temporary handler
    toast({
      variant: "default",
      title: "Scan QR",
      description: "Fitur ini masih dalam tahap pengembangan",
    });
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
          defaultValue={params.get("q") || ""}
          minLength={3}
          required
        />

        <div className="flex flex-col items-stretch justify-stretch gap-2 w-full sm:flex-row sm:w-auto">
          <Button type="submit">
            <Icon icon="lucide:badge-check" className="size-4" /> Cari
          </Button>

          <TextSeparator className="sm:hidden">atau</TextSeparator>

          <Button variant="outline" onClick={handleQRClick}>
            <Icon icon="lucide:badge-check" className="size-4" /> Scan QR
          </Button>
        </div>
      </form>
    </section>
  );
}
