import { z } from 'zod';

export const createFAQSchema = z.object({
  questionAr: z.string().min(1, 'Arabic question is required'),
  questionEn: z.string().min(1, 'English question is required'),
  answearAr: z.string().min(1, 'Arabic answer is required'),
  answearEn: z.string().min(1, 'English answer is required'),
});

export const updateFAQSchema = z.object({
  questionAr: z.string().min(1, 'Arabic question is required'),
  questionEn: z.string().min(1, 'English question is required'),
  answearAr: z.string().min(1, 'Arabic answer is required'),
  answearEn: z.string().min(1, 'English answer is required'),
});

export type CreateFAQFormData = z.infer<typeof createFAQSchema>;
export type UpdateFAQFormData = z.infer<typeof updateFAQSchema>;
