import * as z from "zod";

export const bookSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(100),
  authors: z.array(z.string()).min(1),
  publicationYear: z.date().min(new Date("01-01-1800")).optional(),
  rating: z.coerce.number().gte(0).lte(10).optional(),
  // isbn: z
  //   .string()
  //   .refine(
  //     (isbn) => {
  //       // Check if the ISBN is a valid 10-digit or 13-digit ISBN
  //       const isbn10Regex = /^[0-9]{10}$|^[0-9]{9}[X]$/; // Match 10 digits or 9 digits followed by X
  //       const isbn13Regex = /^[0-9]{13}$/; // Match 13 digits

  //       return isbn10Regex.test(isbn) || isbn13Regex.test(isbn);
  //     },
  //     {
  //       message: "Invalid ISBN format",
  //     },
  //   )
  //   .optional(),
  isbn: z.string().optional(),
});

export const authorSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
});

export type Book = z.infer<typeof bookSchema>;
export type Author = z.infer<typeof authorSchema>;
