import { createBrand, deleteBrand, updateBrand } from '@/services/brands/BrandActions';
import { getAllBrands, getBrandById } from '@/services/brands/BrandService';
import { Brand } from '@/types/brand';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// Define error type for API responses
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

// Transform API response to Brand type
// const transformBrandResponse = (response: GetBrandsResponse): BrandforAll[] => {
//   return response.brands.map(brand => ({
//     id: brand.id,
//     name: brand.name,
//     imageUrl: brand.imageUrl,
//     visibilityOrder: brand.visibilityOrder,
//     productsCount: brand.productsCount,
//     createdAt: brand.createdAt,
//     createdBy: brand.createdBy,
//   }));
// };

export const useGetAllBrands = (lang: string = 'en', page: number = 1, pageSize: number = 20) => {
  return useQuery({
    queryKey: ['brands', lang, page, pageSize],
    queryFn: async () => {
      const response = await getAllBrands(lang, page, pageSize);
      return {
        brands: response.brands,
        pagination: response.pagination,
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useGetBrandById = (id: string, lang: string = 'en') => {
  return useQuery({
    queryKey: ['brand', id, lang],
    queryFn: async () => {
      const response = await getBrandById(id, lang);
      return transformSingleBrandResponse(response);
    },
    enabled: !!id,
  });
};

const transformSingleBrandResponse = (brand: Brand): Brand => {
  return {
    id: brand.id,
    nameAr: brand.nameAr,
    nameEn: brand.nameEn,
    imageUrl: brand.imageUrl,
    visibilityOrder: brand.visibilityOrder,
  };
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ formData, lang }: { formData: FormData; lang: string }) => {
      const response = await createBrand(formData, lang);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      toast.success('Brand created successfully');
    },
    onError: (error: Error) => {
      const apiError = error as unknown as ApiError;
      toast.error(apiError?.response?.data?.message || 'Failed to create brand');
    },
  });
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      formData,
      lang,
    }: {
      id: string;
      formData: FormData;
      lang: string;
    }) => {
      const response = await updateBrand(id, formData, lang);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      toast.success('Brand updated successfully');
    },
    onError: (error: Error) => {
      const apiError = error as unknown as ApiError;
      toast.error(apiError?.response?.data?.message || 'Failed to update brand');
    },
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await deleteBrand(id);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      toast.success('Brand deleted successfully');
    },
    onError: (error: Error) => {
      const apiError = error as unknown as ApiError;
      toast.error(apiError?.response?.data?.message || 'Failed to delete brand');
    },
  });
};
