'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/context/language';
import { useGetColorById, useUpdateColor } from '@/hooks/useColors';
import { UpdateColorFormData, updateColorSchema } from '@/lib/schemas/color';
import { Color } from '@/types/color';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface EditColorFormProps {
  color?: Color | null;
  colorId?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function EditColorForm({
  color,
  colorId,
  open = true,
  onOpenChange,
  onSuccess,
}: EditColorFormProps) {
  const { language } = useLanguage();
  const updateColorMutation = useUpdateColor();
  const targetId = color?.id || colorId || 0;
  const { data: colorDetail, isLoading: loadingDetail } = useGetColorById(targetId, language, {
    enabled: !!targetId,
  });

  const form = useForm<UpdateColorFormData>({
    resolver: zodResolver(updateColorSchema),
    defaultValues: {
      nameAr: '',
      nameEn: '',
      colorCode: '#000000',
    },
  });

  // Update form when color detail is loaded
  useEffect(() => {
    if (colorDetail) {
      form.reset({
        nameAr: colorDetail.nameAr,
        nameEn: colorDetail.nameEn,
        colorCode: colorDetail.colorCode,
      });
    }
  }, [colorDetail, form]);

  const onSubmit = async (data: UpdateColorFormData) => {
    if (!targetId) return;

    updateColorMutation.mutate(
      { id: targetId, data, lang: language },
      {
        onSuccess: () => {
          onOpenChange?.(false);
          onSuccess?.();
        },
      },
    );
  };

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='nameAr'
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم (عربي)</FormLabel>
                <FormControl>
                  <Input placeholder='أدخل الاسم بالعربية' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='nameEn'
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم (إنجليزي)</FormLabel>
                <FormControl>
                  <Input placeholder='Enter name in English' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='colorCode'
          render={({ field }) => (
            <FormItem>
              <FormLabel>كود اللون</FormLabel>
              <FormControl>
                <div className='flex items-center gap-2'>
                  <Input
                    type='color'
                    className='w-16 h-10 p-1 border rounded'
                    {...field}
                    onChange={e => {
                      field.onChange(e.target.value);
                    }}
                  />
                  <Input placeholder='#000000' {...field} className='flex-1' />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex gap-3'>
          {onOpenChange && (
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
              الغاء
            </Button>
          )}
          <Button type='submit' disabled={updateColorMutation.isPending}>
            {updateColorMutation.isPending ? 'جاري التعديل...' : 'تعديل لون'}
          </Button>
        </div>
      </form>
    </Form>
  );

  if (loadingDetail) {
    return (
      <div className='flex items-center justify-center h-32'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  if (open && onOpenChange) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className='sm:max-w-[600px]'>
          <DialogHeader>
            <DialogTitle>تعديل لون</DialogTitle>
            <DialogDescription>
              قم بتعديل بيانات اللون باللغة العربية والانجليزية.
            </DialogDescription>
          </DialogHeader>
          {formContent}
        </DialogContent>
      </Dialog>
    );
  }

  return formContent;
}
