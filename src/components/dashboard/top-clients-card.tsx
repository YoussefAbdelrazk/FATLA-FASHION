'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetDashboardData } from '@/hooks/useDashboard';
import { MoreHorizontal } from 'lucide-react';

export default function TopClientsCard() {
  const { data: dashboardData, isLoading, error } = useGetDashboardData();

  if (isLoading) {
    return (
      <Card className='border-0 shadow-lg bg-white dark:bg-black'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='text-xl font-bold text-black dark:text-white'>
                أفضل العملاء
              </CardTitle>
              <CardDescription className='text-gray-600 dark:text-gray-400'>
                أكثر العملاء قيمة
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {[...Array(3)].map((_, i) => (
              <div key={i} className='animate-pulse'>
                <div className='h-16 bg-gray-200 dark:bg-gray-700 rounded-xl'></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className='border-0 shadow-lg bg-white dark:bg-black'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='text-xl font-bold text-black dark:text-white'>
                أفضل العملاء
              </CardTitle>
              <CardDescription className='text-gray-600 dark:text-gray-400'>
                أكثر العملاء قيمة
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='text-center py-8 text-red-500'>خطأ في تحميل البيانات</div>
        </CardContent>
      </Card>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const { topClients } = dashboardData;

  return (
    <Card className='border-0 shadow-lg bg-white dark:bg-black'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='text-xl font-bold text-black dark:text-white'>
              أفضل العملاء
            </CardTitle>
            <CardDescription className='text-gray-600 dark:text-gray-400'>
              أكثر العملاء قيمة
            </CardDescription>
          </div>
          <Button variant='outline' size='sm' className='border-gray-200 dark:border-gray-700'>
            <MoreHorizontal className='w-4 h-4' />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {topClients.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>لا توجد بيانات متاحة</div>
          ) : (
            topClients.map((client, index) => (
              <div
                key={client.id}
                className='flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors'
              >
                <div className='flex items-center space-x-3'>
                  <div className='w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black font-bold text-sm'>
                    {index + 1}
                  </div>
                  <div>
                    <p className='font-semibold text-black dark:text-white'>
                      {client.firstName} {client.lastName}
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      {client.ordersCount} طلب
                    </p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-bold text-black dark:text-white'>
                    {client.totalSpent.toLocaleString()} جنيه
                  </p>
                  <Badge
                    variant='secondary'
                    className='bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  >
                    عميل
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
