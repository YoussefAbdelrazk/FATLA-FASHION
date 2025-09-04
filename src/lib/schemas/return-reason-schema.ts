import { z } from 'zod';

export const returnReasonSchema = z.object({
  arReason: z
    .string()
    .min(1, 'السبب بالعربية مطلوب')
    .min(2, 'السبب بالعربية يجب أن يكون على الأقل حرفين')
    .max(100, 'السبب بالعربية يجب أن يكون أقل من 100 حرف'),
  enReason: z
    .string()
    .min(1, 'السبب بالإنجليزية مطلوب')
    .min(2, 'السبب بالإنجليزية يجب أن يكون على الأقل حرفين')
    .max(100, 'السبب بالإنجليزية يجب أن يكون أقل من 100 حرف'),
  isVisible: z.boolean(),
  visibilityOrder: z
    .number()
    .min(1, 'ترتيب الظهور يجب أن يكون أكبر من 0')
    .max(999, 'ترتيب الظهور يجب أن يكون أقل من 1000'),
});

export type ReturnReasonFormData = z.infer<typeof returnReasonSchema>;
