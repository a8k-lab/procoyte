"use client";

import { Icon } from "@iconify/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";

type SearchInputProps = {
  placeholder?: string;
};

export const SearchInput = ({ placeholder = "" }: SearchInputProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const defaultValue = searchParams.get("q") || "";
  const [debouncedValue, setDebouncedValue] = useDebounceValue(
    defaultValue,
    500,
  );

  // biome-ignore lint: `pathname` and `replace` are unnecessary dependencies
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    // only search if the value is at least 3 characters long
    if (debouncedValue.length >= 3) {
      params.set("q", debouncedValue);
    } else {
      params.delete("q");
    }

    replace(`${pathname}?${params.toString()}`);
  }, [debouncedValue, searchParams]);

  return (
    <Input
      suffixIcon={<Icon icon="carbon:search" className="size-4" />}
      placeholder={`${placeholder} (min. 3 karakter)`}
      onChange={e => setDebouncedValue(e.target.value)}
      defaultValue={defaultValue}
    />
  );
};
