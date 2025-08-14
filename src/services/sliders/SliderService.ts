'use server';
import baseAPI, { baseAPIForm } from '@/lib/config';

import { Slider } from '@/types/slider';

export interface CreateSliderData {
  arName: string;
  enName: string;
  arImage: string;
  enImage: string;
  brandName?: string;
  productName?: string;
  categoryName?: string;
  isVisible: boolean;
}

export interface GetSlidersResponse {
  brandId: null;
  nameAr: string;
  nameEn: string;
  imageUrlAr: string;
  imageUrlEn: string;
  categoryId: null;
  variantId: null;
  createdBy: string;
  id: number;
  brandName: null;
  categoryName: null;
  variantName: null;
}

// export interface CreateSliderResponse {
//   message: string;
//   slider: {
//     id?: number;
//     nameAr: string;
//     nameEn: string;
//     imageUrlAr: string;
//     imageUrlEn: string;
//     brandId: number;
//     categoryId: number;
//     variantId: number;
//   };
// }

// Get all sliders
export const getAllSliders = async (lang: string = 'en'): Promise<GetSlidersResponse[]> => {
  try {
    const api = await baseAPI();
    const response = await api.get(`/api/${lang}/Sliders/GetSliders`);
    console.log('GetSliders response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching sliders:', error);
    throw error;
  }
};

// Get single slider by ID
export const getSliderById = async (
  id: string,
  lang: string = 'en',
): Promise<GetSlidersResponse> => {
  try {
    const api = await baseAPI();
    const response = await api.get(`/api/${lang}/Sliders/GetSingleSlider?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching slider:', error);
    throw error;
  }
};

// Create new slider
export const createSlider = async (data: FormData, lang: string = 'en') => {
  try {
    const api = await baseAPIForm();
    const response = await api.post(`/api/${lang}/Sliders/CreateSlider`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating slider:', error);
    throw error;
  }
};

// Update slider
export const updateSlider = async (
  data: FormData,
  id: string,
  lang: string = 'en',
): Promise<Slider> => {
  try {
    const api = await baseAPIForm();
    const response = await api.post(`/api/${lang}/Sliders/EditSlider?id=${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating slider:', error);
    throw error;
  }
};

// Delete slider
export const deleteSlider = async (id: number, lang: string = 'en') => {
  try {
    const api = await baseAPI();
    await api.post(`/api/${lang}/Sliders/DeleteSlider?id=${id}`);
  } catch (error) {
    console.error('Error deleting slider:', error);
    throw error;
  }
};

// Toggle slider visibility
export const toggleSliderVisibility = async (
  id: string,
  isVisible: boolean,
  lang: string = 'en',
): Promise<Slider> => {
  try {
        const api = await baseAPI();
        const response = await api.patch(`/api/${lang}/Sliders/ToggleVisibility?id=${id}`, {
          isVisible,
        });
    return response.data;
  } catch (error) {
    console.error('Error toggling slider visibility:', error);
    throw error;
  }
};
