import {
  CreateSliderData,
  GetSlidersResponse,
  UpdateSliderData,
  createSlider,
  deleteSlider,
  getAllSliders,
  getSliderById,
  toggleSliderVisibility,
  updateSlider,
} from '@/services/sliders/SliderService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
  return useQuery({
    queryKey: [...sliderKeys.lists(), lang],
    queryFn: async () => {
      const data = await getAllSliders(lang);
      // Transform API response to match Slider type
      return data.map((item: GetSlidersResponse) => ({
        id: item.id.toString(),
        arName: item.nameAr,
        enName: item.nameEn,
        arImage: item.imageUrlAr,
        enImage: item.imageUrlEn,
        brandName: item.brandName || '',
        productName: item.variantName || '',
        categoryName: item.categoryName || '',
        isVisible: true, // Default to true since API doesn't provide this
        createdAt: new Date().toISOString(), // Default since API doesn't provide this
        createdBy: item.createdBy || '',
      }));
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get single slider by ID
export const useGetSliderById = (id: string, lang: string = 'en') => {
  return useQuery({
    queryKey: [...sliderKeys.detail(id), lang],
    queryFn: async () => {
      const data = await getSliderById(id, lang);
      // Transform API response to match Slider type
      return {
        id: data.id.toString(),
        arName: data.nameAr,
        enName: data.nameEn,
        arImage: data.imageUrlAr,
        enImage: data.imageUrlEn,
        brandName: data.brandName || '',
        productName: data.variantName || '',
        categoryName: data.categoryName || '',
        isVisible: true, // Default to true since API doesn't provide this
        createdAt: new Date().toISOString(), // Default since API doesn't provide this
        createdBy: data.createdBy || '',
      };
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
    mutationFn: ({ data, lang = 'en' }: { data: CreateSliderData; lang?: string }) =>
      createSlider(data, lang),
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

  return useMutation({
    mutationFn: ({ data, lang = 'en' }: { data: UpdateSliderData; lang?: string }) =>
      updateSlider(data, lang),
    onSuccess: updatedSlider => {
      queryClient.invalidateQueries({ queryKey: sliderKeys.lists() });
      queryClient.invalidateQueries({ queryKey: sliderKeys.detail(updatedSlider.id) });
      toast.success('Slider updated successfully');
    },
    onError: (error: Error) => {
      console.error('Error updating slider:', error);
      toast.error('Failed to update slider');
    },
  });
};

// Delete slider
export const useDeleteSlider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, lang = 'en' }: { id: number; lang?: string }) => deleteSlider(id, lang),
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
      queryClient.invalidateQueries({ queryKey: sliderKeys.detail(updatedSlider.id) });
      toast.success(updatedSlider.isVisible ? 'Slider is now visible' : 'Slider is now hidden');
    },
    onError: (error: Error) => {
      console.error('Error toggling slider visibility:', error);
      toast.error('Failed to toggle slider visibility');
    },
  });
};
