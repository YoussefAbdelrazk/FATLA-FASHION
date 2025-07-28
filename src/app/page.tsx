import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  dailyOrdersData,
  dashboardStatistics,
  restockProductsData,
  topClientsData,
  topProductsData,
} from '@/data';
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Eye,
  MoreHorizontal,
  Package,
  ShoppingBag,
  Users,
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className='space-y-8'>
      {/* Welcome Header */}
      <div className='relative overflow-hidden rounded-3xl bg-black dark:bg-white p-8 text-white dark:text-black'>
        <div className='absolute inset-0 bg-black/5 dark:bg-white/5' />
        <div className='relative z-10'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-4xl font-bold mb-2'>Welcome back, Admin! 👋</h1>
              <p className='text-gray-300 dark:text-gray-700 text-lg'>
                Here&apos;s what&apos;s happening with your fashion empire today.
              </p>
            </div>
            <div className='hidden md:flex items-center space-x-4'>
              <Badge
                variant='secondary'
                className='bg-white/10 dark:bg-black/10 text-white dark:text-black border-white/20 dark:border-black/20'
              >
                <Activity className='w-4 h-4 mr-2' />
                Live Dashboard
              </Badge>
              <Button
                variant='outline'
                className='border-white/30 dark:border-black/30 text-white dark:text-black hover:bg-white/10 dark:hover:bg-black/10'
              >
                <Eye className='w-4 h-4 mr-2' />
                View Reports
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className='absolute top-4 right-4 w-32 h-32 bg-white/10 dark:bg-black/10 rounded-full' />
        <div className='absolute bottom-4 left-4 w-24 h-24 bg-white/10 dark:bg-black/10 rounded-full' />
      </div>

      {/* Statistics Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {/* Total Users */}
        <Card className='border-0 shadow-lg bg-white dark:bg-black'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-gray-600 dark:text-gray-400'>
              Total Users
            </CardTitle>
            <Users className='h-5 w-5 text-black dark:text-white' />
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold text-black dark:text-white'>
              {dashboardStatistics.totalUsers.count.toLocaleString()}
            </div>
            <div className='flex items-center mt-2'>
              {dashboardStatistics.totalUsers.changeType === 'increase' ? (
                <ArrowUpRight className='w-4 h-4 text-green-500 mr-1' />
              ) : (
                <ArrowDownRight className='w-4 h-4 text-red-500 mr-1' />
              )}
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                +{dashboardStatistics.totalUsers.change}% from yesterday
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Total Orders Count */}
        <Card className='border-0 shadow-lg bg-white dark:bg-black'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-gray-600 dark:text-gray-400'>
              Total Orders
            </CardTitle>
            <ShoppingBag className='h-5 w-5 text-black dark:text-white' />
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold text-black dark:text-white'>
              {dashboardStatistics.totalOrders.count.toLocaleString()}
            </div>
            <div className='flex items-center mt-2'>
              {dashboardStatistics.totalOrders.changeType === 'increase' ? (
                <ArrowUpRight className='w-4 h-4 text-green-500 mr-1' />
              ) : (
                <ArrowDownRight className='w-4 h-4 text-red-500 mr-1' />
              )}
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                +{dashboardStatistics.totalOrders.change}% from yesterday
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Total Orders EGP */}
        <Card className='border-0 shadow-lg bg-white dark:bg-black'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-gray-600 dark:text-gray-400'>
              Total Revenue
            </CardTitle>
            <DollarSign className='h-5 w-5 text-black dark:text-white' />
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold text-black dark:text-white'>
              {dashboardStatistics.totalRevenue.amount.toLocaleString()}{' '}
              {dashboardStatistics.totalRevenue.currency}
            </div>
            <div className='flex items-center mt-2'>
              {dashboardStatistics.totalRevenue.changeType === 'increase' ? (
                <ArrowUpRight className='w-4 h-4 text-green-500 mr-1' />
              ) : (
                <ArrowDownRight className='w-4 h-4 text-red-500 mr-1' />
              )}
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                +{dashboardStatistics.totalRevenue.change}% from yesterday
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Total Products */}
        <Card className='border-0 shadow-lg bg-white dark:bg-black'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-gray-600 dark:text-gray-400'>
              Total Products
            </CardTitle>
            <Package className='h-5 w-5 text-black dark:text-white' />
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold text-black dark:text-white'>
              {dashboardStatistics.totalProducts.count.toLocaleString()}
            </div>
            <div className='flex items-center mt-2'>
              {dashboardStatistics.totalProducts.changeType === 'increase' ? (
                <ArrowUpRight className='w-4 h-4 text-green-500 mr-1' />
              ) : (
                <ArrowDownRight className='w-4 h-4 text-red-500 mr-1' />
              )}
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                +{dashboardStatistics.totalProducts.change}% new items
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart for Daily Orders */}
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

      {/* Top Products and Clients */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Top 10 Products */}
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
                      <p className='text-sm text-gray-600 dark:text-gray-400'>
                        {product.sales} sold
                      </p>
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

        {/* Top 10 Clients */}
        <Card className='border-0 shadow-lg bg-white dark:bg-black'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle className='text-xl font-bold text-black dark:text-white'>
                  Top 10 Clients
                </CardTitle>
                <CardDescription className='text-gray-600 dark:text-gray-400'>
                  Most valuable customers of all time
                </CardDescription>
              </div>
              <Button variant='outline' size='sm' className='border-gray-200 dark:border-gray-700'>
                <MoreHorizontal className='w-4 h-4' />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {topClientsData.clients.map((client, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors'
                >
                  <div className='flex items-center space-x-3'>
                    <div className='w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black font-bold text-sm'>
                      {index + 1}
                    </div>
                    <div>
                      <p className='font-semibold text-black dark:text-white'>{client.name}</p>
                      <p className='text-sm text-gray-600 dark:text-gray-400'>
                        {client.orders} orders
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='font-bold text-black dark:text-white'>{client.total} EGP</p>
                    <Badge
                      variant='secondary'
                      className={
                        client.status === 'VIP'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }
                    >
                      {client.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Need Restock */}
      <Card className='border-0 shadow-lg bg-white dark:bg-black'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='text-xl font-bold text-black dark:text-white'>
                Products Need Restock
              </CardTitle>
              <CardDescription className='text-gray-600 dark:text-gray-400'>
                Items with low inventory that need attention
              </CardDescription>
            </div>
            <Button
              variant='outline'
              size='sm'
              className='text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20'
            >
              <AlertTriangle className='w-4 h-4 mr-2' />
              View All
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
                      Current: {product.current} | Min: {product.min}
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
                    {product.urgency}
                  </Badge>
                  <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                    {product.current < product.min
                      ? `${product.min - product.current} needed`
                      : 'OK'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
