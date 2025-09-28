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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/context/language';
import { useGetFAQById, useUpdateFAQ } from '@/hooks/useFAQ';
import { UpdateFAQFormData, updateFAQSchema } from '@/lib/schemas/faq';
import { FAQ } from '@/types/faq';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface EditFAQFormProps {
  faq: FAQ | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function EditFAQForm({ faq, open, onOpenChange, onSuccess }: EditFAQFormProps) {
  const { language } = useLanguage();
  const updateFAQMutation = useUpdateFAQ();
  const { data: faqDetail, isLoading: loadingDetail } = useGetFAQById(faq?.id || 0, language, {
    enabled: open && !!faq?.id,
  });

  const form = useForm<UpdateFAQFormData>({
    resolver: zodResolver(updateFAQSchema),
    defaultValues: {
      questionAr: '',
      questionEn: '',
      answearAr: '',
      answearEn: '',
    },
  });

  // Update form when FAQ detail is loaded
  useEffect(() => {
    if (faqDetail) {
      form.reset({
        questionAr: faqDetail.questionAr,
        questionEn: faqDetail.questionEn,
        answearAr: faqDetail.answearAr,
        answearEn: faqDetail.answearEn,
      });
    }
  }, [faqDetail, form]);

  const onSubmit = async (data: UpdateFAQFormData) => {
    if (!faq) return;

    updateFAQMutation.mutate(
      { id: faq.id, data, lang: language },
      {
        onSuccess: () => {
          onOpenChange(false);
          onSuccess?.();
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>تعديل اسئلة شائعة</DialogTitle>
          <DialogDescription>
            قم بتعديل بيانات اسئلة شائعة باللغة العربية والانجليزية.
          </DialogDescription>
        </DialogHeader>
        {loadingDetail ? (
          <div className='flex items-center justify-center h-32'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='questionAr'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسئلة شائعة (عربي)</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter Arabic question' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='questionEn'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسئلة شائعة (إنجليزي)</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter English question' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='answearAr'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اجابة (عربي)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Enter Arabic answer'
                          className='min-h-[100px]'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='answearEn'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اجابة (إنجليزي)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Enter English answer'
                          className='min-h-[100px]'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className='gap-3'>
                <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
                  الغاء
                </Button>
                <Button type='submit' disabled={updateFAQMutation.isPending}>
                  {updateFAQMutation.isPending ? 'جاري التعديل...' : 'تعديل اسئلة شائعة'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
