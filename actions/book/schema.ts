import { z } from "zod";

import { bookSchema } from "@/types";

export const addBookSchema = bookSchema.omit({
  id: true,
});

export const updateBookSchema = bookSchema.partial().required({
  id: true,
});

export const deleteBookSchema = bookSchema.pick({
  id: true,
});

export type AddBookType = z.infer<typeof addBookSchema>;
export type UpdateBookType = z.infer<typeof updateBookSchema>;
export type DeleteBookType = z.infer<typeof deleteBookSchema>;
