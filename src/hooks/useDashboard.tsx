import { getDashboardData } from '@/services/dashboard/DashboardService';
import { DashboardResponse } from '@/types/dashboard';
import { useQuery } from '@tanstack/react-query';


// Query keys
export const dashboardKeys = {
  all: ['dashboard'] as const,
  data: (lang: string) => [...dashboardKeys.all, 'data', lang] as const,
};

// Get dashboard data
export const useGetDashboardData = (lang: string = 'ar') => {
  return useQuery({
    queryKey: dashboardKeys.data(lang),
    queryFn: async (): Promise<DashboardResponse> => {
      const response = await getDashboardData(lang);
      return response;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes (dashboard data changes frequently)
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};
