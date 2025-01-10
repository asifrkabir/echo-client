import { z } from "zod";

export const updateUserValidationSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  bio: z.string().trim().optional(),
});
