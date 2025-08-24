import ClientInfoModern from '@/components/orders/client-info-modern';
import OrderActions from '@/components/orders/order-actions';
import OrderHeader from '@/components/orders/order-header';
import OrderItemsModern from '@/components/orders/order-items-modern';
import OrderSummaryModern from '@/components/orders/order-summary-modern';
import { OrderService } from '@/services/orders/OrderService';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface SingleOrderPageProps {
  params: { id: string };
}

async function getOrderData(id: string) {
  try {
    return await OrderService.getOrderById(id);
  } catch (error) {
    return null;
  }
}

export default async function SingleOrderPage({ params }: SingleOrderPageProps) {
  const order = await getOrderData(params.id);

  if (!order) {
    notFound();
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header Section */}
      <OrderHeader order={order} />

      {/* Main Content */}
      <div className='container mx-auto px-6 py-8'>
        {/* Missing Items Alert */}
        {order.orderItems.some(item => item.isMissing) && (
          <div className='mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl'>
            <div className='flex items-center gap-3 text-orange-800'>
              <div className='w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center'>
                <span className='text-orange-600 font-bold'>
                  {order.orderItems.filter(item => item.isMissing).length}
                </span>
              </div>
              <div>
                <h4 className='font-semibold'>Missing Items Detected</h4>
                <p className='text-sm text-orange-700'>
                  Some items in this order have been marked as missing. Please review and take
                  appropriate action.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className='grid grid-cols-1 xl:grid-cols-4 gap-8'>
          {/* Left Column - Main Content */}
          <div className='xl:col-span-3 space-y-8'>
            <Suspense fallback={<div>Loading order items...</div>}>
              <OrderItemsModern
                items={order.orderItems}
                onToggleMissing={async (itemId: string) => {
                  'use server';
                  await OrderService.toggleItemMissing(order.id, itemId);
                }}
              />
            </Suspense>

            <Suspense fallback={<div>Loading client info...</div>}>
              <ClientInfoModern
                name={order.clientName}
                mobile={order.clientMobile}
                address={order.clientAddress}
              />
            </Suspense>
          </div>

          {/* Right Column - Sidebar */}
          <div className='xl:col-span-1 space-y-6'>
            <Suspense fallback={<div>Loading order summary...</div>}>
              <OrderSummaryModern order={order} />
            </Suspense>

            <Suspense fallback={<div>Loading order actions...</div>}>
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
  );
}
