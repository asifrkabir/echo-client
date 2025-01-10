import { z } from "zod";

export const addPostValidationSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  content: z.string().trim().min(1, { message: "Content is required" }),
  category: z.enum(["tip", "story"], {
    errorMap: () => ({ message: "Category must be either 'tip' or 'story'" }),
  }),
  isPremium: z.boolean().optional(),
});

export const updatePostValidationSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  content: z.string().trim().min(1, { message: "Content is required" }),
  category: z.enum(["tip", "story"], {
    errorMap: () => ({ message: "Category must be either 'tip' or 'story'" }),
  }),
  isPremium: z.boolean().optional(),
});
