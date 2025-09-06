'use client';

import { ContactDisplay } from '@/components/contact/contact-display';
import { ContactForm } from '@/components/contact/contact-form';
import { useCreateContactInfo, useGetContactInfo, useUpdateContactInfo } from '@/hooks/useContact';
import { ContactFormData } from '@/lib/schemas/contact-schema';
import { useState } from 'react';

export function ContactClient() {
  const [isEditing, setIsEditing] = useState(false);

  // React Query hooks
  const { data: contactData, isLoading: isLoadingData, error } = useGetContactInfo('en');
  const createMutation = useCreateContactInfo();
  const updateMutation = useUpdateContactInfo();

  const handleSubmit = async (data: ContactFormData) => {
    try {
      if (contactData) {
        // Update existing contact
        updateMutation.mutate(
          { data, lang: 'en' },
          {
            onSuccess: () => {
              setIsEditing(false);
            },
          },
        );
      } else {
        // Create new contact
        createMutation.mutate(
          { data, lang: 'en' },
          {
            onSuccess: () => {
              setIsEditing(false);
            },
          },
        );
      }
    } catch (error) {
      console.error('Error saving contact data:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // Show error state if there's an error
  if (error) {
    return (
      <div className='space-y-6'>
        <div className='text-center text-red-600'>
          فشل في جلب معلومات التواصل. يرجى المحاولة مرة أخرى.
        </div>
        <div className='flex justify-center'>
          <button
            onClick={handleEdit}
            className='px-6 py-3 bg-black text-white rounded-lg transition-colors'
          >
            إضافة معلومات تواصل
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Contact Display Component */}
      <ContactDisplay contactData={contactData || null} isLoading={isLoadingData} />

      {/* Contact Form Component */}
      {isEditing ? (
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold'>
              {contactData ? 'تعديل معلومات التواصل' : 'إضافة معلومات تواصل جديدة'}
            </h2>
            <button
              onClick={handleCancel}
              className='px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50'
            >
              إلغاء
            </button>
          </div>
          <ContactForm
            onSubmit={handleSubmit}
            isLoading={createMutation.isPending || updateMutation.isPending}
            initialData={contactData}
          />
        </div>
      ) : (
        <div className='flex justify-center'>
          <button
            onClick={handleEdit}
            className='px-6 py-3 bg-black text-white rounded-lg transition-colors'
          >
            {contactData ? 'تعديل معلومات التواصل' : 'إضافة معلومات تواصل'}
          </button>
        </div>
      )}
    </div>
  );
}
