import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function showPrice(price: number): string {
  // show dollar * price
  return Array.from({ length: price ?? 0 })
    .map(_ => "$")
    .join("");
}

export function rupiahFormatter(price: number): string {
  return Number(price).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
