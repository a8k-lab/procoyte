import { z } from "zod";

export const adminBrandSchema = z.object({
  name: z.string().min(1).optional(),
  brandDescription: z.string().optional(),
  price: z.number().min(0).max(5).optional(),
  marked: z.enum(["0", "1"]).optional(),
  imageUrl: z.string().optional(),
  location: z.object({ value: z.string(), label: z.string() }).optional(),
  markReason: z.string().optional(),
  ownedBy: z
    .object({ value: z.string(), label: z.string() })
    .optional()
    .nullable(),
  tags: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
    )
    .optional(),
  markSources: z
    .array(
      z.object({
        name: z.string(),
        url: z.string(),
      }),
    )
    .optional(),
  boosted: z.boolean().optional(),
});

export const reportSchema = z.object({
  name: z
    .string({ required_error: "Nama Brand atau Produk harus diisi" })
    .min(2, {
      message: "Minimal 2 karakter",
    }),
  purpose: z.enum(["false-information", "report-brand-product"]),
  imageUrl: z.string().optional(),
  reason: z.string({ required_error: "Penjelasan Lapor harus diisi" }).min(5, {
    message: "Minimal 5 karakter",
  }),
  proofUrl: z
    .string({
      required_error: "URL Bukti harus diisi",
      invalid_type_error: "URL Bukti harus berupa link yang valid",
    })
    .url(),
  alternative: z.string().optional(),
});

export type AdminBrandSchema = z.infer<typeof adminBrandSchema>;
export type ReportSchema = z.infer<typeof reportSchema>;
