import { z } from 'zod';

export const sliderFormSchema = z.object({
  NameAr: z.string().min(1, 'Arabic name is required'),
  NameEn: z.string().min(1, 'English name is required'),
  ImageAr: z.string().optional(), // Optional since we handle file separately
  ImageEn: z.string().optional(), // Optional since we handle file separately
  brandName: z.string().optional(),
  productName: z.string().optional(),
  categoryName: z.string().optional(),
  isVisible: z.boolean(),
});

export type SliderFormData = z.infer<typeof sliderFormSchema>;
