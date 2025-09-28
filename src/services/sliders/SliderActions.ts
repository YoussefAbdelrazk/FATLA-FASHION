'use server';

import { baseAPI, baseAPIForm, callAPI } from '@/lib/config';
import { Slider } from '@/types/slider';

// Create new slider
export const createSlider = async (data: FormData, lang: string = 'en') => {
  return callAPI('post', `/api/${lang}/Sliders/CreateSlider`, data, {}, true);
};

// Update slider
export const updateSlider = async (
  data: FormData,
  id: string,
  lang: string = 'en',
): Promise<Slider> => {
  return callAPI('post', `/api/${lang}/Sliders/EditSlider?id=${id}`, data, {}, true);
};

// Delete slider
export const deleteSlider = async (id: number, lang: string = 'en') => {
  return callAPI('post', `/api/${lang}/Sliders/DeleteSlider?id=${id}`);
};
