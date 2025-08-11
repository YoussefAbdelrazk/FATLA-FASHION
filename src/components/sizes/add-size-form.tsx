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
import { sizeFormSchema, type SizeFormData } from '@/lib/schemas/size-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function AddSizeForm() {
  const router = useRouter();

  const form = useForm<SizeFormData>({
    resolver: zodResolver(sizeFormSchema),
    defaultValues: {
      arName: '',
      enName: '',
    },
  });

  const onSubmit = (data: SizeFormData) => {
    // TODO: Implement create size functionality
    console.log('Creating size:', data);
    router.push('/sizes');
  };

  const handleBack = () => {
    router.push('/sizes');
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Button variant='outline' onClick={handleBack}>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Sizes
          </Button>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <span className='text-2xl'>📏</span>
            Size Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              {/* Arabic Content Section */}
              <div className='space-y-6'>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                  <h3 className='text-xl font-semibold'>Arabic Content</h3>
                </div>
                <FormField
                  control={form.control}
                  name='arName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Arabic Name <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='أدخل اسم المقاس بالعربية'
                          {...field}
                          className='text-right'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* English Content Section */}
              <div className='space-y-6'>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                  <h3 className='text-xl font-semibold'>English Content</h3>
                </div>
                <FormField
                  control={form.control}
                  name='enName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        English Name <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder='Enter size name in English' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Save Button */}
              <div className='flex justify-end space-x-4 pt-8 border-t'>
                <Button type='button' variant='outline' onClick={handleBack}>
                  Cancel
                </Button>
                <Button type='submit'>
                  <Save className='w-4 h-4 mr-2' />
                  Create Size
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
