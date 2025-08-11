import { z } from 'zod';

export const sizeFormSchema = z.object({
  arName: z
    .string()
    .min(1, 'Arabic name is required')
    .min(2, 'Arabic name must be at least 2 characters'),
  enName: z
    .string()
    .min(1, 'English name is required')
    .min(2, 'English name must be at least 2 characters'),
});

export type SizeFormData = z.infer<typeof sizeFormSchema>;
