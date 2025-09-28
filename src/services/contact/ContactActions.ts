'use server';

import { callAPI } from '@/lib/config';
import { ContactFormData } from '@/lib/schemas/contact-schema';

export const createContactInfo = async (data: ContactFormData, lang: string = 'en') => {
  return callAPI('post', `/api/${lang}/ContactUs/update-contact-us`, data);
};

export const updateContactInfo = async (data: ContactFormData, lang: string = 'en') => {
  return callAPI('post', `/api/${lang}/ContactUs/update-contact-us`, data);
};

export const deleteContactInfo = async (id: number, lang: string = 'en') => {
  return callAPI('post', `/api/${lang}/ContactUs/DeleteContactUs?id=${id}`);
};
