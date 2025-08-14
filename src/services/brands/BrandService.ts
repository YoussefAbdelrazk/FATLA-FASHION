'use server';

import baseAPI, { baseAPIForm } from '@/lib/config';
import { Brand, BrandforAll } from '@/types/brand';
export interface GetBrandsResponse {
  brands: BrandforAll[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
  };
}

export const getAllBrands = async (
  lang: string = 'en',
  page: number = 1,
  pageSize: number = 20,
): Promise<GetBrandsResponse> => {
  try {
    const api = await baseAPI();
    const response = await api.get(`/api/${lang}/Brands/GetAllBrands`, {
      params: { page, pageCount: pageSize },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBrandById = async (id: string, lang: string = 'en'): Promise<Brand> => {
  try {
    const api = await baseAPI();
    const response = await api.get(`/api/${lang}/Brands/GetSingleBrand?id=${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

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
