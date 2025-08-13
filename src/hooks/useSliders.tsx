import {
  GetSlidersResponse,
  createSlider,
  deleteSlider,
  getAllSliders,
  getSliderById,
  toggleSliderVisibility,
  updateSlider,
} from '@/services/sliders/SliderService';
import { Slider } from '@/types/slider';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

// Query keys
export const sliderKeys = {
  all: ['sliders'] as const,
  lists: () => [...sliderKeys.all, 'list'] as const,
  list: (filters: string) => [...sliderKeys.lists(), { filters }] as const,
  details: () => [...sliderKeys.all, 'detail'] as const,
  detail: (id: string) => [...sliderKeys.details(), id] as const,
};

// Get all sliders
export const useGetAllSliders = (lang: string = 'en') => {
  return useQuery<Slider[]>({
    queryKey: [...sliderKeys.lists(), lang],
    queryFn: async () => {
      const data = await getAllSliders(lang);
      // Transform API response to match Slider type
      return data.map((item: GetSlidersResponse) => ({
        id: item.id,
        nameAr: item.nameAr,
        nameEn: item.nameEn,
        imageUrlAr: item.imageUrlAr,
        imageUrlEn: item.imageUrlEn,
        brandId: item.brandId,
        categoryId: item.categoryId,
        variantId: item.variantId,
        brandName: item.brandName,
        categoryName: item.categoryName,
        variantName: item.variantName,
        createdBy: item.createdBy,
        isVisible: true, // Default to true since API doesn't provide this
        createdAt: new Date().toISOString(), // Default since API doesn't provide this
      }));
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get single slider by ID
export const useGetSliderById = (id: string, lang: string = 'en') => {
  return useQuery<Slider>({
    queryKey: [...sliderKeys.detail(id), lang],
    queryFn: async () => {
      const data = await getSliderById(id, lang);
      // Transform API response to match Slider type
      // return {
      //   id: data.id,
      //   nameAr: data.nameAr,
      //   nameEn: data.nameEn,
      //   imageUrlAr: data.imageUrlAr,
      //   imageUrlEn: data.imageUrlEn,
      //   brandId: data.brandId,
      //   categoryId: data.categoryId,
      //   variantId: data.variantId,
      //   brandName: data.brandName,
      //   categoryName: data.categoryName,
      //   variantName: data.variantName,
      //   createdBy: data.createdBy,
      //   isVisible: true, // Default to true since API doesn't provide this
      //   createdAt: new Date().toISOString(), // Default since API doesn't provide this
      // };
      return data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Create slider
export const useCreateSlider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, lang = 'en' }: { data: FormData; lang?: string }) => {
      return createSlider(data, lang);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sliderKeys.lists() });
      toast.success('Slider created successfully');
    },
    onError: (error: Error) => {
      console.error('Error creating slider:', error);
      toast.error('Failed to create slider');
    },
  });
};

// Update slider
export const useUpdateSlider = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: ({ data, id, lang = 'en' }: { data: FormData; id: string; lang?: string }) =>
      updateSlider(data, id, lang),
    onSuccess: updatedSlider => {
      toast.success('Slider updated successfully');
      router.push('/sliders');
      queryClient.invalidateQueries({ queryKey: sliderKeys.lists() });
      queryClient.invalidateQueries({ queryKey: sliderKeys.detail(updatedSlider.id.toString()) });
    },
    // onError: (error: Error) => {
    //   console.error('Error updating slider:', error);
    //   toast.error('Failed to update slider');
    // },
  });
};

// Delete slider
export const useDeleteSlider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, lang = 'en' }: { id: string; lang?: string }) =>
      deleteSlider(parseInt(id), lang),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sliderKeys.lists() });
      toast.success('Slider deleted successfully');
    },
    onError: (error: Error) => {
      console.error('Error deleting slider:', error);
      toast.error('Failed to delete slider');
    },
  });
};

// Toggle slider visibility
export const useToggleSliderVisibility = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      isVisible,
      lang = 'en',
    }: {
      id: string;
      isVisible: boolean;
      lang?: string;
    }) => toggleSliderVisibility(id, isVisible, lang),
    onSuccess: updatedSlider => {
      queryClient.invalidateQueries({ queryKey: sliderKeys.lists() });
      queryClient.invalidateQueries({ queryKey: sliderKeys.detail(updatedSlider.id.toString()) });
      // Since the Slider type doesn't have isVisible, we'll use a generic success message
      toast.success('Slider visibility updated successfully');
    },
    onError: (error: Error) => {
      console.error('Error toggling slider visibility:', error);
      toast.error('Failed to toggle slider visibility');
    },
  });
};
