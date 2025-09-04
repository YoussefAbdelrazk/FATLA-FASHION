'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ReturnReasonFormData, returnReasonSchema } from '@/lib/schemas/return-reason-schema';
import { ReturnReason } from '@/types/return';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface AddReturnReasonFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reason: ReturnReasonFormData) => void;
  editingReason?: ReturnReason | null;
}

export default function AddReturnReasonForm({
  isOpen,
  onClose,
  onSave,
  editingReason,
}: AddReturnReasonFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(returnReasonSchema),
    defaultValues: {
      arReason: '',
      enReason: '',
      isVisible: true,
      visibilityOrder: 1,
    },
  });

  useEffect(() => {
    if (editingReason) {
      form.reset({
        arReason: editingReason.arReason,
        enReason: editingReason.enReason,
        isVisible: editingReason.isVisible,
        visibilityOrder: editingReason.visibilityOrder,
      });
    } else {
      form.reset({
        arReason: '',
        enReason: '',
        isVisible: true,
        visibilityOrder: 1,
      });
    }
  }, [editingReason, isOpen, form]);

  const onSubmit = async (data: ReturnReasonFormData) => {
    try {
      setIsSubmitting(true);
      await onSave(data);
      onClose();
    } catch (error) {
      console.error('Error saving return reason:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{editingReason ? 'تعديل سبب الإرجاع' : 'إضافة سبب إرجاع جديد'}</DialogTitle>
          <DialogDescription>
            {editingReason ? 'قم بتعديل بيانات سبب الإرجاع' : 'أدخل بيانات سبب الإرجاع الجديد'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='arReason'>السبب (عربي) *</Label>
            <Input
              id='arReason'
              placeholder='أدخل السبب باللغة العربية'
              {...form.register('arReason')}
              className={form.formState.errors.arReason ? 'border-red-500' : ''}
            />
            {form.formState.errors.arReason && (
              <p className='text-sm text-red-500'>{form.formState.errors.arReason.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='enReason'>السبب (إنجليزي) *</Label>
            <Input
              id='enReason'
              placeholder='Enter reason in English'
              {...form.register('enReason')}
              className={form.formState.errors.enReason ? 'border-red-500' : ''}
            />
            {form.formState.errors.enReason && (
              <p className='text-sm text-red-500'>{form.formState.errors.enReason.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='visibilityOrder'>ترتيب الظهور *</Label>
            <Input
              id='visibilityOrder'
              type='number'
              min='1'
              {...form.register('visibilityOrder', {
                valueAsNumber: true,
              })}
              className={form.formState.errors.visibilityOrder ? 'border-red-500' : ''}
            />
            {form.formState.errors.visibilityOrder && (
              <p className='text-sm text-red-500'>
                {form.formState.errors.visibilityOrder.message}
              </p>
            )}
          </div>

          <div className='rounded-lg border p-3'>
            <Switch
              id='isVisible'
              checked={form.watch('isVisible')}
              onCheckedChange={checked => form.setValue('isVisible', checked)}
              variant={form.watch('isVisible') ? 'success' : 'default'}
              size='md'
              showIcon
              label='مرئي للعملاء'
              description={
                form.watch('isVisible')
                  ? 'هذا السبب مرئي للعملاء في قائمة أسباب الإرجاع'
                  : 'هذا السبب مخفي عن العملاء'
              }
            />
          </div>

          <DialogFooter className='gap-3'>
            <Button type='button' variant='outline' onClick={onClose} disabled={isSubmitting}>
              إلغاء
            </Button>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'جاري الحفظ...' : editingReason ? 'حفظ التعديلات' : 'حفظ'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
