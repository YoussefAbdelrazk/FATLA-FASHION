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
import { useGetBrandById, useUpdateBrand } from '@/hooks/useBrands';
import { brandFormSchema, type BrandFormData } from '@/lib/schemas/brand-schema';
import { validateImage } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function EditBrandForm() {
  const params = useParams();
  const router = useRouter();
  const brandId = params.id as string;

  const { data: brand, isLoading, error } = useGetBrandById(brandId, 'en');
  const updateBrandMutation = useUpdateBrand();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm<BrandFormData>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      NameAr: '',
      NameEn: '',
      imageUrl: '',
      VisibilityOrder: 1,
    },
  });

  // Update form when brand data loads
  React.useEffect(() => {
    if (brand) {
      form.reset({
        NameAr: brand.nameAr,
        NameEn: brand.nameEn,
        imageUrl: brand.imageUrl,
        VisibilityOrder: brand.visibilityOrder,
      });
      setImagePreview(brand.imageUrl);
    }
  }, [brand, form]);

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

    // Create preview
    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target?.result as string;
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: BrandFormData) => {
    setIsUpdating(true);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('NameAr', data.NameAr);
      formData.append('NameEn', data.NameEn);
      formData.append('VisibilityOrder', data.VisibilityOrder.toString());

      if (selectedFile) {
        // Update with new image
        formData.append('updateImage', 'true');
        formData.append('image', selectedFile);
      } else {
        // Update without changing image
        formData.append('updateImage', 'false');
      }

      await updateBrandMutation.mutate({ id: brandId, formData, lang: 'en' });
      router.push('/brands');
    } catch (error) {
      console.error('Error updating brand:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBack = () => {
    router.push('/brands');
  };

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center space-x-4'>
          <Button variant='outline' onClick={handleBack}>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Brands
          </Button>
        </div>
        <Card>
          <CardContent className='flex items-center justify-center py-8'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
              <p className='text-muted-foreground'>Loading brand...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !brand) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center space-x-4'>
          <Button variant='outline' onClick={handleBack}>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Brands
          </Button>
        </div>
        <Card>
          <CardContent className='flex items-center justify-center py-8'>
            <div className='text-center'>
              <p className='text-destructive mb-2'>Error loading brand</p>
              <p className='text-muted-foreground text-sm'>
                {error instanceof Error ? error.message : 'Brand not found'}
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
          Back to Brands
        </Button>
      </div>

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
              {/* Brand Name Section */}
              <div className='space-y-6'>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                  <h3 className='text-xl font-semibold'>Brand Details</h3>
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
                        <Input placeholder='Enter brand name' {...field} />
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
                          <p className='text-sm text-muted-foreground'>
                            {selectedFile
                              ? 'New image selected. Will update image.'
                              : 'No new image selected. Will keep existing image.'}
                          </p>
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
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
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
                <Button type='submit' disabled={isUpdating}>
                  <Save className='w-4 h-4 mr-2' />
                  {isUpdating ? 'Updating...' : 'Update Brand'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
