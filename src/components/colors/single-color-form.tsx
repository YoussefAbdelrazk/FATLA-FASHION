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
import { colorFormSchema, type ColorFormData } from '@/lib/schemas/color-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Palette, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SingleColorForm() {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState('#FF0000');

  const form = useForm<ColorFormData>({
    resolver: zodResolver(colorFormSchema),
    defaultValues: {
      arName: '',
      enName: '',
      color: '#FF0000',
    },
  });

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    form.setValue('color', color);
  };

  const onSubmit = (data: ColorFormData) => {
    // Here you would typically make an API call to create the color
    console.log('Creating color:', data);
    // For now, we'll just redirect back to colors
    router.push('/colors');
  };

  const handleBack = () => {
    router.push('/colors');
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center space-x-4'>
        <Button variant='outline' size='sm' onClick={handleBack}>
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back to Colors
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Color</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              {/* Color Information Section */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Color Information</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='arName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Arabic Name <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder='أدخل اسم اللون بالعربية' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='enName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          English Name <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder='Enter color name in English' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name='color'
                  render={() => (
                    <FormItem>
                      <FormLabel>
                        Color <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <div className='space-y-3'>
                          <div className='flex items-center space-x-3'>
                            <div
                              className='w-12 h-12 rounded-lg border-2 border-gray-200 dark:border-gray-700'
                              style={{ backgroundColor: selectedColor }}
                            />
                            <Input
                              type='color'
                              value={selectedColor}
                              onChange={e => handleColorChange(e.target.value)}
                              className='w-20 h-12 p-1 border-2 border-gray-200 dark:border-gray-700 rounded-lg'
                            />
                            <Input
                              type='text'
                              value={selectedColor}
                              onChange={e => handleColorChange(e.target.value)}
                              placeholder='#FF0000'
                              className='font-mono'
                            />
                          </div>
                          <div className='flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400'>
                            <Palette className='w-4 h-4' />
                            <span>Click the color picker or enter a hex color code</span>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Save Button */}
              <div className='flex justify-end space-x-4 pt-6'>
                <Button type='button' variant='outline' onClick={handleBack}>
                  Cancel
                </Button>
                <Button type='submit'>
                  <Save className='w-4 h-4 mr-2' />
                  Save Color
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
