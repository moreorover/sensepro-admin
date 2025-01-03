import { z } from "zod";

export const locationSchema = z.object({
  id: z.string().cuid().optional(),
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  customerId: z.string().cuid(),
});

export type Location = z.infer<typeof locationSchema>;
