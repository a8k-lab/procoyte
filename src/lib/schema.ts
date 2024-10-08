import { z } from "zod";

export const adminBrandSchema = z.object({
  name: z.string().min(1).optional(),
  price: z.number().min(0).max(5).optional(),
  marked: z.enum(["0", "1"]).optional(),
  imageUrl: z.string().optional(),
  location: z.object({ value: z.string(), label: z.string() }).optional(),
  markReason: z.string().optional(),
  ownedBy: z.object({ value: z.string(), label: z.string() }).optional(),
});

export const reportSchema = z.object({
  name: z.string().min(1),
  purpose: z.enum(["0", "1"]),
  imageUrl: z.string().optional(),
  reason: z.string(),
  proofUrl: z.string().url(),
  alternative: z.string().optional(),
});

export type AdminBrandSchema = z.infer<typeof adminBrandSchema>;
export type ReportSchema = z.infer<typeof reportSchema>;
