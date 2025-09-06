'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ContactFormData, contactFormSchema } from '@/lib/schemas/contact-schema';
import { ContactInfo } from '@/types/contact';
import { zodResolver } from '@hookform/resolvers/zod';
import { Globe, Mail, MapPin, Send } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  isLoading?: boolean;
  initialData?: ContactInfo | null;
}

export function ContactForm({ onSubmit, isLoading = false, initialData }: ContactFormProps) {
  const [mapLocation, setMapLocation] = useState<{ lat: number; lng: number } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: initialData?.email || '',
      hotline: initialData?.hotline || '',
      whatsapp: initialData?.whatsapp || '',
      mobile1: initialData?.mobile1 || '',
      mobile2: initialData?.mobile2 || '',
      latitude: initialData?.latitude || 0,
      longitude: initialData?.longitude || 0,
      address: initialData?.address || '',
      facebook: initialData?.facebook || '',
      instagram: initialData?.instagram || '',
      tiktok: initialData?.tiktok || '',
      snapchat: initialData?.snapchat || '',
      linkedin: initialData?.linkedin || '',
      x: initialData?.x || '',
      telegram: initialData?.telegram || '',
    },
  });

  // Update form when initialData changes
  React.useEffect(() => {
    if (initialData) {
      reset({
        email: initialData.email,
        hotline: initialData.hotline,
        whatsapp: initialData.whatsapp,
        mobile1: initialData.mobile1,
        mobile2: initialData.mobile2,
        latitude: initialData.latitude,
        longitude: initialData.longitude,
        address: initialData.address,
        facebook: initialData.facebook || '',
        instagram: initialData.instagram || '',
        tiktok: initialData.tiktok || '',
        snapchat: initialData.snapchat || '',
        linkedin: initialData.linkedin || '',
        x: initialData.x || '',
        telegram: initialData.telegram || '',
      });
      setMapLocation({ lat: initialData.latitude, lng: initialData.longitude });
    }
  }, [initialData, reset]);

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Simple mock coordinates - in real app, you'd use actual map integration
    const lat = 31.2001 + (y / rect.height - 0.5) * 0.1;
    const lng = 29.9187 + (x / rect.width - 0.5) * 0.1;

    setMapLocation({ lat, lng });
    setValue('latitude', lat);
    setValue('longitude', lng);
  };

  const onFormSubmit = async (data: ContactFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold text-center'>معلومات التواصل</CardTitle>
        <CardDescription className='text-center'>
          املأ تفاصيل الاتصال وروابط وسائل التواصل الاجتماعي
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className='space-y-6'>
          {/* Contact Information Section */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold flex items-center gap-2'>
              <Mail className='h-5 w-5' />
              معلومات الاتصال
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='email'>البريد الإلكتروني *</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='your@email.com'
                  {...register('email')}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='hotline'>الخط الساخن *</Label>
                <Input
                  id='hotline'
                  placeholder='+1234567890'
                  {...register('hotline')}
                  className={errors.hotline ? 'border-red-500' : ''}
                />
                {errors.hotline && <p className='text-sm text-red-500'>{errors.hotline.message}</p>}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='whatsapp'>واتساب *</Label>
                <Input
                  id='whatsapp'
                  placeholder='+1234567890'
                  {...register('whatsapp')}
                  className={errors.whatsapp ? 'border-red-500' : ''}
                />
                {errors.whatsapp && (
                  <p className='text-sm text-red-500'>{errors.whatsapp.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='mobile1'>الجوال الأول *</Label>
                <Input
                  id='mobile1'
                  placeholder='+1234567890'
                  {...register('mobile1')}
                  className={errors.mobile1 ? 'border-red-500' : ''}
                />
                {errors.mobile1 && <p className='text-sm text-red-500'>{errors.mobile1.message}</p>}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='mobile2'>الجوال الثاني</Label>
                <Input id='mobile2' placeholder='+1234567890' {...register('mobile2')} />
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold flex items-center gap-2'>
              <MapPin className='h-5 w-5' />
              الموقع
            </h3>

            <div className='space-y-2'>
              <Label htmlFor='address'>العنوان *</Label>
              <Textarea
                id='address'
                placeholder='أدخل عنوانك الكامل'
                {...register('address')}
                className={errors.address ? 'border-red-500' : ''}
                rows={3}
              />
              {errors.address && <p className='text-sm text-red-500'>{errors.address.message}</p>}
            </div>

            <div className='space-y-2'>
              <Label>موقع الخريطة (انقر لتعيين الإحداثيات)</Label>
              <div
                className='w-full h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors flex items-center justify-center'
                onClick={handleMapClick}
              >
                {mapLocation ? (
                  <div className='text-center'>
                    <MapPin className='h-8 w-8 mx-auto text-blue-500 mb-2' />
                    <p className='text-sm text-gray-600'>
                      خط العرض: {mapLocation.lat.toFixed(6)}, خط الطول: {mapLocation.lng.toFixed(6)}
                    </p>
                    <p className='text-xs text-gray-500'>انقر لتغيير الموقع</p>
                  </div>
                ) : (
                  <div className='text-center'>
                    <MapPin className='h-8 w-8 mx-auto text-gray-400 mb-2' />
                    <p className='text-sm text-gray-500'>انقر لتعيين الموقع على الخريطة</p>
                  </div>
                )}
              </div>
              {(errors.latitude || errors.longitude) && (
                <p className='text-sm text-red-500'>
                  {errors.latitude?.message || errors.longitude?.message}
                </p>
              )}
            </div>
          </div>

          {/* Social Media Section */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold flex items-center gap-2'>
              <Globe className='h-5 w-5' />
              روابط وسائل التواصل الاجتماعي
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='facebook' className='flex items-center gap-2'>
                  <div className='w-4 h-4 bg-blue-600 rounded'></div>
                  فيسبوك
                </Label>
                <Input
                  id='facebook'
                  type='url'
                  placeholder='https://facebook.com/yourpage'
                  {...register('facebook')}
                />
                {errors.facebook && (
                  <p className='text-sm text-red-500'>{errors.facebook.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='instagram' className='flex items-center gap-2'>
                  <div className='w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded'></div>
                  إنستغرام
                </Label>
                <Input
                  id='instagram'
                  type='url'
                  placeholder='https://instagram.com/yourpage'
                  {...register('instagram')}
                />
                {errors.instagram && (
                  <p className='text-sm text-red-500'>{errors.instagram.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='tiktok' className='flex items-center gap-2'>
                  <div className='w-4 h-4 bg-black rounded'></div>
                  تيك توك
                </Label>
                <Input
                  id='tiktok'
                  type='url'
                  placeholder='https://tiktok.com/@yourpage'
                  {...register('tiktok')}
                />
                {errors.tiktok && <p className='text-sm text-red-500'>{errors.tiktok.message}</p>}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='snapchat' className='flex items-center gap-2'>
                  <div className='w-4 h-4 bg-yellow-400 rounded'></div>
                  سناب شات
                </Label>
                <Input
                  id='snapchat'
                  type='url'
                  placeholder='https://snapchat.com/add/yourpage'
                  {...register('snapchat')}
                />
                {errors.snapchat && (
                  <p className='text-sm text-red-500'>{errors.snapchat.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='linkedin' className='flex items-center gap-2'>
                  <div className='w-4 h-4 bg-blue-700 rounded'></div>
                  لينكد إن
                </Label>
                <Input
                  id='linkedin'
                  type='url'
                  placeholder='https://linkedin.com/in/yourprofile'
                  {...register('linkedin')}
                />
                {errors.linkedin && (
                  <p className='text-sm text-red-500'>{errors.linkedin.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='x' className='flex items-center gap-2'>
                  <div className='w-4 h-4 bg-black rounded'></div>
                  إكس (تويتر)
                </Label>
                <Input id='x' type='url' placeholder='https://x.com/yourpage' {...register('x')} />
                {errors.x && <p className='text-sm text-red-500'>{errors.x.message}</p>}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='telegram' className='flex items-center gap-2'>
                  <div className='w-4 h-4 bg-blue-500 rounded'></div>
                  تليجرام
                </Label>
                <Input
                  id='telegram'
                  type='url'
                  placeholder='https://t.me/yourpage'
                  {...register('telegram')}
                />
                {errors.telegram && (
                  <p className='text-sm text-red-500'>{errors.telegram.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className='flex justify-center pt-6'>
            <Button
              type='submit'
              disabled={isLoading}
              className='px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2'
            >
              {isLoading ? (
                <>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Send className='h-4 w-4' />
                  حفظ معلومات التواصل
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
