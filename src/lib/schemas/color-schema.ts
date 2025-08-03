import { z } from 'zod';

export const colorFormSchema = z.object({
  arName: z.string().min(1, 'Arabic name is required'),
  enName: z.string().min(1, 'English name is required'),
  color: z
    .string()
    .min(1, 'Color is required')
    .regex(/^#[0-9A-F]{6}$/i, 'Invalid color format'),
});

export type ColorFormData = z.infer<typeof colorFormSchema>;
