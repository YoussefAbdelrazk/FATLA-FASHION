import { callAPI } from '@/lib/config';
import { CreateColorRequest, UpdateColorRequest } from '@/types/color';

// Create new color
export const createColor = async (colorData: CreateColorRequest, lang: string = 'en') => {
  return callAPI('post', `/api/${lang}/Colors`, colorData);
};

// Update color
export const updateColor = async (
  id: number,
  colorData: UpdateColorRequest,
  lang: string = 'en',
) => {
  return callAPI('put', `/api/${lang}/Colors/${id}`, colorData);
};

// Delete color
export const deleteColor = async (id: number, lang: string = 'en') => {
  return callAPI('delete', `/api/${lang}/delete/${id}`);
};
