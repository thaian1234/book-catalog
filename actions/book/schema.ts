import { z } from "zod";

import { bookSchema } from "@/types";

export const addBookSchema = bookSchema;
export const updateBookSchema = bookSchema.partial().required({
  id: true,
});

export type AddBookType = z.infer<typeof bookSchema>;
export type UpdateBookType = z.infer<typeof updateBookSchema>;
