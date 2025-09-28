import { z } from 'zod';

export const createColorSchema = z.object({
  nameAr: z.string().min(1, 'Arabic name is required'),
  nameEn: z.string().min(1, 'English name is required'),
  colorCode: z
    .string()
    .min(1, 'Color code is required')
    .regex(/^#[0-9A-F]{6}$/i, 'Invalid color code format'),
});

export const updateColorSchema = z.object({
  nameAr: z.string().min(1, 'Arabic name is required'),
  nameEn: z.string().min(1, 'English name is required'),
  colorCode: z
    .string()
    .min(1, 'Color code is required')
    .regex(/^#[0-9A-F]{6}$/i, 'Invalid color code format'),
});

export type CreateColorFormData = z.infer<typeof createColorSchema>;
export type UpdateColorFormData = z.infer<typeof updateColorSchema>;
