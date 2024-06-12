import * as z from "zod";

import { TimestampType } from "@/lib/timestamp";

export const bookSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(100),
  authors: z.array(z.string()).min(1),
  publicationYear: TimestampType.optional(),
  rating: z.coerce.number().gte(0).lte(10).optional(),
  isbn: z.string().optional(),
});

export const authorSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
});

export type Book = z.infer<typeof bookSchema>;
export type Author = z.infer<typeof authorSchema>;
