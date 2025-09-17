'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetDashboardData } from '@/hooks/useDashboard';
import { MoreHorizontal } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function DailyOrdersChart() {
  const { data: dashboardData, isLoading, error } = useGetDashboardData();

  if (isLoading) {
    return (
      <Card className='border-0 shadow-lg bg-white dark:bg-black'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='text-xl font-bold text-black dark:text-white'>
                الطلبات اليومية
              </CardTitle>
              <CardDescription className='text-gray-600 dark:text-gray-400'>
                عدد الطلبات خلال آخر 30 يوم
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='h-64 flex items-center justify-center'>
            <div className='animate-pulse text-gray-500'>جاري التحميل...</div>
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
                الطلبات اليومية
              </CardTitle>
              <CardDescription className='text-gray-600 dark:text-gray-400'>
                عدد الطلبات خلال آخر 30 يوم
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='h-64 flex items-center justify-center text-red-500'>
            خطأ في تحميل البيانات
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const { barChart } = dashboardData;
  const maxOrders = Math.max(...barChart.data.map(item => item.ordersCount));

  return (
    <Card className='border-0 shadow-lg bg-white dark:bg-black'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='text-xl font-bold text-black dark:text-white'>
              الطلبات اليومية
            </CardTitle>
            <CardDescription className='text-gray-600 dark:text-gray-400'>
              عدد الطلبات خلال آخر 30 يوم
            </CardDescription>
          </div>
          <Button variant='outline' size='sm' className='border-gray-200 dark:border-gray-700'>
            <MoreHorizontal className='w-4 h-4' />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4'>
            <span>{barChart.yAxisLabel}</span>
            <span>الحد الأقصى: {maxOrders} طلب</span>
          </div>
          <div className='h-64'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={barChart.data}>
                <CartesianGrid strokeDasharray='3 3' stroke='#374151' opacity={0.1} />
                <XAxis
                  dataKey='date'
                  stroke='#6B7280'
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke='#6B7280'
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={value => `${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                  labelStyle={{ color: '#374151', fontWeight: '600' }}
                  formatter={(value: number) => [`${value} طلب`, 'الطلبات']}
                />
                <Bar
                  dataKey='ordersCount'
                  fill='#000000'
                  radius={[4, 4, 0, 0]}
                  className='dark:fill-white'
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
