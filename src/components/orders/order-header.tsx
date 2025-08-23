import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Order } from '@/types/order';
import { ArrowLeft, Clock, MapPin, Package, Truck } from 'lucide-react';
import Link from 'next/link';

interface OrderHeaderProps {
  order: Order;
}

const getStatusIcon = (status: Order['orderStatus']) => {
  switch (status) {
    case 'Pending':
      return <Clock className='w-4 h-4' />;
    case 'Confirmed':
      return <Package className='w-4 h-4' />;
    case 'Processing':
      return <Package className='w-4 h-4' />;
    case 'Shipped':
      return <Truck className='w-4 h-4' />;
    case 'Out for Delivery':
      return <Truck className='w-4 h-4' />;
    case 'Delivered':
      return <Package className='w-4 h-4' />;
    case 'Cancelled':
      return <Package className='w-4 h-4' />;
    default:
      return <Package className='w-4 h-4' />;
  }
};

const getStatusColor = (status: Order['orderStatus']) => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Confirmed':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Processing':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Shipped':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'Out for Delivery':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Delivered':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export default function OrderHeader({ order }: OrderHeaderProps) {
  return (
    <div className='bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200'>
      <div className='container mx-auto px-6 py-8'>
        {/* Navigation */}
        <div className='flex items-center gap-4 mb-6'>
          <Link href='/orders'>
            <Button variant='ghost' size='sm' className='text-gray-600 hover:text-gray-900'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Back to Orders
            </Button>
          </Link>
        </div>

        {/* Main Header */}
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
          <div className='flex-1'>
            <div className='flex items-center gap-4 mb-3'>
              <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center'>
                <Package className='w-6 h-6 text-white' />
              </div>
              <div>
                <h1 className='text-3xl font-bold text-gray-900'>Order Details</h1>
                <p className='text-lg text-gray-600'>#{order.orderNo}</p>
              </div>
            </div>

            <div className='flex items-center gap-6 text-sm text-gray-600'>
              <div className='flex items-center gap-2'>
                <Clock className='w-4 h-4' />
                <span>
                  Ordered on{' '}
                  {new Date(order.orderDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin className='w-4 h-4' />
                <span>
                  {order.clientAddress.city}, {order.clientAddress.government}
                </span>
              </div>
            </div>
          </div>

          {/* Status Section */}
          <div className='flex flex-col items-end gap-3'>
            <div className='text-right'>
              <p className='text-sm text-gray-600 mb-1'>Order Status</p>
              <Badge
                variant='outline'
                className={`px-4 py-2 text-sm font-medium border-2 ${getStatusColor(
                  order.orderStatus,
                )}`}
              >
                <span className='mr-2'>{getStatusIcon(order.orderStatus)}</span>
                {order.orderStatus}
              </Badge>
            </div>

            <div className='text-right'>
              <p className='text-sm text-gray-600 mb-1'>Payment Method</p>
              <Badge variant='secondary' className='px-3 py-1'>
                {order.paymentMethod}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
