'use client';

import { HTMLContentForm } from '@/components/content/html-content-form';
import { useGetTermsConditions, useCreateOrUpdateTermsConditions } from '@/hooks/useTermsConditions';
import { TermsConditionsFormData } from '@/types/terms-conditions';
import { FileText } from 'lucide-react';

export default function TermsConditionsPage() {
  const { data: termsConditionsData, isLoading, error } = useGetTermsConditions('en');
  const createOrUpdateMutation = useCreateOrUpdateTermsConditions();

  const handleSave = async (data: TermsConditionsFormData) => {
    try {
      await createOrUpdateMutation.mutateAsync({ data, lang: 'en' });
    } catch (error) {
      console.error('Error saving terms and conditions:', error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center'>
            <FileText className='w-5 h-5 text-orange-600' />
          </div>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>الشروط والأحكام</h1>
            <p className='text-gray-600'>إدارة محتوى الشروط والأحكام</p>
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
          <div className='w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center'>
            <FileText className='w-5 h-5 text-orange-600' />
          </div>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>الشروط والأحكام</h1>
            <p className='text-gray-600'>إدارة محتوى الشروط والأحكام</p>
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
        <div className='w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center'>
          <FileText className='w-5 h-5 text-orange-600' />
        </div>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>الشروط والأحكام</h1>
          <p className='text-gray-600'>إدارة محتوى الشروط والأحكام</p>
        </div>
      </div>

      {/* Form */}
      <HTMLContentForm
        initialData={termsConditionsData || undefined}
        onSave={handleSave}
        isLoading={createOrUpdateMutation.isPending}
        title='إدارة الشروط والأحكام'
      />
    </div>
  );
}