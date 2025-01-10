import { z } from "zod";

export const addCommentValidationSchema = z.object({
  content: z.string().trim().min(1, { message: "Content is required" }),
});
