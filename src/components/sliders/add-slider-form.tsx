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
import { ArrowLeft, Save, Upload } from 'lucide-react';
import Image from 'next/image';
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

export default function AddSliderForm() {
  const router = useRouter();
  const createSliderMutation = useCreateSlider();
  const [arImagePreview, setArImagePreview] = useState<string | null>(null);
  const [enImagePreview, setEnImagePreview] = useState<string | null>(null);
  const [arImageError, setArImageError] = useState<string | null>(null);
  const [enImageError, setEnImageError] = useState<string | null>(null);
  const [arImageFile, setArImageFile] = useState<File | null>(null);
  const [enImageFile, setEnImageFile] = useState<File | null>(null);

  // Debug: Get current token
  // const currentToken = useAuthStore(state => state.token);
  // const cookieToken = getToken();

  const form = useForm<SliderFormData>({
    resolver: zodResolver(sliderFormSchema),
    defaultValues: {
      NameAr: '',
      NameEn: '',
      ImageAr: '',
      ImageEn: '',
      brandName: '',
      productName: '',
      categoryName: '',
      isVisible: true,
    },
  });

  const handleImageUpload = (field: 'ImageAr' | 'ImageEn', file: File) => {
    // Validate the image
    const validation = validateImage(file);

    if (!validation.isValid) {
      // Set error message
      if (field === 'ImageAr') {
        setArImageError(validation.error || 'Invalid image');
        setArImagePreview(null);
        setArImageFile(null);
        form.setValue('ImageAr', '');
      } else {
        setEnImageError(validation.error || 'Invalid image');
        setEnImagePreview(null);
        setEnImageFile(null);
        form.setValue('ImageEn', '');
      }
      return;
    }

    // Clear any previous errors
    if (field === 'ImageAr') {
      setArImageError(null);
      setArImageFile(file);
    } else {
      setEnImageError(null);
      setEnImageFile(file);
    }

    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target?.result as string;
      if (field === 'ImageAr') {
        setArImagePreview(result);
      } else {
        setEnImagePreview(result);
      }
      form.setValue(field, result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: SliderFormData) => {
    // Create FormData and append all form fields
    const formData = new FormData();
    formData.append('NameAr', data.NameAr || '');
    formData.append('NameEn', data.NameEn || '');

    // Append the actual File objects if they exist
    if (arImageFile) {
      formData.append('ImageAr', arImageFile);
    }
    if (enImageFile) {
      formData.append('ImageEn', enImageFile);
    }

    // if (data.brandName) {
    //   formData.append('brandName', data.brandName);
    // }
    // if (data.productName) {
    //   formData.append('productName', data.productName);
    // }
    // if (data.categoryName) {
    //   formData.append('categoryName', data.categoryName);
    // }
    // formData.append('isVisible', data.isVisible.toString());
    // const dataForApi = {
    //   NameAr: data.NameAr,
    //   NameEn: data.NameEn,
    //   ImageAr: arImageFile,
    //   ImageEn: enImageFile,
    // };
    console.log(formData);

    console.log('FormData being sent:', Object.fromEntries(formData.entries()));

    createSliderMutation.mutate(
      { data: formData, lang: 'en' },
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
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Button variant='outline' onClick={handleBack}>
            <ArrowLeft className='w-4 h-4 mr-2' />
            العودة للسلايدرز
          </Button>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Upload className='w-5 h-5' />
            معلومات السلايدر
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              {/* Arabic Content Section */}
              <div className='space-y-6'>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                  <h3 className='text-xl font-semibold'>المحتوى العربي</h3>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <FormField
                    control={form.control}
                    name='NameAr'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Arabic Name <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='أدخل الاسم بالعربية'
                            {...field}
                            className='text-right'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='ImageAr'
                    render={() => (
                      <FormItem>
                        <FormLabel>
                          Arabic Image <span className='text-red-500'>*</span>
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
                                    handleImageUpload('ImageAr', file);
                                  }
                                }}
                                className='cursor-pointer'
                              />
                              <Upload className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                            </div>
                            {arImageError && <p className='text-sm text-red-500'>{arImageError}</p>}
                            {arImagePreview && (
                              <div className='w-full h-32 bg-muted rounded-lg overflow-hidden'>
                                <Image
                                  src={arImagePreview}
                                  alt='Arabic Image Preview'
                                  width={400}
                                  height={128}
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
              <div className='space-y-6'>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                  <h3 className='text-xl font-semibold'>المحتوى الإنجليزي</h3>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <FormField
                    control={form.control}
                    name='NameEn'
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
                    name='ImageEn'
                    render={() => (
                      <FormItem>
                        <FormLabel>
                          English Image <span className='text-red-500'>*</span>
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
                                    handleImageUpload('ImageEn', file);
                                  }
                                }}
                                className='cursor-pointer'
                              />
                              <Upload className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                            </div>
                            {enImageError && <p className='text-sm text-red-500'>{enImageError}</p>}
                            {enImagePreview && (
                              <div className='w-full h-32 bg-muted rounded-lg overflow-hidden'>
                                <Image
                                  src={enImagePreview}
                                  alt='English Image Preview'
                                  width={400}
                                  height={128}
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
              <div className='space-y-6'>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                  <h3 className='text-xl font-semibold'>Optional Information</h3>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
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
              <div className='space-y-6'>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-orange-500 rounded-full'></div>
                  <h3 className='text-xl font-semibold'>Visibility Settings</h3>
                </div>
                <FormField
                  control={form.control}
                  name='isVisible'
                  render={({ field }) => (
                    <FormItem className='rounded-lg border p-6'>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          variant={field.value ? 'success' : 'default'}
                          size='lg'
                          showIcon
                          label='Make slider visible'
                          description='Control whether this slider is visible to users on the frontend'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              {/* Save Button */}
              <div className='flex justify-end space-x-4 space-x-reverse pt-8 border-t'>
                <Button type='button' variant='outline' onClick={handleBack}>
                  إلغاء
                </Button>
                <Button type='submit' disabled={createSliderMutation.isPending}>
                  <Save className='w-4 h-4 ml-2' />
                  {createSliderMutation.isPending ? 'جاري الإنشاء...' : 'إنشاء سلايدر'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
