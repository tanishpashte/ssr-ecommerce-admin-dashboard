import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name required"),
  category: z.string().min(1, "Category required"),
  price: z.number().positive("Price must be > 0"),
  stock: z.number().min(0, "Stock cannot be negative"),
});
