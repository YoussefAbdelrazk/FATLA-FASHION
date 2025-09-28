'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useCreateFAQ } from '@/hooks/useFAQ';
import { CreateFAQFormData, createFAQSchema } from '@/lib/schemas/faq';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface AddFAQFormProps {
  onSuccess?: () => void;
}

export function AddFAQForm({ onSuccess }: AddFAQFormProps) {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const createFAQMutation = useCreateFAQ();

  const form = useForm<CreateFAQFormData>({
    resolver: zodResolver(createFAQSchema),
    defaultValues: {
      questionAr: '',
      questionEn: '',
      answearAr: '',
      answearEn: '',
    },
  });

  const onSubmit = async (data: CreateFAQFormData) => {
    createFAQMutation.mutate(
      { data, lang: language },
      {
        onSuccess: () => {
          form.reset();
          setOpen(false);
          onSuccess?.();
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className='mr-2 h-4 w-4' />
          إضافة اسئلة شائعة
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>إضافة اسئلة شائعة</DialogTitle>
          <DialogDescription>قم بإضافة اسئلة شائعة باللغة العربية والانجليزية.</DialogDescription>
        </DialogHeader>
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
              <Button type='button' variant='outline' onClick={() => setOpen(false)}>
                الغاء
              </Button>
              <Button type='submit' disabled={createFAQMutation.isPending}>
                {createFAQMutation.isPending ? 'جاري الانشاء...' : 'إضافة اسئلة شائعة'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
