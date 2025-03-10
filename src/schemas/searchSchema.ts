import { z } from "zod";

export const searchSchema = z.object({
  location: z.string().min(1, "Location is required"),
  distance: z.string().regex(/^\d+ km$/, "Distance must be a number followed by 'km'"),
  priceRange: z.string().regex(/^\$\d+$/, "Price must be a number prefixed with '$'"),
});

export type SearchFormData = z.infer<typeof searchSchema>;
