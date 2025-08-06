import { z } from 'zod';

export const brandFormSchema = z.object({
  NameAr: z.string().min(1, 'Brand name ar is required'),
  NameEn: z.string().min(1, 'Brand name en is required'),
  imageUrl: z.string().optional(), // Optional since we handle file separately
  VisibilityOrder: z.number().min(1, 'Visibility order must be at least 1'),
});

export type BrandFormData = z.infer<typeof brandFormSchema>;
