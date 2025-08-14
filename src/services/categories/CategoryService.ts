import baseAPI from '@/lib/config';

export interface CreateCategoryData {
  arName: string;
  enName: string;
  image: string;
}

export interface GetCategoriesResponse {
  id: number;
  nameAr: string;
  nameEn: string;
  imageUrl: string;
  productsCount: number;
  createdBy: string;
}

export interface CreateCategoryResponse {
  message: string;
  category: {
    id: number;
    nameAr: string;
    nameEn: string;
    imageUrl: string;
  };
}

export interface UpdateCategoryData extends Partial<CreateCategoryData> {
  id: string;
}

// Get all categories
export const getAllCategories = async (lang: string = 'en'): Promise<GetCategoriesResponse[]> => {
  try {
    const api = await baseAPI();
    const response = await api.get(`/api/${lang}/Categories/GetCategories`);
    console.log('GetCategories response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Get single category by ID
export const getCategoryById = async (
  id: string,
  lang: string = 'en',
): Promise<GetCategoriesResponse> => {
  try {
    const api = await baseAPI();
    const response = await api.get(`/api/${lang}/Categories/GetSingleCategory?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
};

// Create new category
export const createCategory = async (
  data: CreateCategoryData,
  lang: string = 'en',
): Promise<CreateCategoryResponse> => {
  try {
    const api = await baseAPI();
    const response = await api.post(`/api/${lang}/Categories/CreateCategory`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

// Update category
export const updateCategory = async (
  data: UpdateCategoryData,
  lang: string = 'en',
): Promise<GetCategoriesResponse> => {
  try {
    const { id, ...updateData } = data;
    const api = await baseAPI();
    const response = await api.put(`/api/${lang}/Categories/EditCategory?id=${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

// Delete category
export const deleteCategory = async (id: string, lang: string = 'en'): Promise<void> => {
  try {
    const api = await baseAPI();
    await api.delete(`/api/${lang}/Categories/DeleteCategory?id=${id}`);
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};
