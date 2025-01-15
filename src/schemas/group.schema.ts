import { z } from "zod";

export const addGroupValidationSchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().trim().optional(),
});
