import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  updateBrandVisibilityOrder,
} from '@/services/brands/BrandService';
import { Brand, CreateBrandData, UpdateBrandData } from '@/types/brand';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// Query keys
export const brandKeys = {
  all: ['brands'] as const,
  lists: () => [...brandKeys.all, 'list'] as const,
  list: (filters: string) => [...brandKeys.lists(), { filters }] as const,
  details: () => [...brandKeys.all, 'detail'] as const,
  detail: (id: string | number) => [...brandKeys.details(), id.toString()] as const,
};

// Get all brands
export const useGetAllBrands = (page: number = 1, pageSize: number = 20) => {
  return useQuery({
    queryKey: brandKeys.lists(),
    queryFn: () => getAllBrands(page, pageSize),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get single brand by ID
export const useGetBrandById = (id: number) => {
  return useQuery({
    queryKey: brandKeys.detail(id.toString()),
    queryFn: () => getBrandById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Create brand
export const useCreateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBrandData) => createBrand(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandKeys.lists() });
      toast.success('Brand created successfully');
    },
    onError: (error: Error) => {
      console.error('Error creating brand:', error);
      toast.error('Failed to create brand');
    },
  });
};

// Update brand
export const useUpdateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateBrandData) => updateBrand(data),
    onSuccess: updatedBrand => {
      queryClient.invalidateQueries({ queryKey: brandKeys.lists() });
      queryClient.invalidateQueries({ queryKey: brandKeys.detail(updatedBrand.id) });
      toast.success('Brand updated successfully');
    },
    onError: (error: Error) => {
      console.error('Error updating brand:', error);
      toast.error('Failed to update brand');
    },
  });
};

// Delete brand
export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteBrand(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandKeys.lists() });
      toast.success('Brand deleted successfully');
    },
    onError: (error: Error) => {
      console.error('Error deleting brand:', error);
      toast.error('Failed to delete brand');
    },
  });
};

// Update brand visibility order
export const useUpdateBrandVisibilityOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, visibilityOrder }: { id: number; visibilityOrder: number }) =>
      updateBrandVisibilityOrder(id, visibilityOrder),
    onSuccess: (updatedBrand: Brand) => {
      queryClient.invalidateQueries({ queryKey: brandKeys.lists() });
      queryClient.invalidateQueries({ queryKey: brandKeys.detail(updatedBrand.id.toString()) });
      toast.success('Brand visibility order updated successfully');
    },
    onError: (error: Error) => {
      console.error('Error updating brand visibility order:', error);
      toast.error('Failed to update brand visibility order');
    },
  });
};
