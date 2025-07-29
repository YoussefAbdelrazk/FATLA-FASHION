import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { topProductsData } from '@/data';
import { MoreHorizontal } from 'lucide-react';

export default function TopProductsCard() {
  return (
    <Card className='border-0 shadow-lg bg-white dark:bg-black'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='text-xl font-bold text-black dark:text-white'>
              Top 10 Products
            </CardTitle>
            <CardDescription className='text-gray-600 dark:text-gray-400'>
              Best selling products of all time
            </CardDescription>
          </div>
          <Button variant='outline' size='sm' className='border-gray-200 dark:border-gray-700'>
            <MoreHorizontal className='w-4 h-4' />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {topProductsData.products.map((product, index) => (
            <div
              key={index}
              className='flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors'
            >
              <div className='flex items-center space-x-3'>
                <div className='w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black font-bold text-sm'>
                  {index + 1}
                </div>
                <div>
                  <p className='font-semibold text-black dark:text-white'>{product.name}</p>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>{product.sales} sold</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-bold text-black dark:text-white'>{product.revenue} EGP</p>
                <Badge
                  variant='secondary'
                  className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                >
                  {product.growth}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
