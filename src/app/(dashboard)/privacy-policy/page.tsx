'use client';

import { HTMLContentForm } from '@/components/content/html-content-form';
import { useCreateOrUpdatePrivacyPolicy, useGetPrivacyPolicy } from '@/hooks/usePrivacyPolicy';
import { PrivacyPolicyFormData } from '@/types/privacy-policy';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const { data: privacyPolicyData, isLoading, error } = useGetPrivacyPolicy('en');
  const createOrUpdateMutation = useCreateOrUpdatePrivacyPolicy();

  const handleSave = async (data: PrivacyPolicyFormData) => {
    try {
      await createOrUpdateMutation.mutateAsync({ data, lang: 'en' });
    } catch (error) {
      console.error('Error saving privacy policy:', error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center'>
            <Shield className='w-5 h-5 text-green-600' />
          </div>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>سياسة الخصوصية</h1>
            <p className='text-gray-600'>إدارة محتوى سياسة الخصوصية</p>
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
          <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center'>
            <Shield className='w-5 h-5 text-green-600' />
          </div>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>سياسة الخصوصية</h1>
            <p className='text-gray-600'>إدارة محتوى سياسة الخصوصية</p>
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
        <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center'>
          <Shield className='w-5 h-5 text-green-600' />
        </div>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>سياسة الخصوصية</h1>
          <p className='text-gray-600'>إدارة محتوى سياسة الخصوصية</p>
        </div>
      </div>

      {/* Form */}
      <HTMLContentForm
        initialData={privacyPolicyData || undefined}
        onSave={handleSave}
        isLoading={createOrUpdateMutation.isPending}
        title='إدارة سياسة الخصوصية'
      />
    </div>
  );
}
