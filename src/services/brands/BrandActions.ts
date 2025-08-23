'use server';

import { baseAPI, baseAPIForm } from '@/lib/config';

export const createBrand = async (formData: FormData, lang: string = 'en') => {
  try {
    const api = await baseAPIForm();
    const response = await api.post(`/api/${lang}/Brands/AddNewBrand`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBrand = async (id: string, formData: FormData, lang: string = 'en') => {
  try {
    const api = await baseAPIForm();
    const response = await api.post(`/api/${lang}/Brands/EditBrand?id=${id}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBrand = async (id: number, lang: string = 'en') => {
  try {
    const api = await baseAPI();
    const response = await api.post(`/api/${lang}/Brands/DeleteBrand?id=${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
