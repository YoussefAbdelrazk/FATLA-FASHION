import { callAPI } from '@/lib/config';
import { CreateFAQRequest, FAQ, FAQDetail, UpdateFAQRequest } from '@/types/faq';

export interface GetFAQsResponse {
  faqs: FAQ[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
  };
}

// Get all FAQs
export const getAllFAQs = async (lang: string = 'en'): Promise<FAQ[]> => {
  return callAPI('get', `/api/${lang}/FAQ/GetAllFAQ`);
};

// Get single FAQ by ID
export const getFAQById = async (id: number, lang: string = 'en'): Promise<FAQDetail> => {
  return callAPI('get', `/api/${lang}/FAQ/GetFAQById?Id=${id}`);
};


