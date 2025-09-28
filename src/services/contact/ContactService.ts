import { callAPI } from '@/lib/config';
import { ContactInfo } from '@/types/contact';

export const getContactInfo = async (lang: string = 'en'): Promise<ContactInfo> => {
  return callAPI('get', `/api/${lang}/ContactUs`);
};
