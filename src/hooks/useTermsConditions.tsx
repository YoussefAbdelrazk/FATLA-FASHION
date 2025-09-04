import { getTermsConditions, createOrUpdateTermsConditions } from '@/services/terms-conditions/TermsConditionsService';
import { TermsConditions, TermsConditionsFormData } from '@/types/terms-conditions';
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

export const useGetTermsConditions = (lang: string = 'en') => {
  return useQuery({
    queryKey: ['termsConditions', lang],
    queryFn: async () => {
      const response = await getTermsConditions(lang);
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateOrUpdateTermsConditions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, lang }: { data: TermsConditionsFormData; lang: string }) => {
      const response = await createOrUpdateTermsConditions(data, lang);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['termsConditions'] });
      toast.success('تم حفظ الشروط والأحكام بنجاح');
    },
    onError: (error: Error) => {
      const apiError = error as unknown as ApiError;
      toast.error(apiError?.response?.data?.message || 'فشل في حفظ الشروط والأحكام');
    },
  });
};
