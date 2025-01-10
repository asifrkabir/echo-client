import { z } from "zod";

export const addPostValidationSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  content: z.string().trim().min(1, { message: "Content is required" }),
  isPremium: z.boolean().optional(),
});

export const updatePostValidationSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  content: z.string().trim().min(1, { message: "Content is required" }),
  isPremium: z.boolean().optional(),
});
