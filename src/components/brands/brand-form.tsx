'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateBrand, useGetBrandById, useUpdateBrand } from '@/hooks/useBrands';
import { CreateBrandData, UpdateBrandData } from '@/types/brand';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useEffect } from 'react';

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Brand name is required')
    .max(100, 'Brand name must be less than 100 characters'),
  imageUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  visibilityOrder: z.number().min(0, 'Visibility order must be 0 or greater').optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface BrandFormProps {
  brandId?: string;
  isEdit?: boolean;
}

export default function BrandForm({ brandId, isEdit = false }: BrandFormProps) {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
      visibilityOrder: 0,
    },
  });

  // React Query hooks
  const createBrandMutation = useCreateBrand();
  const updateBrandMutation = useUpdateBrand();
  const { data: existingBrand, isLoading: isLoadingBrand } = useGetBrandById(
    parseInt(brandId || '0'),
  );

  // Load existing brand data when editing
  useEffect(() => {
    if (existingBrand && isEdit) {
      form.reset({
        name: existingBrand.name,
        imageUrl: existingBrand.imageUrl || '',
        visibilityOrder: existingBrand.visibilityOrder || 0,
      });
    }
  }, [existingBrand, isEdit, form]);

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      if (isEdit && brandId) {
        const updateData: UpdateBrandData = {
          id: parseInt(brandId),
          ...data,
        };
        await updateBrandMutation.mutateAsync(updateData);
      } else {
        const createData: CreateBrandData = data;
        await createBrandMutation.mutateAsync(createData);
      }
      router.push('/brands');
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const isLoading = createBrandMutation.isPending || updateBrandMutation.isPending;

  if (isEdit && isLoadingBrand) {
    return (
      <Card>
        <CardContent className='flex items-center justify-center h-64'>
          <div className='text-center'>
            <Loader2 className='h-8 w-8 animate-spin mx-auto' />
            <p className='mt-2 text-gray-600'>Loading brand...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center space-x-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => router.back()}
          className='flex items-center space-x-2'
        >
          <ArrowLeft className='w-4 h-4' />
          Back
        </Button>
        <h1 className='text-2xl font-bold'>{isEdit ? 'Edit Brand' : 'Add New Brand'}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? 'Edit Brand Information' : 'Brand Information'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter brand name' {...field} />
                    </FormControl>
                    <FormDescription>The name of the brand</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='imageUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder='https://example.com/brand-image.png' {...field} />
                    </FormControl>
                    <FormDescription>URL to the brand image (optional)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='visibilityOrder'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visibility Order</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='0'
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>
                      The order in which this brand appears (lower numbers appear first)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex space-x-4 pt-4'>
                <Button type='submit' disabled={isLoading} className='flex-1'>
                  {isLoading && <Loader2 className='w-4 h-4 mr-2 animate-spin' />}
                  {isEdit ? 'Update Brand' : 'Create Brand'}
                </Button>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => router.push('/brands')}
                  disabled={isLoading}
                  className='flex-1'
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
