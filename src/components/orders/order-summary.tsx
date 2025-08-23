'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Order } from '@/types/order';
import { Truck, XCircle } from 'lucide-react';

interface OrderSummaryProps {
  order: Order;
  onStatusChange: (status: Order['orderStatus']) => void;
  onCancelOrder: () => void;
}

export default function OrderSummary({ order, onStatusChange, onCancelOrder }: OrderSummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const canSetOutForDelivery = ['Confirmed', 'Processing', 'Shipped'].includes(order.orderStatus);
  const canCancel = ['Pending', 'Confirmed', 'Processing'].includes(order.orderStatus);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Truck className='w-5 h-5' />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          {/* Order Details */}
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>Order No:</span>
                <span className='font-medium'>{order.orderNo}</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>Status:</span>
                <Badge variant='outline'>{order.orderStatus}</Badge>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>Payment:</span>
                <Badge variant='secondary'>{order.paymentMethod}</Badge>
              </div>
            </div>
            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>Total Qty:</span>
                <span className='font-medium'>{order.totalQuantity}</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>Order Date:</span>
                <span className='font-medium'>
                  {new Date(order.orderDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Financial Summary */}
          <div className='space-y-3 border-t pt-4'>
            <h4 className='font-semibold text-gray-900'>Financial Details</h4>
            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>Subtotal:</span>
                <span>{formatCurrency(order.subTotal)}</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>Product Discount:</span>
                <span className='text-red-600'>-{formatCurrency(order.discountTotal)}</span>
              </div>
              {order.couponDiscount > 0 && (
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Coupon Discount:</span>
                  <span className='text-red-600'>-{formatCurrency(order.couponDiscount)}</span>
                </div>
              )}
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>Delivery Fees:</span>
                <span>{formatCurrency(order.deliveryTotal)}</span>
              </div>
              <div className='flex justify-between text-sm border-t pt-2'>
                <span className='font-semibold text-gray-900'>Final Amount:</span>
                <span className='font-bold text-lg text-green-600'>
                  {formatCurrency(order.finalTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex gap-3 pt-4 border-t'>
            {canSetOutForDelivery && (
              <Button
                onClick={() => onStatusChange('Out for Delivery')}
                className='flex-1 bg-blue-600 hover:bg-blue-700'
              >
                <Truck className='w-4 h-4 mr-2' />
                Set Out for Delivery
              </Button>
            )}
            {canCancel && (
              <Button variant='destructive' onClick={onCancelOrder} className='flex-1'>
                <XCircle className='w-4 h-4 mr-2' />
                Cancel Order
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
