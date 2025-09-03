import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { OrderReturn } from '@/types/return';
import { ArrowLeft, Clock, CreditCard, RefreshCw, RotateCcw } from 'lucide-react';
import Link from 'next/link';

interface ReturnHeaderProps {
  returnItem: OrderReturn;
}

const getStatusIcon = (status: OrderReturn['returnStatus']) => {
  switch (status) {
    case 'pending':
      return <Clock className='w-4 h-4' />;
    case 'in_progress':
      return <RefreshCw className='w-4 h-4' />;
    case 'refunded':
      return <CreditCard className='w-4 h-4' />;
    case 'rejected':
      return <RotateCcw className='w-4 h-4' />;
    default:
      return <Clock className='w-4 h-4' />;
  }
};

const getStatusColor = (status: OrderReturn['returnStatus']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'refunded':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'rejected':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusLabel = (status: OrderReturn['returnStatus']) => {
  switch (status) {
    case 'pending':
      return 'في الانتظار';
    case 'in_progress':
      return 'قيد المعالجة';
    case 'refunded':
      return 'تم الاسترداد';
    case 'rejected':
      return 'مرفوض';
    default:
      return status;
  }
};

const getRefundMethodLabel = (method: OrderReturn['refundMethod']) => {
  return method === 'credit_card' ? 'بطاقة ائتمان' : 'محفظة';
};

export default function ReturnHeader({ returnItem }: ReturnHeaderProps) {
  return (
    <div className='bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 border-b border-gray-200'>
      <div className='container mx-auto px-6 py-8'>
        {/* Navigation */}
        <div className='flex items-center gap-4 mb-6'>
          <Link href='/returns'>
            <Button variant='ghost' size='sm' className='text-gray-600 hover:text-gray-900'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              العودة إلى طلبات الإرجاع
            </Button>
          </Link>
        </div>

        {/* Main Header */}
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
          <div className='flex-1'>
            <div className='flex items-center gap-4 mb-3'>
              <div className='w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center'>
                <RotateCcw className='w-6 h-6 text-white' />
              </div>
              <div>
                <h1 className='text-3xl font-bold text-gray-900'>تفاصيل طلب الإرجاع</h1>
                <p className='text-lg text-gray-600'>#{returnItem.returnNo}</p>
              </div>
            </div>

            <div className='flex items-center gap-6 text-sm text-gray-600'>
              <div className='flex items-center gap-2'>
                <Clock className='w-4 h-4' />
                <span>
                  تاريخ الطلب:{' '}
                  {new Date(returnItem.createdAt).toLocaleDateString('ar-EG', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <CreditCard className='w-4 h-4' />
                <span>الطلب الأصلي: #{returnItem.orderNo}</span>
              </div>
            </div>
          </div>

          {/* Status Section */}
          <div className='flex flex-col items-end gap-3'>
            <div className='text-right'>
              <p className='text-sm text-gray-600 mb-1'>حالة الإرجاع</p>
              <Badge
                variant='outline'
                className={`px-4 py-2 text-sm font-medium border-2 ${getStatusColor(
                  returnItem.returnStatus,
                )}`}
              >
                <span className='mr-2'>{getStatusIcon(returnItem.returnStatus)}</span>
                {getStatusLabel(returnItem.returnStatus)}
              </Badge>
            </div>

            <div className='text-right'>
              <p className='text-sm text-gray-600 mb-1'>طريقة الاسترداد</p>
              <Badge variant='secondary' className='px-3 py-1'>
                {getRefundMethodLabel(returnItem.refundMethod)}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
