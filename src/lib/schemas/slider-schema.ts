import { z } from 'zod';

export const sliderFormSchema = z.object({
  arName: z.string().min(1, 'Arabic name is required'),
  enName: z.string().min(1, 'English name is required'),
  arImage: z.string().min(1, 'Arabic image is required'),
  enImage: z.string().min(1, 'English image is required'),
  brandName: z.string().optional(),
  productName: z.string().optional(),
  categoryName: z.string().optional(),
  isVisible: z.boolean(),
});

export type SliderFormData = z.infer<typeof sliderFormSchema>;
