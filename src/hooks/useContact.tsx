'use client';

import { ContactFormData } from '@/lib/schemas/contact-schema';
import { createContactInfo, updateContactInfo } from '@/services/contact/ContactActions';
import { getContactInfo } from '@/services/contact/ContactService';
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
export const contactKeys = {
  all: ['contact'] as const,
  info: (lang: string) => [...contactKeys.all, 'info', lang] as const,
};

// Get contact info
export const useGetContactInfo = (lang: string = 'en') => {
  return useQuery({
    queryKey: contactKeys.info(lang),
    queryFn: async () => {
      const response = await getContactInfo(lang);
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Create contact info
export const useCreateContactInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, lang = 'en' }: { data: ContactFormData; lang?: string }) => {
      const response = await createContactInfo(data, lang);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactKeys.all });
      toast.success('تم حفظ معلومات التواصل بنجاح!');
    },
    onError: (error: Error) => {
      const apiError = error as unknown as ApiError;
      console.error('Error saving contact information:', error);
      toast.error(
        apiError?.response?.data?.message || 'فشل في حفظ معلومات التواصل. يرجى المحاولة مرة أخرى.',
      );
    },
  });
};

// Update contact info
export const useUpdateContactInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, lang = 'en' }: { data: ContactFormData; lang?: string }) => {
      const response = await updateContactInfo(data, lang);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactKeys.all });
      toast.success('تم تحديث معلومات التواصل بنجاح!');
    },
    onError: (error: Error) => {
      const apiError = error as unknown as ApiError;
      console.error('Error updating contact information:', error);
      toast.error(
        apiError?.response?.data?.message ||
          'فشل في تحديث معلومات التواصل. يرجى المحاولة مرة أخرى.',
      );
    },
  });
};

// Legacy hook for backward compatibility (deprecated)
export function useContact() {
  const createMutation = useCreateContactInfo();
  const updateMutation = useUpdateContactInfo();

  return {
    saveContactInfo: createMutation.mutate,
    updateContact: updateMutation.mutate,

    isLoading: createMutation.isPending || updateMutation.isPending,
  };
}
