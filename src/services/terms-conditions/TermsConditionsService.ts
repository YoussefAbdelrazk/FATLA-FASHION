import { callAPI } from '@/lib/config';
import { TermsConditions, TermsConditionsFormData } from '@/types/terms-conditions';

export const getTermsConditions = async (lang: string = 'en'): Promise<TermsConditions> => {
  return callAPI('get', `/api/${lang}/TermsAndConditions`);
};

export const createOrUpdateTermsConditions = async (
  data: TermsConditionsFormData,
  lang: string = 'en',
): Promise<TermsConditions> => {
  return callAPI('post', `/api/${lang}/TermsAndConditions/update-terms-and-conditions`, data);
};
