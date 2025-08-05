import baseAPI, { baseAPIForm } from '@/lib/config';
import { Brand, CreateBrandData, UpdateBrandData } from '@/types/brand';

export interface BrandResponse {
  brands: Brand[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
  };
}

// Get all brands
export const getAllBrands = async (
  page: number = 1,
  pageSize: number = 20,
): Promise<BrandResponse> => {
  const response = await baseAPI.get('/api/en/Brands/GetAllBrands', {
    params: { page, pageSize },
  });
  console.log(response.data);
  return response.data;
};

// Get brand by ID
export const getBrandById = async (id: number): Promise<Brand> => {
  const response = await baseAPI.get(`/api/en/Brands/GetSingleBrand?id=${id}`);
  return response.data;
};

// Create brand
export const createBrand = async (data: CreateBrandData): Promise<Brand> => {
  const response = await baseAPIForm.post('/api/en/Brands/AddNewBrand', data);
  return response.data;
};

// Update brand
export const updateBrand = async (data: UpdateBrandData): Promise<Brand> => {
  const { id, ...updateData } = data;
  const response = await baseAPIForm.put(`/api/en/Brands/UpdateBrand?id=${id}`, updateData);
  return response.data;
};

// Delete brand
export const deleteBrand = async (id: number) => {
  const response = await baseAPI.post(`/api/en/Brands/DeleteBrand?id=${id}`);
  console.log(response.data);
  return response.data;
};

// Update brand visibility order
export const updateBrandVisibilityOrder = async (
  id: number,
  visibilityOrder: number,
): Promise<Brand> => {
  const response = await baseAPI.patch(`/api/en/Brands/UpdateVisibilityOrder/${id}`, {
    visibilityOrder,
  });
  return response.data;
};
