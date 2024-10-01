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
