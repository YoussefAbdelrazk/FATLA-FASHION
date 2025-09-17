'use client';

import { useGetDashboardData } from '@/hooks/useDashboard';
import { DollarSign, Package, ShoppingBag, Users } from 'lucide-react';
import StatisticsCard from './statistics-card';

export default function StatisticsGrid() {
  const { data: dashboardData, isLoading, error } = useGetDashboardData();

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {[...Array(4)].map((_, i) => (
          <div key={i} className='animate-pulse'>
            <div className='bg-gray-200 dark:bg-gray-700 rounded-lg h-32'></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center py-8 text-red-500'>
        خطأ في تحميل البيانات: {error instanceof Error ? error.message : 'حدث خطأ غير متوقع'}
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const { statistics } = dashboardData;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      <StatisticsCard
        title='إجمالي المستخدمين'
        value={statistics.totalUsers.toString()}
        change={statistics.ordersCount.change}
        changeType={statistics.ordersCount.changeType}
        icon={Users}
      />
      <StatisticsCard
        title='إجمالي الطلبات اليوم'
        value={statistics.ordersCount.today.toString()}
        change={statistics.ordersCount.change}
        changeType={statistics.ordersCount.changeType}
        icon={ShoppingBag}
        subtitle={`مقارنة بالأمس: ${statistics.ordersCount.yesterday}`}
      />
      <StatisticsCard
        title='إجمالي الإيرادات اليوم'
        value={`${statistics.ordersEGP.today.toLocaleString()} جنيه`}
        change={statistics.ordersEGP.change}
        changeType={statistics.ordersEGP.changeType}
        icon={DollarSign}
        subtitle={`مقارنة بالأمس: ${statistics.ordersEGP.yesterday.toLocaleString()} جنيه`}
      />
      <StatisticsCard
        title='إجمالي المنتجات'
        value={statistics.totalProducts.toString()}
        change={0}
        changeType='increase'
        icon={Package}
        subtitle='إجمالي المنتجات المتاحة'
      />
    </div>
  );
}
