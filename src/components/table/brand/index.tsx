"use client";
import Image from "next/image";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { showPrice } from "@/lib/utils";
import type { BrandsRecord } from "@/xata";
import Pagination from "./pagination";

export default function BrandTable({
  brands,
}: {
  brands: BrandsRecord[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Gambar</TableCell>
          <TableCell>Nama Brand</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Ditandai</TableCell>
          <TableCell>Dimiliki oleh</TableCell>
          <TableCell>Lokasi</TableCell>
          <TableCell>Aksi</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {brands.map(brand => (
          <TableRow key={brand.id}>
            <TableCell>{brand.id}</TableCell>
            <TableCell>
              <Image
                src={brand.imageUrl ?? "/images/logo.svg"}
                alt={brand.name ?? ""}
                width={24}
                height={24}
              />
            </TableCell>
            <TableCell>{brand.name}</TableCell>
            <TableCell>{showPrice(brand.price || 0)}</TableCell>
            <TableCell className="text-right">
              {brand.marked ? "Ditandai" : "Tidak Ditandai"}
            </TableCell>
            <TableCell>
              {brand?.owned_by ? (
                <div className="flex items-center gap-2">
                  <Image
                    src={brand.owned_by?.imageUrl ?? "/images/logo.svg"}
                    alt={brand.owned_by?.name ?? ""}
                    width={24}
                    height={24}
                  />
                  <span>{brand.owned_by?.name}</span>
                </div>
              ) : (
                "-"
              )}
            </TableCell>
            <TableCell>
              {brand?.location ? (
                <div className="flex items-center gap-2">
                  <span>{brand.location?.name}</span>
                </div>
              ) : (
                "-"
              )}
            </TableCell>
            <TableCell>
              <Link href={`/admin/brand/${brand.id}`}>Detail</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <Pagination />
      </TableFooter>
    </Table>
  );
}
