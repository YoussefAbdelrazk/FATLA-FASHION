import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderReturn } from '@/types/return';
import { CreditCard, Package, Receipt, RotateCcw, User } from 'lucide-react';

interface ReturnSummaryModernProps {
  returnItem: OrderReturn;
}

export default function ReturnSummaryModern({ returnItem }: ReturnSummaryModernProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
    }).format(amount);
  };

  const getRefundMethodLabel = (method: OrderReturn['refundMethod']) => {
    return method === 'credit_card' ? 'بطاقة ائتمان' : 'محفظة';
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

  return (
    <Card className='border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl h-full flex flex-col'>
      <CardHeader className='pb-6 flex-shrink-0'>
        <CardTitle className='flex items-center gap-3 text-gray-900'>
          <div className='w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center'>
            <Receipt className='w-5 h-5 text-white' />
          </div>
          <span className='text-xl font-bold'>ملخص طلب الإرجاع</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6 flex-1 overflow-y-auto'>
        {/* Return Details */}
        <div className='grid grid-cols-2 gap-4 p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-200'>
          <div className='space-y-4'>
            <div className='flex items-center gap-3'>
              <Package className='w-5 h-5 text-orange-600' />
              <span className='text-sm font-medium text-gray-700'>رقم الإرجاع</span>
            </div>
            <div className='flex items-center gap-3'>
              <RotateCcw className='w-5 h-5 text-orange-600' />
              <span className='text-sm font-medium text-gray-700'>الحالة</span>
            </div>
            <div className='flex items-center gap-3'>
              <CreditCard className='w-5 h-5 text-orange-600' />
              <span className='text-sm font-medium text-gray-700'>طريقة الاسترداد</span>
            </div>
          </div>
          <div className='space-y-4 text-right'>
            <span className='text-sm font-bold text-gray-900'>{returnItem.returnNo}</span>
            <Badge variant='outline' className='text-xs bg-white border-orange-300 text-orange-700'>
              {getStatusLabel(returnItem.returnStatus)}
            </Badge>
            <Badge variant='secondary' className='text-xs bg-orange-100 text-orange-800'>
              {getRefundMethodLabel(returnItem.refundMethod)}
            </Badge>
          </div>
        </div>

        {/* Customer Information */}
        <div className='space-y-4'>
          <h4 className='font-bold text-gray-900 flex items-center gap-3 text-lg'>
            <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center'>
              <User className='w-4 h-4 text-white' />
            </div>
            معلومات العميل
          </h4>

          <div className='space-y-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200'>
            <div className='flex justify-between items-center py-3 border-b border-blue-200'>
              <span className='text-sm text-gray-700 font-medium'>الاسم</span>
              <span className='text-sm font-bold'>{returnItem.customerName}</span>
            </div>

            <div className='flex justify-between items-center py-3 border-b border-blue-200'>
              <span className='text-sm text-gray-700 font-medium'>رقم الهاتف</span>
              <span className='text-sm font-bold'>{returnItem.customerMobile}</span>
            </div>

            <div className='flex justify-between items-center py-3'>
              <span className='text-sm text-gray-700 font-medium'>الطلب الأصلي</span>
              <span className='text-sm font-bold'>#{returnItem.orderNo}</span>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className='space-y-4'>
          <h4 className='font-bold text-gray-900 flex items-center gap-3 text-lg'>
            <div className='w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center'>
              <Receipt className='w-4 h-4 text-white' />
            </div>
            التفاصيل المالية
          </h4>

          <div className='space-y-4 p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-200'>
            <div className='flex justify-between items-center pt-4'>
              <span className='text-lg font-bold text-gray-900'>مبلغ الاسترداد</span>
              <span className='text-2xl font-bold text-orange-600'>
                {formatCurrency(returnItem.refundAmount)}
              </span>
            </div>

            <div className='flex justify-between items-center py-3 border-t border-orange-200'>
              <span className='text-sm text-gray-700 font-medium'>تاريخ الاسترداد</span>
              <span className='text-sm font-bold'>{returnItem.refundDate}</span>
            </div>
          </div>
        </div>

        {/* Return Stats */}
        <div className='grid grid-cols-2 gap-4 p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-200'>
          <div className='text-center'>
            <div className='text-3xl font-bold text-orange-600'>
              {returnItem.returnItems.length}
            </div>
            <div className='text-sm text-orange-700 font-medium'>إجمالي المنتجات</div>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-bold text-red-600'>
              {returnItem.returnItems.reduce((sum, item) => sum + item.quantity, 0)}
            </div>
            <div className='text-sm text-red-700 font-medium'>إجمالي الكمية</div>
          </div>
        </div>

        {/* Rejection Reason */}
        {returnItem.returnStatus === 'rejected' && returnItem.rejectReason && (
          <div className='p-6 bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-2xl'>
            <div className='flex items-center gap-3 text-red-800'>
              <div className='w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center'>
                <RotateCcw className='w-4 h-4 text-white' />
              </div>
              <span className='text-sm font-bold'>سبب الرفض:</span>
            </div>
            <p className='text-sm text-red-700 mt-2 font-medium'>{returnItem.rejectReason}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

