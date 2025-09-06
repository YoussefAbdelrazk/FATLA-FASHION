import baseAPI from '@/lib/config';
import { ContactInfo } from '@/types/contact';

export const getContactInfo = async (lang: string = 'en'): Promise<ContactInfo> => {
  try {
    const api = await baseAPI();
    const response = await api.get(`/api/${lang}/ContactUs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching contact info:', error);
    throw error;
  }
};
