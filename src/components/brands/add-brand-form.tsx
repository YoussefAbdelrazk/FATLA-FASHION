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
import { useCreateBrand } from '@/hooks/useBrands';
import { brandFormSchema, type BrandFormData } from '@/lib/schemas/brand-schema';
import { validateImage } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function AddBrandForm() {
  const router = useRouter();
  const createBrandMutation = useCreateBrand();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<BrandFormData>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      NameAr: '',
      NameEn: '',
      imageUrl: '',
      VisibilityOrder: 1,
    },
  });

  const handleImageUpload = (file: File) => {
    // Validate the image
    const validation = validateImage(file);

    if (!validation.isValid) {
      setImageError(validation.error || 'Invalid image');
      setImagePreview(null);
      setSelectedFile(null);
      form.setValue('imageUrl', '');
      return;
    }

    // Clear any previous errors
    setImageError(null);
    setSelectedFile(file);
    form.setValue('imageUrl', file.name); // Set the filename for validation

    // Create preview
    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target?.result as string;
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: BrandFormData) => {
    if (!selectedFile) {
      setImageError('Please select an image');
      return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append('NameAr', data.NameAr);
    formData.append('NameEn', data.NameEn);
    formData.append('VisibilityOrder', data.VisibilityOrder.toString());
    formData.append('Image', selectedFile);
    const dataForm = Object.fromEntries(formData);
    console.log(dataForm);
    createBrandMutation.mutate(
      { formData, lang: 'en' },
      {
        onSuccess: () => {
          router.push('/brands');
        },
      },
    );
  };

  const handleBack = () => {
    router.push('/brands');
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Button variant='outline' onClick={handleBack}>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Brands
          </Button>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Upload className='w-5 h-5' />
            Brand Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              {/* Arabic Brand Name Section */}
              <div className='space-y-6'>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                  <h3 className='text-xl font-semibold'>Arabic Brand Details</h3>
                </div>
                <FormField
                  control={form.control}
                  name='NameAr'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Brand Name Arabic <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder='أدخل اسم العلامة التجارية' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* English Brand Name Section */}
              <div className='space-y-6'>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                  <h3 className='text-xl font-semibold'>English Brand Details</h3>
                </div>
                <FormField
                  control={form.control}
                  name='NameEn'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Brand Name English <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder='Enter brand name' {...field} />
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
                  <h3 className='text-xl font-semibold'>Brand Image</h3>
                </div>
                <FormField
                  control={form.control}
                  name='imageUrl'
                  render={() => (
                    <FormItem>
                      <FormLabel>
                        Brand Image <span className='text-red-500'>*</span>
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
                                alt='Brand Image Preview'
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

              {/* Visibility Order Section */}
              <div className='space-y-6'>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-orange-500 rounded-full'></div>
                  <h3 className='text-xl font-semibold'>Visibility Settings</h3>
                </div>
                <FormField
                  control={form.control}
                  name='VisibilityOrder'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Visibility Order <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          min={1}
                          placeholder='Enter visibility order (1, 2, 3...)'
                          {...field}
                          onChange={e => field.onChange(parseInt(e.target.value) || 1)}
                        />
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
                <Button type='submit' disabled={createBrandMutation.isPending}>
                  <Save className='w-4 h-4 mr-2' />
                  {createBrandMutation.isPending ? 'Creating...' : 'Create Brand'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
