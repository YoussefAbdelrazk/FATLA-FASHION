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
import { colors } from '@/data/colors';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const colorSchema = z.object({
  arName: z.string().min(1, 'Arabic name is required'),
  enName: z.string().min(1, 'English name is required'),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Please enter a valid hex color code'),
});

type ColorFormData = z.infer<typeof colorSchema>;

interface EditColorFormProps {
  colorId: string;
}

export default function EditColorForm({ colorId }: EditColorFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [color, setColor] = useState<(typeof colors)[0] | null>(null);

  const form = useForm<ColorFormData>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      arName: '',
      enName: '',
      color: '#000000',
    },
  });

  useEffect(() => {
    // Simulate loading color data
    const foundColor = colors.find(c => c.id === colorId);
    if (foundColor) {
      setColor(foundColor);
      form.reset({
        arName: foundColor.arName,
        enName: foundColor.enName,
        color: foundColor.color,
      });
    }
    setIsLoading(false);
  }, [colorId, form]);

  const onSubmit = async (data: ColorFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement API call to update color
      console.log('Updating color:', colorId, data);

      // For now, just redirect to colors page
      router.push('/colors');
    } catch (error) {
      console.error('Error updating color:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className='flex items-center justify-center py-12'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
            <p className='text-muted-foreground'>Loading color...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!color) {
    return (
      <Card>
        <CardContent className='flex items-center justify-center py-12'>
          <div className='text-center'>
            <p className='text-destructive mb-2'>Color not found</p>
            <p className='text-muted-foreground text-sm'>The requested color could not be found.</p>
            <Button onClick={() => router.push('/colors')} className='mt-4'>
              Back to Colors
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Button variant='ghost' size='sm' onClick={() => router.back()} className='p-0 h-auto'>
              <ArrowLeft className='w-4 h-4' />
            </Button>
            Edit Color: {color.enName}
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
                  {isSubmitting ? 'Updating...' : 'Update Color'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
