import { z } from 'zod';

export const contactFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  hotline: z.string().min(1, 'Hotline is required'),
  whatsapp: z.string().min(1, 'WhatsApp number is required'),
  mobile1: z.string().min(1, 'Mobile 1 is required'),
  mobile2: z.string().optional(),
  latitude: z.number().min(-90).max(90, 'Invalid latitude'),
  longitude: z.number().min(-180).max(180, 'Invalid longitude'),
  address: z.string().min(1, 'Address is required'),
  facebook: z.string().url('Please enter a valid Facebook URL').optional().or(z.literal('')),
  instagram: z.string().url('Please enter a valid Instagram URL').optional().or(z.literal('')),
  tiktok: z.string().url('Please enter a valid TikTok URL').optional().or(z.literal('')),
  snapchat: z.string().url('Please enter a valid Snapchat URL').optional().or(z.literal('')),
  linkedin: z.string().url('Please enter a valid LinkedIn URL').optional().or(z.literal('')),
  x: z.string().url('Please enter a valid X (Twitter) URL').optional().or(z.literal('')),
  telegram: z.string().url('Please enter a valid Telegram URL').optional().or(z.literal('')),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
