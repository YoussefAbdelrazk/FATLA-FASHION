import ReturnActions from '@/components/returns/return-actions';
import ReturnItemsModern from '@/components/returns/return-items-modern';
import { Button } from '@/components/ui/button';
import { getReturnById } from '@/data/returns';
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  MoreVertical,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface SingleReturnPageProps {
  params: { id: string };
}

const getStatusLabel = (status: string) => {
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

const getRefundMethodLabel = (method: string) => {
  return method === 'credit_card' ? 'بطاقة ائتمان' : 'محفظة';
};

async function getReturnData(id: string) {
  try {
    return await getReturnById(id);
  } catch {
    return null;
  }
}

export default async function SingleReturnPage({ params }: SingleReturnPageProps) {
  const returnItem = await getReturnData(params.id);

  if (!returnItem) {
    notFound();
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50'>
      {/* Modern Header - Similar to the image */}
      <div className='bg-white border-b border-gray-200 shadow-sm'>
        <div className='container mx-auto px-4 py-4'>
          {/* Navigation */}
          <div className='flex items-center gap-4 mb-6'>
            <Link href='/returns'>
              <Button
                variant='ghost'
                size='sm'
                className='text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              >
                <ArrowLeft className='w-4 h-4 mr-2' />
                Returns
              </Button>
            </Link>
          </div>

          {/* Main Header */}
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
            <div className='flex-1'>
              <div className='flex items-center gap-4 mb-4'>
                <h1 className='text-3xl font-bold text-gray-900'>Return #{returnItem.returnNo}</h1>
                <div className='flex  items-center gap-2'>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full border ${
                      returnItem.returnStatus === 'pending'
                        ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                        : returnItem.returnStatus === 'in_progress'
                        ? 'bg-blue-100 text-blue-800 border-blue-200'
                        : returnItem.returnStatus === 'refunded'
                        ? 'bg-green-100 text-green-800 border-green-200'
                        : 'bg-red-100 text-red-800 border-red-200'
                    }`}
                  >
                    {getStatusLabel(returnItem.returnStatus)}
                  </span>
                </div>
              </div>

              <div className='flex items-center gap-4 text-gray-600'>
                <div className='flex items-center gap-2'>
                  <Calendar className='w-4 h-4' />
                  <span>
                    {new Date(returnItem.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}{' '}
                    at{' '}
                    {new Date(returnItem.createdAt).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <CreditCard className='w-4 h-4' />
                  <span>Original Order: #{returnItem.orderNo}</span>
                </div>
              </div>
            </div>

            {/* Header Actions */}
            {/* <div className='flex items-center gap-3'>
              <Button variant='outline' size='sm'>
                <ChevronLeft className='w-4 h-4' />
              </Button>
              <Button variant='outline' size='sm'>
                <ChevronRight className='w-4 h-4' />
              </Button>
              <Button variant='outline' size='sm'>
                <MoreVertical className='w-4 h-4' />
              </Button>
              <Button className='bg-orange-600 hover:bg-orange-700 text-white'>
                Process Return
              </Button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Main Content - Grid Layout */}
      <div className='container mx-auto px-6 py-8'>
        {/* Status Alert */}
        {returnItem.returnStatus === 'rejected' && returnItem.rejectReason && (
          <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 bg-red-500 rounded-full flex items-center justify-center'>
                <XCircle className='w-4 h-4 text-white' />
              </div>
              <div>
                <h4 className='font-semibold text-gray-900'>Return Rejected</h4>
                <p className='text-sm text-gray-600'>{returnItem.rejectReason}</p>
              </div>
            </div>
          </div>
        )}

        {/* Grid Layout */}
        <div className='grid grid-cols-1 xl:grid-cols-4 gap-6'>
          {/* Left Column - Main Content */}
          <div className='xl:col-span-3 space-y-6'>
            {/* Return Items */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
              <div className='p-6 border-b border-gray-200'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center'>
                    <RotateCcw className='w-4 h-4 text-orange-600' />
                  </div>
                  <h2 className='text-lg font-semibold text-gray-900'>
                    Return Items ({returnItem.returnItems.length})
                  </h2>
                </div>
              </div>
              <div className='p-6'>
                <Suspense
                  fallback={<div className='animate-pulse bg-gray-100 rounded-lg h-32'></div>}
                >
                  <ReturnItemsModern items={returnItem.returnItems} />
                </Suspense>
              </div>
            </div>

            {/* Return Reason */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
              <div className='p-6 border-b border-gray-200'>
                <h2 className='text-lg font-semibold text-gray-900'>Return Reason</h2>
              </div>
              <div className='p-6'>
                <div className='space-y-4'>
                  {returnItem.returnItems.map((item, index) => (
                    <div
                      key={item.id}
                      className='p-4 bg-orange-50 border border-orange-200 rounded-lg'
                    >
                      <div className='flex items-center gap-3 mb-2'>
                        <div className='w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center'>
                          <span className='text-white text-xs font-bold'>{index + 1}</span>
                        </div>
                        <span className='font-medium text-gray-900'>{item.productName}</span>
                      </div>
                      <p className='text-sm text-gray-700 ml-9'>{item.returnReason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Refund Summary */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
              <div className='p-6 border-b border-gray-200'>
                <h2 className='text-lg font-semibold text-gray-900'>Refund Summary</h2>
              </div>
              <div className='p-6 space-y-4'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Total Items</span>
                  <span className='font-medium'>{returnItem.returnItems.length}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Refund Method</span>
                  <span className='font-medium'>
                    {getRefundMethodLabel(returnItem.refundMethod)}
                  </span>
                </div>
                <div className='border-t border-gray-200 pt-4'>
                  <div className='flex justify-between items-center'>
                    <span className='font-semibold text-gray-900'>Refund Amount</span>
                    <span className='text-lg font-bold text-orange-600'>
                      ${returnItem.refundAmount.toFixed(2)}
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
                <div className='space-y-4'>
                  <div className='flex items-center gap-4'>
                    <div className='w-3 h-3 bg-orange-500 rounded-full'></div>
                    <div>
                      <p className='font-medium text-gray-900'>TODAY</p>
                      <p className='text-sm text-gray-600'>Return request was submitted</p>
                    </div>
                  </div>
                  {returnItem.returnStatus === 'refunded' && (
                    <div className='flex items-center gap-4'>
                      <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                      <div>
                        <p className='font-medium text-gray-900'>COMPLETED</p>
                        <p className='text-sm text-gray-600'>Refund processed</p>
                      </div>
                    </div>
                  )}
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
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center'>
                    <span className='text-purple-600 font-semibold'>
                      {returnItem.customerName.charAt(0)}
                    </span>
                  </div>
                  <div className='flex-1'>
                    <p className='font-medium text-gray-900'>{returnItem.customerName}</p>
                    <div className='flex items-center gap-2 text-sm text-gray-600'>
                      <span>📄</span>
                      <span>3 Returns</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
              <div className='px-6 py-4 border-b border-gray-200'>
                <h2 className='text-lg font-semibold text-gray-900'>Contact info</h2>
              </div>
              <div className='px-2 py-4 space-y-4'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center'>
                    <span className='text-gray-600 text-sm'>@</span>
                  </div>
                  <span className='text-sm text-gray-900'>
                    {returnItem.customerMobile}@example.com
                  </span>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center'>
                    <span className='text-gray-600 text-sm'>📞</span>
                  </div>
                  <span className='text-sm text-gray-900'>{returnItem.customerMobile}</span>
                </div>
              </div>
            </div>

            {/* Return Actions */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
              <div className='p-6 border-b border-gray-200'>
                <h2 className='text-lg font-semibold text-gray-900'>Actions</h2>
              </div>
              <div className='p-6'>
                <Suspense
                  fallback={<div className='animate-pulse bg-gray-100 rounded-lg h-32'></div>}
                >
                  <ReturnActions
                    returnItem={returnItem}
                    onApprove={async refundMethod => {
                      'use server';
                      // TODO: Implement approve return logic
                      console.log('Approving return with method:', refundMethod);
                    }}
                    onReject={async reason => {
                      'use server';
                      // TODO: Implement reject return logic
                      console.log('Rejecting return with reason:', reason);
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
