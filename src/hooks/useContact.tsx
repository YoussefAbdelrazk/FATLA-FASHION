'use client';

import { ContactFormData } from '@/lib/schemas/contact-schema';
import { createContactInfo, updateContactInfo } from '@/services/contact/ContactActions';
import { getContactInfo } from '@/services/contact/ContactService';
import { ContactInfo } from '@/types/contact';
import { useState } from 'react';
import { toast } from 'sonner';

export function useContact() {
  const [isLoading, setIsLoading] = useState(false);

  const saveContactInfo = async (data: ContactFormData, lang: string = 'en'): Promise<void> => {
    setIsLoading(true);

    try {
      const response = await createContactInfo(data, lang);

      if (response.success) {
        toast.success('تم حفظ معلومات التواصل بنجاح!');
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Error saving contact information:', error);
      toast.error('فشل في حفظ معلومات التواصل. يرجى المحاولة مرة أخرى.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateContact = async (
    id: number,
    data: ContactFormData,
    lang: string = 'en',
  ): Promise<void> => {
    setIsLoading(true);

    try {
      const response = await updateContactInfo(id, data, lang);

      if (response.success) {
        toast.success('تم تحديث معلومات التواصل بنجاح!');
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Error updating contact information:', error);
      toast.error('فشل في تحديث معلومات التواصل. يرجى المحاولة مرة أخرى.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchContactInfo = async (lang: string = 'en'): Promise<ContactInfo | null> => {
    try {
      const response = await getContactInfo(lang);
      return response;
    } catch (error) {
      console.error('Error fetching contact information:', error);
      toast.error('فشل في جلب معلومات التواصل');
      return null;
    }
  };

  return {
    saveContactInfo,
    updateContact,
    fetchContactInfo,
    isLoading,
  };
}
