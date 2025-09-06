'use client';

import { ContactDisplay } from '@/components/contact/contact-display';
import { ContactForm } from '@/components/contact/contact-form';
import { useContact } from '@/hooks/useContact';
import { ContactFormData } from '@/lib/schemas/contact-schema';
import { getContactInfo } from '@/services/contact/ContactService';
import { ContactInfo } from '@/types/contact';
import { useEffect, useState } from 'react';

export function ContactClient() {
  const { saveContactInfo, updateContact, isLoading } = useContact();
  const [contactData, setContactData] = useState<ContactInfo | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContactInfo('en');
        setContactData(data);
      } catch (error) {
        console.error('Error fetching contact data:', error);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (data: ContactFormData) => {
    try {
      if (contactData) {
        // Update existing contact
        await updateContact(contactData.id, data, 'en');
      } else {
        // Create new contact
        await saveContactInfo(data, 'en');
      }

      // Refresh data after successful save
      const updatedData = await getContactInfo('en');
      setContactData(updatedData);
      setIsEditing(false);
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

  return (
    <div className='space-y-6'>
      {/* Contact Display Component */}
      <ContactDisplay contactData={contactData} isLoading={isLoadingData} />

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
          <ContactForm onSubmit={handleSubmit} isLoading={isLoading} initialData={contactData} />
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
