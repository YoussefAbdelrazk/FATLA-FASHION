'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const colorSchema = z.object({
  arName: z.string().min(1, 'Arabic name is required'),
  enName: z.string().min(1, 'English name is required'),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Please enter a valid hex color code'),
});

type ColorFormData = z.infer<typeof colorSchema>;

export default function AddColorForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ColorFormData>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      arName: '',
      enName: '',
      color: '#000000',
    },
  });

  const onSubmit = async (data: ColorFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement API call to create color
      console.log('Creating color:', data);

      // For now, just redirect to colors page
      router.push('/colors');
    } catch (error) {
      console.error('Error creating color:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Button variant='ghost' size='sm' onClick={() => router.back()} className='p-0 h-auto'>
              <ArrowLeft className='w-4 h-4' />
            </Button>
            Color Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Arabic Name */}
                <FormField
                  control={form.control}
                  name='arName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Arabic Name</FormLabel>
                      <FormControl>
                        <Input placeholder='أدخل الاسم بالعربية' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* English Name */}
                <FormField
                  control={form.control}
                  name='enName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>English Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter name in English' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Color Picker */}
              <FormField
                control={form.control}
                name='color'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <div className='flex items-center gap-4'>
                        <Input
                          type='color'
                          {...field}
                          className='w-20 h-12 p-1 border rounded-lg cursor-pointer'
                        />
                        <Input placeholder='#000000' {...field} className='flex-1' />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Color Preview */}
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Color Preview</label>
                <div className='flex items-center gap-4'>
                  <div
                    className='w-16 h-16 rounded-lg border-2 border-gray-200 shadow-sm'
                    style={{ backgroundColor: form.watch('color') }}
                  />
                  <div className='text-sm text-muted-foreground'>{form.watch('color')}</div>
                </div>
              </div>

              {/* Submit Button */}
              <div className='flex justify-end gap-4'>
                <Button type='button' variant='outline' onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type='submit' disabled={isSubmitting}>
                  <Save className='w-4 h-4 mr-2' />
                  {isSubmitting ? 'Creating...' : 'Create Color'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
