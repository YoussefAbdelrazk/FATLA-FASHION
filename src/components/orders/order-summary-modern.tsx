import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Order } from '@/types/order';
import { CreditCard, Package, Receipt, Truck } from 'lucide-react';

interface OrderSummaryModernProps {
  order: Order;
}

export default function OrderSummaryModern({ order }: OrderSummaryModernProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Card className='border-0 shadow-lg bg-gradient-to-br from-white to-gray-50'>
      <CardHeader className='pb-4'>
        <CardTitle className='flex items-center gap-2 text-gray-900'>
          <Receipt className='w-5 h-5 text-blue-600' />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Order Details */}
        <div className='grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg'>
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <Package className='w-4 h-4 text-gray-500' />
              <span className='text-sm font-medium text-gray-600'>Order No</span>
            </div>
            <div className='flex items-center gap-2'>
              <Truck className='w-4 h-4 text-gray-500' />
              <span className='text-sm font-medium text-gray-600'>Status</span>
            </div>
            <div className='flex items-center gap-2'>
              <CreditCard className='w-4 h-4 text-gray-500' />
              <span className='text-sm font-medium text-gray-600'>Payment</span>
            </div>
          </div>
          <div className='space-y-3 text-right'>
            <span className='text-sm font-semibold text-gray-900'>{order.orderNo}</span>
            <Badge variant='outline' className='text-xs'>
              {order.orderStatus}
            </Badge>
            <Badge variant='secondary' className='text-xs'>
              {order.paymentMethod}
            </Badge>
          </div>
        </div>

        {/* Financial Summary */}
        <div className='space-y-4'>
          <h4 className='font-semibold text-gray-900 flex items-center gap-2'>
            <Receipt className='w-4 h-4 text-green-600' />
            Financial Details
          </h4>

          <div className='space-y-3'>
            <div className='flex justify-between items-center py-2 border-b border-gray-100'>
              <span className='text-sm text-gray-600'>Subtotal</span>
              <span className='text-sm font-medium'>{formatCurrency(order.subTotal)}</span>
            </div>

            {order.discountTotal > 0 && (
              <div className='flex justify-between items-center py-2 border-b border-gray-100'>
                <span className='text-sm text-gray-600'>Product Discount</span>
                <span className='text-sm font-medium text-red-600'>
                  -{formatCurrency(order.discountTotal)}
                </span>
              </div>
            )}

            {order.couponDiscount > 0 && (
              <div className='flex justify-between items-center py-2 border-b border-gray-100'>
                <span className='text-sm text-gray-600'>Coupon Discount</span>
                <span className='text-sm font-medium text-red-600'>
                  -{formatCurrency(order.couponDiscount)}
                </span>
              </div>
            )}

            <div className='flex justify-between items-center py-2 border-b border-gray-100'>
              <span className='text-sm text-gray-600'>Delivery Fees</span>
              <span className='text-sm font-medium'>{formatCurrency(order.deliveryTotal)}</span>
            </div>

            <div className='flex justify-between items-center pt-3'>
              <span className='text-base font-bold text-gray-900'>Final Amount</span>
              <span className='text-xl font-bold text-green-600'>
                {formatCurrency(order.finalTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Order Stats */}
        <div className='grid grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg'>
          <div className='text-center'>
            <div className='text-2xl font-bold text-blue-600'>{order.totalQuantity}</div>
            <div className='text-xs text-blue-700'>Total Items</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-green-600'>
              {order.orderItems.filter(item => !item.isMissing).length}
            </div>
            <div className='text-xs text-green-700'>Available</div>
          </div>
        </div>

        {/* Missing Items Alert */}
        {order.orderItems.some(item => item.isMissing) && (
          <div className='p-4 bg-orange-50 border border-orange-200 rounded-lg'>
            <div className='flex items-center gap-2 text-orange-800'>
              <Package className='w-4 h-4' />
              <span className='text-sm font-medium'>
                {order.orderItems.filter(item => item.isMissing).length} item(s) marked as missing
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
