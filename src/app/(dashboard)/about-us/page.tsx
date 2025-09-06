'use client';

import { AboutUsForm } from '@/components/about-us/about-us-form';
import { useCreateOrUpdateAboutUs, useGetAboutUs } from '@/hooks/useAboutUs';
import { AboutUsFormData } from '@/types/about-us';
import { Info } from 'lucide-react';

export default function AboutUsPage() {
  const { data: aboutUsData, isLoading, error } = useGetAboutUs('en');
  const createOrUpdateMutation = useCreateOrUpdateAboutUs();

  const handleSave = async (data: AboutUsFormData) => {
    try {
      await createOrUpdateMutation.mutateAsync({ data, lang: 'en' });
    } catch (error) {
      console.error('Error saving about us:', error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
            <Info className='w-5 h-5 text-blue-600' />
          </div>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>من نحن</h1>
            <p className='text-gray-600'>إدارة محتوى صفحة من نحن</p>
          </div>
        </div>
        <div className='animate-pulse bg-gray-100 rounded-lg h-96'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
            <Info className='w-5 h-5 text-blue-600' />
          </div>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>من نحن</h1>
            <p className='text-gray-600'>إدارة محتوى صفحة من نحن</p>
          </div>
        </div>
        <div className='text-center py-12'>
          <p className='text-red-500 mb-2'>خطأ في تحميل البيانات</p>
          <p className='text-gray-600'>يرجى المحاولة مرة أخرى</p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-3'>
        <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
          <Info className='w-5 h-5 text-blue-600' />
        </div>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>من نحن</h1>
          <p className='text-gray-600'>إدارة محتوى صفحة من نحن</p>
        </div>
      </div>

      {/* Form */}

      <AboutUsForm
        initialData={aboutUsData || undefined}
        onSave={handleSave}
        isLoading={createOrUpdateMutation.isPending}
      />
    </div>
  );
}
