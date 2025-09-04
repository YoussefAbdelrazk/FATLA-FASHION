import {
  createOrUpdatePrivacyPolicy,
  getPrivacyPolicy,
} from '@/services/privacy-policy/PrivacyPolicyService';
import { PrivacyPolicyFormData } from '@/types/privacy-policy';
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

export const useGetPrivacyPolicy = (lang: string = 'en') => {
  return useQuery({
    queryKey: ['privacyPolicy', lang],
    queryFn: async () => {
      const response = await getPrivacyPolicy(lang);
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateOrUpdatePrivacyPolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, lang }: { data: PrivacyPolicyFormData; lang: string }) => {
      const response = await createOrUpdatePrivacyPolicy(data, lang);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['privacyPolicy'] });
      toast.success('تم حفظ سياسة الخصوصية بنجاح', {
        className: 'bg-green-500 text-white',
      });
      window.location.reload();
    },
    onError: (error: Error) => {
      const apiError = error as unknown as ApiError;
      toast.error(apiError?.response?.data?.message || 'فشل في حفظ سياسة الخصوصية');
    },
  });
};
