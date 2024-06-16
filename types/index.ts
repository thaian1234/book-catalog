import * as z from "zod";

export const bookSchema = z.object({
  id: z.string().min(1),
  name: z
    .string()
    .min(1, { message: "Name must contain at least 1 character" })
    .max(100, { message: "Name must contain at most 3 characters" }),
  authors: z.array(z.string()).min(1, {
    message: "Choose at least 1 author",
  }),
  publicationYear: z
    .date()
    .min(new Date("01-01-1800"), {
      message: "Date must be greater than or equal to Jan 01 1800",
    })
    .optional(),
  rating: z.coerce.number().gte(0).lte(10).default(0),
  isbn: z
    .string()
    .refine(
      (isbn) => {
        const isbnRegex =
          /^(?:ISBN(?:-13)?:?\ )?(?=[0-9]{13}$|(?=(?:[0-9]+[-\ ]){4})[-\ 0-9]{17}$)97[89][-\ ]?[0-9]{1,5}[-\ ]?[0-9]+[-\ ]?[0-9]+[-\ ]?[0-9]$/;

        return isbnRegex.test(isbn);
      },
      {
        message: "Invalid ISBN format",
      },
    )
    .optional(),
});

export type Book = z.infer<typeof bookSchema>;
