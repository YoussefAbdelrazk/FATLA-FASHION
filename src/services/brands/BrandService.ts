import { callAPI } from '@/lib/config';
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
  return callAPI('get', `/api/${lang}/Brands/GetAllBrands`, {
    params: { page, pageCount: pageSize },
  });
};

export const getBrandById = async (id: string, lang: string = 'en'): Promise<Brand> => {
  return callAPI('get', `/api/${lang}/Brands/GetSingleBrand?id=${id}`);
};
