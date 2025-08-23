'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Order } from '@/types/order';
import { AlertTriangle, Package, Truck, XCircle } from 'lucide-react';
import { useState } from 'react';

interface OrderActionsProps {
  order: Order;
  onStatusChange: (status: Order['orderStatus']) => Promise<void>;
  onCancelOrder: () => Promise<void>;
}

export default function OrderActions({ order, onStatusChange, onCancelOrder }: OrderActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [actionType, setActionType] = useState<'status' | 'cancel' | null>(null);

  const canSetOutForDelivery = ['Confirmed', 'Processing', 'Shipped'].includes(order.orderStatus);
  const canCancel = ['Pending', 'Confirmed', 'Processing'].includes(order.orderStatus);

  const handleStatusChange = async () => {
    if (!canSetOutForDelivery) return;

    setIsLoading(true);
    setActionType('status');
    try {
      await onStatusChange('Out for Delivery');
    } finally {
      setIsLoading(false);
      setActionType(null);
    }
  };

  const handleCancelOrder = async () => {
    if (!canCancel) return;

    if (!confirm('Are you sure you want to cancel this order? This action cannot be undone.')) {
      return;
    }

    setIsLoading(true);
    setActionType('cancel');
    try {
      await onCancelOrder();
    } finally {
      setIsLoading(false);
      setActionType(null);
    }
  };

  if (!canSetOutForDelivery && !canCancel) {
    return (
      <Card className='border-gray-200 bg-gray-50'>
        <CardContent className='pt-6'>
          <div className='flex items-center gap-3 text-gray-600'>
            <Package className='w-5 h-5' />
            <span className='text-sm'>No actions available for this order status</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='border-blue-200 bg-blue-50'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-blue-900'>
          <AlertTriangle className='w-5 h-5' />
          Order Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          {canSetOutForDelivery && (
            <Button
              onClick={handleStatusChange}
              disabled={isLoading}
              className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200'
            >
              {isLoading && actionType === 'status' ? (
                <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
              ) : (
                <Truck className='w-4 h-4 mr-2' />
              )}
              Set Out for Delivery
            </Button>
          )}

          {canCancel && (
            <Button
              variant='outline'
              onClick={handleCancelOrder}
              disabled={isLoading}
              className='w-full border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 transition-all duration-200'
            >
              {isLoading && actionType === 'cancel' ? (
                <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2'></div>
              ) : (
                <XCircle className='w-4 h-4 mr-2' />
              )}
              Cancel Order
            </Button>
          )}
        </div>

        <div className='mt-4 p-3 bg-blue-100 rounded-lg'>
          <p className='text-xs text-blue-800'>
            <strong>Note:</strong> These actions will update the order status in real-time and may
            affect delivery tracking.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
