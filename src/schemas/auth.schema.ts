import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

export const registerValidationSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  email: z.string().trim().email("Please enter a valid email"),
  password: z.string().trim().min(1, { message: "Password is required" }),
  bio: z.string().trim().optional(),
});
