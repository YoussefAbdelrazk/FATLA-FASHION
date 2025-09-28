import { callAPI } from '@/lib/config';
import { Color } from '@/types/color';

// Get all colors
export const getAllColors = async (lang: string = 'en'): Promise<Color[]> => {
  return callAPI('get', `/api/${lang}/Colors`);
};

// Get single color by ID
export const getColorById = async (id: number, lang: string = 'en'): Promise<Color> => {
  return callAPI('get', `/api/${lang}/Colors/${id}`);
};
