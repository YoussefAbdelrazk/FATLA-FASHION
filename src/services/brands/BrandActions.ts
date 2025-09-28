'use server';

import { baseAPI, baseAPIForm, callAPI } from '@/lib/config';

export const createBrand = async (formData: FormData, lang: string = 'en') => {
  return callAPI('post', `/api/${lang}/Brands/AddNewBrand`, formData, {}, true);
};

export const updateBrand = async (id: string, formData: FormData, lang: string = 'en') => {
  return callAPI('post', `/api/${lang}/Brands/EditBrand?id=${id}`, formData, {}, true);
};

export const deleteBrand = async (id: number, lang: string = 'en') => {
  return callAPI('post', `/api/${lang}/Brands/DeleteBrand?id=${id}`);
};
