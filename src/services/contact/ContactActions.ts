'use server';

import { baseAPI } from '@/lib/config';
import { ContactFormData } from '@/lib/schemas/contact-schema';

export const createContactInfo = async (data: ContactFormData, lang: string = 'en') => {
  try {
    const api = await baseAPI();
    const response = await api.post(`/api/${lang}/ContactUs/update-contact-us`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateContactInfo = async (data: ContactFormData, lang: string = 'en') => {
  try {
    const api = await baseAPI();
    const response = await api.post(`/api/${lang}/ContactUs/update-contact-us`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteContactInfo = async (id: number, lang: string = 'en') => {
  try {
    const api = await baseAPI();
    const response = await api.post(`/api/${lang}/ContactUs/DeleteContactUs?id=${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
