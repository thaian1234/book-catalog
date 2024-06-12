import * as z from "zod";

export const authorSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
});

export const bookSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(100),
  authors: z.array(z.string()).min(1),
  publicationYear: z.date().min(new Date("1800-01-01")).optional(),
  rating: z.coerce.number().gte(0).lte(10).optional(),
  isbn: z.string().optional(),
});

export type Author = z.infer<typeof authorSchema>;
export type Book = z.infer<typeof bookSchema>;
