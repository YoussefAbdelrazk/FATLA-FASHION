import baseAPI from '@/lib/config';
import { DashboardResponse } from '@/types/dashboard';

// Get dashboard data
export const getDashboardData = async (lang: string = 'ar'): Promise<DashboardResponse> => {
  try {
    const api = await baseAPI();
    const response = await api.get(`/api/${lang}/AdminDashboard/GetDashboard`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};
