import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { restockProductsData } from '@/data';
import { AlertTriangle, Package } from 'lucide-react';

export default function RestockProductsCard() {
  return (
    <Card className='border-0 shadow-lg bg-white dark:bg-black'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='text-xl font-bold text-black dark:text-white'>
              المنتجات تحتاج إعادة تخزين
            </CardTitle>
            <CardDescription className='text-gray-600 dark:text-gray-400'>
              العناصر ذات المخزون المنخفض التي تحتاج انتباه
            </CardDescription>
          </div>
          <Button
            variant='outline'
            size='sm'
            className='text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20'
          >
            <AlertTriangle className='w-4 h-4 mr-2' />
            عرض الكل
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {restockProductsData.products.map((product, index) => (
            <div
              key={index}
              className='flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors'
            >
              <div className='flex items-center space-x-3'>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    product.urgency === 'Critical'
                      ? 'bg-red-500'
                      : product.urgency === 'High'
                      ? 'bg-orange-500'
                      : 'bg-yellow-500'
                  }`}
                >
                  <Package className='w-5 h-5 text-white' />
                </div>
                <div>
                  <p className='font-semibold text-black dark:text-white'>{product.name}</p>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    الحالي: {product.current} | الحد الأدنى: {product.min}
                  </p>
                </div>
              </div>
              <div className='text-right'>
                <Badge
                  variant='secondary'
                  className={
                    product.urgency === 'Critical'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : product.urgency === 'High'
                      ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }
                >
                  {product.urgency === 'Critical'
                    ? 'حرج'
                    : product.urgency === 'High'
                    ? 'عالي'
                    : 'متوسط'}
                </Badge>
                <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                  {product.current < product.min ? `يحتاج ${product.min - product.current}` : 'جيد'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
