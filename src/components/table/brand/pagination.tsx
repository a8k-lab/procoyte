"use client";

import NoSSR from "@/components/shared/noSSR";
import {
  PaginationNext,
  PaginationPageInput,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Pagination() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const page = searchParams.get("page") || "1";
  const prevPage = page ? Number.parseInt(page) - 1 : 0;
  const nextPage = page ? Number.parseInt(page) + 1 : 1;

  const [pageState, setPageState] = useState("");

  const searchParamsObj = Object.fromEntries(searchParams.entries());

  function handleOnChange(page: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  }

  useEffect(() => {
    setPageState(page);
  }, [page]);

  return (
    <NoSSR>
      <div className="flex items-center justify-between gap-2">
        <PaginationPrevious
          href={{
            pathname,
            query: {
              ...searchParamsObj,
              page: prevPage,
            },
          }}
        />
        <PaginationPageInput
          type="number"
          value={pageState || ""}
          onClickGo={() => {
            handleOnChange(pageState);
          }}
          onChange={e => {
            setPageState(e.target.value);
          }}
        />
        <PaginationNext
          href={{
            pathname,
            query: {
              ...searchParamsObj,
              page: nextPage,
            },
          }}
        />
      </div>
    </NoSSR>
  );
}
