import baseAPI from '@/lib/config';
import { TermsConditions, TermsConditionsFormData } from '@/types/terms-conditions';

export const getTermsConditions = async (lang: string = 'en'): Promise<TermsConditions> => {
  try {
    const api = await baseAPI();
    const response = await api.get(`/api/${lang}/TermsConditions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching terms and conditions:', error);
    throw error;
  }
};

export const createOrUpdateTermsConditions = async (
  data: TermsConditionsFormData,
  lang: string = 'en',
): Promise<TermsConditions> => {
  try {
    const api = await baseAPI();
    const response = await api.post(`/api/${lang}/TermsConditions`, data);
    return response.data;
  } catch (error) {
    console.error('Error saving terms and conditions:', error);
    throw error;
  }
};
