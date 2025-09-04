import { z } from 'zod';

export const htmlContentSchema = z.object({
  arHtml: z
    .string()
    .min(1, 'المحتوى العربي مطلوب')
    .min(10, 'المحتوى العربي يجب أن يكون على الأقل 10 أحرف'),
  enHtml: z
    .string()
    .min(1, 'المحتوى الإنجليزي مطلوب')
    .min(10, 'المحتوى الإنجليزي يجب أن يكون على الأقل 10 أحرف'),
});

export type HTMLContentFormData = z.infer<typeof htmlContentSchema>;
