import { createFAQ, updateFAQ, deleteFAQ } from '@/services/faq/FAQActions';
import { getAllFAQs, getFAQById } from '@/services/faq/FAQService';
import { CreateFAQRequest, FAQ, FAQDetail, UpdateFAQRequest } from '@/types/faq';
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
export const faqKeys = {
  all: ['faqs'] as const,
  lists: () => [...faqKeys.all, 'list'] as const,
  list: (lang: string) => [...faqKeys.lists(), lang] as const,
  details: () => [...faqKeys.all, 'detail'] as const,
  detail: (id: number, lang: string) => [...faqKeys.details(), id, lang] as const,
};

// Get all FAQs
export const useGetAllFAQs = (lang: string = 'en') => {
  return useQuery<FAQ[]>({
    queryKey: faqKeys.list(lang),
    queryFn: async () => {
      console.log('useGetAllFAQs - calling getAllFAQs with lang:', lang);
      const data = await getAllFAQs(lang);
      console.log('useGetAllFAQs - received data:', data);
      console.log('useGetAllFAQs - data type:', typeof data);
      console.log('useGetAllFAQs - data is array:', Array.isArray(data));
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get single FAQ by ID
export const useGetFAQById = (id: number, lang: string = 'en', options?: { enabled?: boolean }) => {
  return useQuery<FAQDetail>({
    queryKey: faqKeys.detail(id, lang),
    queryFn: async () => {
      const data = await getFAQById(id, lang);
      return data;
    },
    enabled: options?.enabled !== undefined ? options.enabled : !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Create FAQ
export const useCreateFAQ = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, lang = 'en' }: { data: CreateFAQRequest; lang?: string }) => {
      return createFAQ(data, lang);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: faqKeys.lists() });
      toast.success('FAQ created successfully');
    },
    onError: (error: Error) => {
      const apiError = error as unknown as ApiError;
      toast.error(apiError?.response?.data?.message || 'Failed to create FAQ');
    },
  });
};

// Update FAQ
export const useUpdateFAQ = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
      lang = 'en',
    }: {
      id: number;
      data: UpdateFAQRequest;
      lang?: string;
    }) => {
      return updateFAQ(id, data, lang);
    },
    onSuccess: (updatedFAQ, variables) => {
      queryClient.invalidateQueries({ queryKey: faqKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: faqKeys.detail(variables.id, variables.lang || 'en'),
      });
      toast.success('FAQ updated successfully');
    },
    onError: (error: Error) => {
      const apiError = error as unknown as ApiError;
      toast.error(apiError?.response?.data?.message || 'Failed to update FAQ');
    },
  });
};

// Delete FAQ
export const useDeleteFAQ = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, lang = 'en' }: { id: number; lang?: string }) => {
      return deleteFAQ(id, lang);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: faqKeys.lists() });
      toast.success('FAQ deleted successfully');
    },
    onError: (error: Error) => {
      const apiError = error as unknown as ApiError;
      toast.error(apiError?.response?.data?.message || 'Failed to delete FAQ');
    },
  });
};
