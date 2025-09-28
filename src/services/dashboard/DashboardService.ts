import { callAPI } from '@/lib/config';
import { DashboardResponse } from '@/types/dashboard';

// Get dashboard data
export const getDashboardData = async (lang: string = 'ar'): Promise<DashboardResponse> => {
  return callAPI('get', `/api/${lang}/AdminDashboard/GetDashboard`);
};
