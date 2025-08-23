'use server';

import { baseAPI, baseAPIForm } from '@/lib/config';
import { Slider } from '@/types/slider';

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
