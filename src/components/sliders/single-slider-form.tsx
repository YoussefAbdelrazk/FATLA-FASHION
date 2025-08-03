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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useCreateSlider } from '@/hooks/useSliders';
import { sliderFormSchema, type SliderFormData } from '@/lib/schemas/slider-schema';
import { validateImage } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// Sample data for dropdowns - in real app, these would come from API
const brands = [
  { id: '1', name: 'Nike' },
  { id: '2', name: 'Adidas' },
  { id: '3', name: 'Puma' },
  { id: '4', name: 'Under Armour' },
  { id: '5', name: 'New Balance' },
];

const products = [
  { id: '1', name: 'Air Max 270' },
  { id: '2', name: 'Ultraboost 22' },
  { id: '3', name: 'RS-X 3Puzzle' },
  { id: '4', name: 'HOVR Phantom' },
  { id: '5', name: 'Fresh Foam 1080v12' },
];

const categories = [
  { id: '1', name: 'Shoes' },
  { id: '2', name: 'Clothing' },
  { id: '3', name: 'Accessories' },
  { id: '4', name: 'Sports Equipment' },
];

export default function SingleSliderForm() {
  const router = useRouter();
  const createSliderMutation = useCreateSlider();
  const [arImagePreview, setArImagePreview] = useState<string | null>(null);
  const [enImagePreview, setEnImagePreview] = useState<string | null>(null);
  const [arImageError, setArImageError] = useState<string | null>(null);
  const [enImageError, setEnImageError] = useState<string | null>(null);

  const form = useForm<SliderFormData>({
    resolver: zodResolver(sliderFormSchema),
    defaultValues: {
      arName: '',
      enName: '',
      arImage: '',
      enImage: '',
      brandName: '',
      productName: '',
      categoryName: '',
      isVisible: true,
    },
  });

  const handleImageUpload = (field: 'arImage' | 'enImage', file: File) => {
    // Validate the image
    const validation = validateImage(file);

    if (!validation.isValid) {
      // Set error message
      if (field === 'arImage') {
        setArImageError(validation.error || 'Invalid image');
        setArImagePreview(null);
        form.setValue('arImage', '');
      } else {
        setEnImageError(validation.error || 'Invalid image');
        setEnImagePreview(null);
        form.setValue('enImage', '');
      }
      return;
    }

    // Clear any previous errors
    if (field === 'arImage') {
      setArImageError(null);
    } else {
      setEnImageError(null);
    }

    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target?.result as string;
      if (field === 'arImage') {
        setArImagePreview(result);
      } else {
        setEnImagePreview(result);
      }
      form.setValue(field, result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: SliderFormData) => {
    createSliderMutation.mutate(
      { data, lang: 'en' },
      {
        onSuccess: () => {
          router.push('/sliders');
        },
      },
    );
  };

  const handleBack = () => {
    router.push('/sliders');
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center space-x-4'>
        <Button variant='outline' onClick={handleBack}>
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back to Sliders
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Slider Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-6'
              encType='multipart/form-data'
            >
              {/* Arabic Content Section */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Arabic Content</h3>
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
                          <Input placeholder='أدخل الاسم بالعربية' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='arImage'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Arabic Image <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <div className='space-y-2'>
                            <Input
                              type='file'
                              accept='image/*'
                              onChange={e => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleImageUpload('arImage', file);
                                }
                              }}
                            />
                            {arImageError && <p className='text-sm text-red-500'>{arImageError}</p>}
                            {arImagePreview && (
                              <div className='w-32 h-24 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden'>
                                <img
                                  src={arImagePreview}
                                  alt='Arabic Image Preview'
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
              </div>

              {/* English Content Section */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>English Content</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='enName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          English Name <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder='Enter name in English' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='enImage'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          English Image <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <div className='space-y-2'>
                            <Input
                              type='file'
                              accept='image/*'
                              onChange={e => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleImageUpload('enImage', file);
                                }
                              }}
                            />
                            {enImageError && <p className='text-sm text-red-500'>{enImageError}</p>}
                            {enImagePreview && (
                              <div className='w-32 h-24 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden'>
                                <img
                                  src={enImagePreview}
                                  alt='English Image Preview'
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
              </div>

              {/* Optional Fields Section */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Optional Information</h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <FormField
                    control={form.control}
                    name='brandName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand Name</FormLabel>
                        <Select
                          onValueChange={value => {
                            field.onChange(value);
                            // Auto-hide slider when brand is selected
                            if (value) {
                              form.setValue('isVisible', false);
                            }
                          }}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select a brand' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {brands.map(brand => (
                              <SelectItem key={brand.id} value={brand.name}>
                                {brand.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='productName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <Select
                          onValueChange={value => {
                            field.onChange(value);
                            // Auto-hide slider when product is selected
                            if (value) {
                              form.setValue('isVisible', false);
                            }
                          }}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select a product' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {products.map(product => (
                              <SelectItem key={product.id} value={product.name}>
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='categoryName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category Name</FormLabel>
                        <Select
                          onValueChange={value => {
                            field.onChange(value);
                            // Auto-hide slider when category is selected
                            if (value) {
                              form.setValue('isVisible', false);
                            }
                          }}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select a category' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map(category => (
                              <SelectItem key={category.id} value={category.name}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Visibility Section */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Visibility Settings</h3>
                <FormField
                  control={form.control}
                  name='isVisible'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                      <div className='space-y-0.5'>
                        <FormLabel className='text-base'>Make slider visible</FormLabel>
                        <div className='text-sm text-muted-foreground'>
                          Control whether this slider is visible to users
                        </div>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Save Button */}
              <div className='flex justify-end space-x-4 pt-6'>
                <Button type='button' variant='outline' onClick={handleBack}>
                  Cancel
                </Button>
                <Button type='submit' disabled={createSliderMutation.isPending}>
                  <Save className='w-4 h-4 mr-2' />
                  {createSliderMutation.isPending ? 'Saving...' : 'Save Slider'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
