import baseAPI from '@/lib/config';
import { PrivacyPolicy, PrivacyPolicyFormData } from '@/types/privacy-policy';

export const getPrivacyPolicy = async (lang: string = 'en'): Promise<PrivacyPolicy> => {
  try {
    const api = await baseAPI();
    const response = await api.get(`/api/${lang}/PrivacyPolicy`);
    return response.data;
  } catch (error) {
    console.error('Error fetching privacy policy:', error);
    throw error;
  }
};

export const createOrUpdatePrivacyPolicy = async (
  data: PrivacyPolicyFormData,
  lang: string = 'en',
): Promise<PrivacyPolicy> => {
  try {
    const api = await baseAPI();
    const response = await api.post(`/api/${lang}/PrivacyPolicy/update-privacy-policy`, data);
    return response.data;
  } catch (error) {
    console.error('Error saving privacy policy:', error);
    throw error;
  }
};
