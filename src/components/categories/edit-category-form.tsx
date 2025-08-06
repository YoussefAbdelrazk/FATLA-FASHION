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
import { useGetCategoryById, useUpdateCategory } from '@/hooks/useCategories';
import { categoryFormSchema, type CategoryFormData } from '@/lib/schemas/category-schema';
import { validateImage } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function EditCategoryForm() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id as string;

  const { data: category, isLoading, error } = useGetCategoryById(categoryId, 'en');
  const updateCategoryMutation = useUpdateCategory();

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

  // Update form when category data loads
  React.useEffect(() => {
    if (category) {
      form.reset({
        arName: category.arName,
        enName: category.enName,
        image: category.image,
      });
      setImagePreview(category.image);
    }
  }, [category, form]);

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
    updateCategoryMutation.mutate(
      { data: { ...data, id: categoryId }, lang: 'en' },
      {
        onSuccess: () => {
          router.push('/categories');
        },
      },
    );
  };

  const handleBack = () => {
    router.push('/categories');
  };

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center space-x-4'>
          <Button variant='outline' onClick={handleBack}>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Categories
          </Button>
        </div>
        <Card>
          <CardContent className='flex items-center justify-center py-8'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
              <p className='text-muted-foreground'>Loading category...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center space-x-4'>
          <Button variant='outline' onClick={handleBack}>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Categories
          </Button>
        </div>
        <Card>
          <CardContent className='flex items-center justify-center py-8'>
            <div className='text-center'>
              <p className='text-destructive mb-2'>Error loading category</p>
              <p className='text-muted-foreground text-sm'>
                {error instanceof Error ? error.message : 'Category not found'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center space-x-4'>
        <Button variant='outline' onClick={handleBack}>
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back to Categories
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Upload className='w-5 h-5' />
            Category Information
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
                          placeholder='أدخل اسم الفئة بالعربية'
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
                        <Input placeholder='Enter category name in English' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Image Section */}
              <div className='space-y-6'>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                  <h3 className='text-xl font-semibold'>Category Image</h3>
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
                        <div className='space-y-3'>
                          <div className='relative'>
                            <Input
                              type='file'
                              accept='image/*'
                              onChange={e => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleImageUpload(file);
                                }
                              }}
                              className='cursor-pointer'
                            />
                            <Upload className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                          </div>
                          {imageError && <p className='text-sm text-red-500'>{imageError}</p>}
                          {imagePreview && (
                            <div className='w-full h-48 bg-muted rounded-lg overflow-hidden'>
                              <Image
                                src={imagePreview}
                                alt='Category Image Preview'
                                width={400}
                                height={192}
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
              <div className='flex justify-end space-x-4 pt-8 border-t'>
                <Button type='button' variant='outline' onClick={handleBack}>
                  Cancel
                </Button>
                <Button type='submit' disabled={updateCategoryMutation.isPending}>
                  <Save className='w-4 h-4 mr-2' />
                  {updateCategoryMutation.isPending ? 'Updating...' : 'Update Category'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
