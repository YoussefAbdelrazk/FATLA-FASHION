import { z } from 'zod';

export const categoryFormSchema = z.object({
  arName: z.string().min(1, 'Arabic name is required'),
  enName: z.string().min(1, 'English name is required'),
  image: z.string().min(1, 'Image is required'),
});

export type CategoryFormData = z.infer<typeof categoryFormSchema>;
