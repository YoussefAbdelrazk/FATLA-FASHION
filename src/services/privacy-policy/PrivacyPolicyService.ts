import { callAPI } from '@/lib/config';
import { PrivacyPolicy, PrivacyPolicyFormData } from '@/types/privacy-policy';

export const getPrivacyPolicy = async (lang: string = 'en'): Promise<PrivacyPolicy> => {
  return callAPI('get', `/api/${lang}/PrivacyPolicy`);
};

export const createOrUpdatePrivacyPolicy = async (
  data: PrivacyPolicyFormData,
  lang: string = 'en',
): Promise<PrivacyPolicy> => {
  return callAPI('post', `/api/${lang}/PrivacyPolicy/update-privacy-policy`, data);
};
