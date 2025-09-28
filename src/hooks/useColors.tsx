import { createColor, deleteColor, updateColor } from '@/services/colors/ColorActions';
import { getAllColors, getColorById } from '@/services/colors/ColorService';
import { Color, CreateColorRequest, UpdateColorRequest } from '@/types/color';
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

// Query keys
export const colorKeys = {
  all: ['colors'] as const,
  lists: () => [...colorKeys.all, 'list'] as const,
  list: (lang: string) => [...colorKeys.lists(), lang] as const,
  details: () => [...colorKeys.all, 'detail'] as const,
  detail: (id: number, lang: string) => [...colorKeys.details(), id, lang] as const,
};

// Get all colors
export const useGetAllColors = (lang: string = 'en') => {
  return useQuery<Color[]>({
    queryKey: colorKeys.list(lang),
    queryFn: async () => {
      console.log('useGetAllColors - calling getAllColors with lang:', lang);
      const data = await getAllColors(lang);
      console.log('useGetAllColors - received data:', data);
      console.log('useGetAllColors - data type:', typeof data);
      console.log('useGetAllColors - data is array:', Array.isArray(data));
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get single color by ID
export const useGetColorById = (
  id: number,
  lang: string = 'en',
  options?: { enabled?: boolean },
) => {
  return useQuery<Color>({
    queryKey: colorKeys.detail(id, lang),
    queryFn: async () => {
      const data = await getColorById(id, lang);
      return data;
    },
    enabled: options?.enabled !== undefined ? options.enabled : !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Create color
export const useCreateColor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, lang = 'en' }: { data: CreateColorRequest; lang?: string }) => {
      return createColor(data, lang);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: colorKeys.lists() });
      toast.success('Color created successfully');
    },
    onError: (error: Error) => {
      const apiError = error as unknown as ApiError;
      toast.error(apiError?.response?.data?.message || 'Failed to create color');
    },
  });
};

// Update color
export const useUpdateColor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
      lang = 'en',
    }: {
      id: number;
      data: UpdateColorRequest;
      lang?: string;
    }) => {
      return updateColor(id, data, lang);
    },
    onSuccess: (updatedColor, variables) => {
      queryClient.invalidateQueries({ queryKey: colorKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: colorKeys.detail(variables.id, variables.lang || 'en'),
      });
      toast.success('Color updated successfully');
    },
    onError: (error: Error) => {
      const apiError = error as unknown as ApiError;
      toast.error(apiError?.response?.data?.message || 'Failed to update color');
    },
  });
};

// Delete color
export const useDeleteColor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, lang = 'en' }: { id: number; lang?: string }) => {
      return deleteColor(id, lang);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: colorKeys.lists() });
      toast.success('Color deleted successfully');
    },
    onError: (error: Error) => {
      const apiError = error as unknown as ApiError;
      toast.error(apiError?.response?.data?.message || 'Failed to delete color');
    },
  });
};
