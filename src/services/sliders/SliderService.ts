import { callAPI } from '@/lib/config';

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
  return callAPI('get', `/api/${lang}/Sliders/GetSliders`);
};

// Get single slider by ID
export const getSliderById = async (id: string, lang: string = 'en'): Promise<GetSlidersResponse> => {
  return callAPI('get', `/api/${lang}/Sliders/GetSingleSlider?id=${id}`);
};
