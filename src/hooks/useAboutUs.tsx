import { createOrUpdateAboutUs, getAboutUs } from '@/services/about-us/AboutUsService';
import { AboutUsFormData } from '@/types/about-us';
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

export const useGetAboutUs = (lang: string = 'en') => {
  return useQuery({
    queryKey: ['aboutUs', lang],
    queryFn: async () => {
      const response = await getAboutUs(lang);
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateOrUpdateAboutUs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, lang }: { data: AboutUsFormData; lang: string }) => {
      const response = await createOrUpdateAboutUs(data, lang);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aboutUs'] });
      toast.success('تم حفظ معلومات من نحن بنجاح', {
        className: 'bg-green-500 text-white',
      });
      window.location.reload();
    },
    onError: (error: Error) => {
      const apiError = error as unknown as ApiError;
      toast.error(apiError?.response?.data?.message || 'فشل في حفظ المعلومات');
    },
  });
};
