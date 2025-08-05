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
import { categoryFormSchema, type CategoryFormData } from '@/lib/schemas/category-schema';
import { validateImage } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SingleCategoryForm() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      arName: '',
      enName: '',
      image: '',
    },
  });

  const handleImageUpload = (file: File) => {
    // Validate the image
    const validation = validateImage(file);

    if (!validation.isValid) {
      setImageError(validation.error || 'Invalid image');
      setImagePreview(null);
      form.setValue('image', '');
      return;
    }

    // Clear any previous errors
    setImageError(null);

    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target?.result as string;
      setImagePreview(result);
      form.setValue('image', result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: CategoryFormData) => {
    // Here you would typically make an API call to create the category
    console.log('Creating category:', data);
    // For now, we'll just redirect back to categories
    router.push('/categories');
  };

  const handleBack = () => {
    router.push('/categories');
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center space-x-4'>
        <Button variant='outline' size='sm' onClick={handleBack}>
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back to Categories
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              {/* Category Information Section */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Category Information</h3>
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
                          <Input placeholder='أدخل اسم الفئة بالعربية' {...field} />
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
                          <Input placeholder='Enter category name in English' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name='image'
                  render={() => (
                    <FormItem>
                      <FormLabel>
                        Category Image <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <div className='space-y-2'>
                          <Input
                            type='file'
                            accept='image/*'
                            onChange={e => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageUpload(file);
                              }
                            }}
                          />
                          {imageError && <p className='text-sm text-red-500'>{imageError}</p>}
                          {imagePreview && (
                            <div className='w-32 h-24 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden'>
                              <Image
                                src={imagePreview}
                                alt='Category Image Preview'
                                width={128}
                                height={96}
                                className='w-full h-full object-cover'
                              />
                            </div>
                          )}
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
                  Save Category
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
