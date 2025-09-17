'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetDashboardData } from '@/hooks/useDashboard';
import { AlertTriangle, Package } from 'lucide-react';

export default function RestockProductsCard() {
  const { data: dashboardData, isLoading, error } = useGetDashboardData();

  if (isLoading) {
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
                المنتجات تحتاج إعادة تخزين
              </CardTitle>
              <CardDescription className='text-gray-600 dark:text-gray-400'>
                العناصر ذات المخزون المنخفض التي تحتاج انتباه
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

  const { productsNeedRestock } = dashboardData;

  const getUrgencyLevel = (currentStock: number, minStock: number) => {
    if (currentStock === 0) return 'Critical';
    if (currentStock <= minStock) return 'High';
    if (currentStock <= minStock * 1.5) return 'Medium';
    return 'Low';
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical':
        return 'bg-red-500';
      case 'High':
        return 'bg-orange-500';
      case 'Medium':
        return 'bg-yellow-500';
      default:
        return 'bg-green-500';
    }
  };

  const getUrgencyBadgeColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'High':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    }
  };

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case 'Critical':
        return 'حرج';
      case 'High':
        return 'عالي';
      case 'Medium':
        return 'متوسط';
      default:
        return 'منخفض';
    }
  };

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
          {productsNeedRestock.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>لا توجد منتجات تحتاج إعادة تخزين</div>
          ) : (
            productsNeedRestock.map((product) => {
              const urgency = getUrgencyLevel(product.currentStock, product.minStock);
              return (
                <div
                  key={product.id}
                  className='flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors'
                >
                  <div className='flex items-center space-x-3'>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${getUrgencyColor(
                        urgency,
                      )}`}
                    >
                      <Package className='w-5 h-5 text-white' />
                    </div>
                    <div>
                      <p className='font-semibold text-black dark:text-white'>{product.name}</p>
                      <p className='text-sm text-gray-600 dark:text-gray-400'>
                        الحالي: {product.currentStock} | الحد الأدنى: {product.minStock}
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <Badge variant='secondary' className={getUrgencyBadgeColor(urgency)}>
                      {getUrgencyText(urgency)}
                    </Badge>
                    <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                      {product.currentStock < product.minStock
                        ? `يحتاج ${product.minStock - product.currentStock}`
                        : 'جيد'}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
