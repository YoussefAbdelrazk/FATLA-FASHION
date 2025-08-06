import {
  CreateCategoryData,
  GetCategoriesResponse,
  UpdateCategoryData,
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '@/services/categories/CategoryService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// Query keys
export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: (filters: string) => [...categoryKeys.lists(), { filters }] as const,
  details: () => [...categoryKeys.all, 'detail'] as const,
  detail: (id: string) => [...categoryKeys.details(), id] as const,
};

// Get all categories
export const useGetAllCategories = (lang: string = 'en') => {
  return useQuery({
    queryKey: [...categoryKeys.lists(), lang],
    queryFn: async () => {
      const data = await getAllCategories(lang);
      // Transform API response to match Category type
      return data.map((item: GetCategoriesResponse) => ({
        id: item.id.toString(),
        arName: item.nameAr,
        enName: item.nameEn,
        image: item.imageUrl,
        productsCount: item.productsCount || 0,
        createdAt: new Date().toISOString(), // Default since API doesn't provide this
        createdBy: item.createdBy || '',
      }));
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get single category by ID
export const useGetCategoryById = (id: string, lang: string = 'en') => {
  return useQuery({
    queryKey: [...categoryKeys.detail(id), lang],
    queryFn: async () => {
      const data = await getCategoryById(id, lang);
      // Transform API response to match Category type
      return {
        id: data.id.toString(),
        arName: data.nameAr,
        enName: data.nameEn,
        image: data.imageUrl,
        productsCount: data.productsCount || 0,
        createdAt: new Date().toISOString(), // Default since API doesn't provide this
        createdBy: data.createdBy || '',
      };
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Create category
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, lang = 'en' }: { data: CreateCategoryData; lang?: string }) =>
      createCategory(data, lang),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
      toast.success('Category created successfully');
    },
    onError: (error: Error) => {
      console.error('Error creating category:', error);
      toast.error('Failed to create category');
    },
  });
};

// Update category
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, lang = 'en' }: { data: UpdateCategoryData; lang?: string }) =>
      updateCategory(data, lang),
    onSuccess: updatedCategory => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: categoryKeys.detail(updatedCategory.id.toString()),
      });
      toast.success('Category updated successfully');
    },
    onError: (error: Error) => {
      console.error('Error updating category:', error);
      toast.error('Failed to update category');
    },
  });
};

// Delete category
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, lang = 'en' }: { id: string; lang?: string }) => deleteCategory(id, lang),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
      toast.success('Category deleted successfully');
    },
    onError: (error: Error) => {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    },
  });
};
