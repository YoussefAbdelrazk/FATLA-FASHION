import { callAPI } from '@/lib/config';
import { AboutUs, AboutUsFormData } from '@/types/about-us';

export const getAboutUs = async (lang: string = 'en'): Promise<AboutUs> => {
  return callAPI('get', `/api/${lang}/AboutUs`);
};

export const createOrUpdateAboutUs = async (
  data: AboutUsFormData,
  lang: string = 'en',
): Promise<AboutUs> => {
  return callAPI('post', `/api/${lang}/AboutUs/update-about-us`, data);
};
