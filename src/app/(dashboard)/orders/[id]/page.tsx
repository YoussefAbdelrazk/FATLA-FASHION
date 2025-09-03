import ClientInfoModern from '@/components/orders/client-info-modern';
import OrderActions from '@/components/orders/order-actions';
import OrderItemsModern from '@/components/orders/order-items-modern';
import { Button } from '@/components/ui/button';
import { OrderService } from '@/services/orders/OrderService';
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Package,
  Truck,
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface SingleOrderPageProps {
  params: { id: string };
}

async function getOrderData(id: string) {
  try {
    return await OrderService.getOrderById(id);
  } catch {
    return null;
  }
}

export default async function SingleOrderPage({ params }: SingleOrderPageProps) {
  const order = await getOrderData(params.id);

  if (!order) {
    notFound();
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      {/* Modern Header - Similar to the image */}
      <div className='bg-white border-b border-gray-200 shadow-sm'>
        <div className='container mx-auto px-6 py-6'>
          {/* Navigation */}
          <div className='flex items-center gap-4 mb-6'>
            <Link href='/orders'>
              <Button
                variant='ghost'
                size='sm'
                className='text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              >
                <ArrowLeft className='w-4 h-4 mr-2' />
                Orders
              </Button>
            </Link>
          </div>

          {/* Main Header */}
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
            <div className='flex-1'>
              <div className='flex items-center gap-4 mb-4'>
                <h1 className='text-3xl font-bold text-gray-900'>Order #{order.orderNo}</h1>
                <div className='flex items-center gap-2'>
                  <span className='px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full border border-green-200'>
                    Paid
                  </span>
                  <span className='px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full border border-orange-200'>
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              <div className='flex items-center gap-4 text-gray-600'>
                <div className='flex items-center gap-2'>
                  <Calendar className='w-4 h-4' />
                  <span>
                    {new Date(order.orderDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}{' '}
                    at{' '}
                    {new Date(order.orderDate).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div className='flex items-center gap-3'>
              <Button variant='outline' size='sm'>
                <ChevronLeft className='w-4 h-4' />
              </Button>
              <Button variant='outline' size='sm'>
                <ChevronRight className='w-4 h-4' />
              </Button>
              <Button variant='outline' size='sm'>
                <MoreVertical className='w-4 h-4' />
              </Button>
              <Button className='bg-blue-600 hover:bg-blue-700 text-white'>Fulfill</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Grid Layout */}
      <div className='container mx-auto px-6 py-8'>
        {/* Missing Items Alert */}
        {order.orderItems.some(item => item.isMissing) && (
          <div className='mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center'>
                <span className='text-white font-bold text-sm'>
                  {order.orderItems.filter(item => item.isMissing).length}
                </span>
              </div>
              <div>
                <h4 className='font-semibold text-gray-900'>Missing Items</h4>
                <p className='text-sm text-gray-600'>
                  Some items have been marked as missing. Please review and take appropriate action.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Grid Layout */}
        <div className='grid grid-cols-1 xl:grid-cols-4 gap-6'>
          {/* Left Column - Main Content */}
          <div className='xl:col-span-3 space-y-6'>
            {/* Order Items */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
              <div className='p-6 border-b border-gray-200'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center'>
                    <Package className='w-4 h-4 text-yellow-600' />
                  </div>
                  <h2 className='text-lg font-semibold text-gray-900'>
                    Unfulfilled {order.orderItems.filter(item => !item.isMissing).length}
                  </h2>
                </div>
              </div>
              <div className='p-6'>
                <Suspense
                  fallback={<div className='animate-pulse bg-gray-100 rounded-lg h-32'></div>}
                >
                  <OrderItemsModern
                    items={order.orderItems}
                    onToggleMissing={async (itemId: string) => {
                      'use server';
                      await OrderService.toggleItemMissing(order.id, itemId);
                    }}
                  />
                </Suspense>
              </div>
            </div>

            {/* Delivery Information */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
              <div className='p-6 border-b border-gray-200'>
                <h2 className='text-lg font-semibold text-gray-900'>Delivery</h2>
              </div>
              <div className='p-6'>
                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                    <Truck className='w-6 h-6 text-blue-600' />
                  </div>
                  <div>
                    <p className='font-medium text-gray-900'>FedEx</p>
                    <p className='text-sm text-gray-600'>First class package</p>
                    <p className='text-sm font-medium text-gray-900'>$20.00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
              <div className='p-6 border-b border-gray-200'>
                <h2 className='text-lg font-semibold text-gray-900'>Payment Summary</h2>
              </div>
              <div className='p-6 space-y-4'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Subtotal ({order.orderItems.length} items)</span>
                  <span className='font-medium'>${order.subTotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Delivery</span>
                  <span className='font-medium'>${order.deliveryTotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Tax PDV 20% (Included)</span>
                  <span className='font-medium'>$0.00</span>
                </div>
                <div className='border-t border-gray-200 pt-4'>
                  <div className='flex justify-between items-center'>
                    <span className='font-semibold text-gray-900'>Total paid by customer</span>
                    <span className='text-lg font-bold text-gray-900'>
                      ${order.finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
              <div className='p-6 border-b border-gray-200'>
                <h2 className='text-lg font-semibold text-gray-900'>Activity</h2>
              </div>
              <div className='p-6'>
                <div className='flex items-center gap-4'>
                  <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
                  <div>
                    <p className='font-medium text-gray-900'>TODAY</p>
                    <p className='text-sm text-gray-600'>Order was placed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Customer Info */}
          <div className='xl:col-span-1 space-y-6'>
            {/* Customer */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
              <div className='p-6 border-b border-gray-200'>
                <h2 className='text-lg font-semibold text-gray-900'>Customer</h2>
              </div>
              <div className='p-6'>
                <Suspense
                  fallback={<div className='animate-pulse bg-gray-100 rounded-lg h-32'></div>}
                >
                  <ClientInfoModern
                    name={order.clientName}
                    mobile={order.clientMobile}
                    address={order.clientAddress}
                  />
                </Suspense>
              </div>
            </div>

            {/* Contact Info */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
              <div className='p-6 border-b border-gray-200'>
                <h2 className='text-lg font-semibold text-gray-900'>Contact info</h2>
              </div>
              <div className='p-6 space-y-4'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center'>
                    <span className='text-gray-600 text-sm'>@</span>
                  </div>
                  <span className='text-sm text-gray-900'>{order.clientMobile}@example.com</span>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center'>
                    <span className='text-gray-600 text-sm'>📞</span>
                  </div>
                  <span className='text-sm text-gray-900'>{order.clientMobile}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
              <div className='p-6 border-b border-gray-200'>
                <h2 className='text-lg font-semibold text-gray-900'>Shipping Address</h2>
              </div>
              <div className='p-6'>
                <div className='space-y-1 text-sm'>
                  <p className='font-medium text-gray-900'>{order.clientName}</p>
                  <p className='text-gray-600'>{order.clientMobile}</p>
                  <p className='text-gray-600'>{order.clientAddress.building}</p>
                  <p className='text-gray-600'>{order.clientAddress.city}</p>
                  <p className='text-gray-600'>{order.clientAddress.government}</p>
                  <p className='text-gray-600'>United States</p>
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
              <div className='p-6 border-b border-gray-200'>
                <h2 className='text-lg font-semibold text-gray-900'>Billing Address</h2>
              </div>
              <div className='p-6'>
                <div className='space-y-1 text-sm'>
                  <p className='font-medium text-gray-900'>{order.clientName}</p>
                  <p className='text-gray-600'>{order.clientMobile}</p>
                  <p className='text-gray-600'>{order.clientAddress.building}</p>
                  <p className='text-gray-600'>{order.clientAddress.city}</p>
                  <p className='text-gray-600'>{order.clientAddress.government}</p>
                  <p className='text-gray-600'>United States</p>
                </div>
              </div>
            </div>

            {/* Order Actions */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
              <div className='p-6 border-b border-gray-200'>
                <h2 className='text-lg font-semibold text-gray-900'>Actions</h2>
              </div>
              <div className='p-6'>
                <Suspense
                  fallback={<div className='animate-pulse bg-gray-100 rounded-lg h-32'></div>}
                >
                  <OrderActions
                    order={order}
                    onStatusChange={async status => {
                      'use server';
                      await OrderService.updateOrderStatus(order.id, status);
                    }}
                    onCancelOrder={async () => {
                      'use server';
                      await OrderService.cancelOrder(order.id);
                    }}
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
