'use server';
import { callAPI } from '@/lib/config';
import { CreateFAQRequest, FAQ, UpdateFAQRequest } from '@/types/faq';
// Create new FAQ
export const createFAQ = async (faqData: CreateFAQRequest, lang: string = 'en') => {
  return callAPI('post', `/api/${lang}/FAQ/CreateFAQ`, faqData);
};

// Update FAQ
export const updateFAQ = async (
  id: number,
  faqData: UpdateFAQRequest,
  lang: string = 'en',
): Promise<FAQ> => {
  return callAPI('post', `/api/${lang}/FAQ/UpdateFAQ?Id=${id}`, faqData);
};

// Delete FAQ
export const deleteFAQ = async (id: number, lang: string = 'en'): Promise<void> => {
  return callAPI('delete', `/api/${lang}/FAQ/DeleteFAQ?Id=${id}`);
};
