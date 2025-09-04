import baseAPI from '@/lib/config';
import { AboutUs, AboutUsFormData } from '@/types/about-us';

export const getAboutUs = async (lang: string = 'en'): Promise<AboutUs> => {
  try {
    const api = await baseAPI();
    const response = await api.get(`/api/${lang}/AboutUs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching about us:', error);
    throw error;
  }
};

export const createOrUpdateAboutUs = async (
  data: AboutUsFormData,
  lang: string = 'en',
): Promise<AboutUs> => {
  try {
    const api = await baseAPI();
    const response = await api.post(`/api/${lang}/AboutUs/update-about-us`, data);
    return response.data;
  } catch (error) {
    console.error('Error saving about us:', error);
    throw error;
  }
};
