import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { dailyOrdersData } from '@/data';
import { MoreHorizontal } from 'lucide-react';

export default function DailyOrdersChart() {
  return (
    <Card className='border-0 shadow-lg bg-white dark:bg-black'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='text-xl font-bold text-black dark:text-white'>
              Daily Orders
            </CardTitle>
            <CardDescription className='text-gray-600 dark:text-gray-400'>
              Orders count for the last 7 days
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
            <span>Orders Count</span>
            <span>Max: {dailyOrdersData.maxOrders} orders</span>
          </div>
          <div className='flex items-end justify-between h-48 space-x-2'>
            {dailyOrdersData.data.map((item, index) => (
              <div key={index} className='flex flex-col items-center flex-1'>
                <div
                  className='relative w-full bg-gray-100 dark:bg-gray-800 rounded-t-lg'
                  style={{ height: `${(item.orders / dailyOrdersData.maxOrders) * 100}%` }}
                >
                  <div className='absolute inset-0 bg-black dark:bg-white rounded-t-lg'></div>
                </div>
                <div className='text-xs font-medium text-gray-600 dark:text-gray-400 mt-2'>
                  {item.day}
                </div>
                <div className='text-xs text-gray-500 dark:text-gray-500'>{item.orders}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
