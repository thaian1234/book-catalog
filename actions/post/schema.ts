import * as z from "zod";

export const addPostSchema = z.object({
  title: z.string().min(1, {
    message: "At least 1 charactor",
  }),
});

export type AddPostType = z.infer<typeof addPostSchema>;
