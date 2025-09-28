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
import { useLanguage } from '@/context/language';
import { useCreateColor } from '@/hooks/useColors';
import { CreateColorFormData, createColorSchema } from '@/lib/schemas/color';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface AddColorFormProps {
  onSuccess?: () => void;
}

export function AddColorForm({ onSuccess }: AddColorFormProps) {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const createColorMutation = useCreateColor();

  const form = useForm<CreateColorFormData>({
    resolver: zodResolver(createColorSchema),
    defaultValues: {
      nameAr: '',
      nameEn: '',
      colorCode: '#000000',
    },
  });

  const onSubmit = async (data: CreateColorFormData) => {
    createColorMutation.mutate(
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
          إضافة لون
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>إضافة لون جديد</DialogTitle>
          <DialogDescription>قم بإضافة لون جديد باللغة العربية والانجليزية.</DialogDescription>
        </DialogHeader>
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
            <DialogFooter className='gap-3'>
              <Button type='button' variant='outline' onClick={() => setOpen(false)}>
                الغاء
              </Button>
              <Button type='submit' disabled={createColorMutation.isPending}>
                {createColorMutation.isPending ? 'جاري الانشاء...' : 'إضافة لون'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
