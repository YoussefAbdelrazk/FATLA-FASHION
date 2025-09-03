'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { OrderReturn } from '@/types/return';
import { CheckCircle, RotateCcw, XCircle } from 'lucide-react';
import { useState } from 'react';

interface ReturnActionsProps {
  returnItem: OrderReturn;
  onApprove: (refundMethod: 'credit_card' | 'wallet') => Promise<void>;
  onReject: (reason: string) => Promise<void>;
}

export default function ReturnActions({ returnItem, onApprove, onReject }: ReturnActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedRefundMethod, setSelectedRefundMethod] = useState<'credit_card' | 'wallet'>(
    returnItem.refundMethod
  );

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      await onApprove(selectedRefundMethod);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert('يرجى إدخال سبب الرفض');
      return;
    }
    setIsLoading(true);
    try {
      await onReject(rejectReason);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't show actions if already processed
  if (returnItem.returnStatus === 'refunded' || returnItem.returnStatus === 'rejected') {
    return null;
  }

  return (
    <Card className='border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl h-full flex flex-col'>
      <CardHeader className='pb-6 flex-shrink-0'>
        <CardTitle className='flex items-center gap-3 text-gray-900'>
          <div className='w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center'>
            <RotateCcw className='w-5 h-5 text-white' />
          </div>
          <span className='text-xl font-bold'>إجراءات طلب الإرجاع</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6 flex-1 overflow-y-auto'>
        {/* Refund Method Selection */}
        <div className='space-y-3'>
          <Label htmlFor='refund-method' className='text-sm font-bold text-gray-700'>طريقة الاسترداد</Label>
          <Select
            value={selectedRefundMethod}
            onValueChange={(value: 'credit_card' | 'wallet') => setSelectedRefundMethod(value)}
          >
            <SelectTrigger className='rounded-xl border-2 border-gray-200 focus:border-orange-400'>
              <SelectValue placeholder='اختر طريقة الاسترداد' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='credit_card'>بطاقة ائتمان</SelectItem>
              <SelectItem value='wallet'>محفظة</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reject Reason Input */}
        <div className='space-y-3'>
          <Label htmlFor='reject-reason' className='text-sm font-bold text-gray-700'>سبب الرفض (في حالة الرفض)</Label>
          <Textarea
            id='reject-reason'
            placeholder='أدخل سبب رفض طلب الإرجاع...'
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            rows={3}
            className='rounded-xl border-2 border-gray-200 focus:border-red-400'
          />
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4'>
          <Button
            onClick={handleApprove}
            disabled={isLoading}
            className='flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl py-3 shadow-lg hover:shadow-xl transition-all duration-300'
          >
            <CheckCircle className='w-5 h-5 mr-3' />
            {isLoading ? 'جاري المعالجة...' : 'موافقة على الإرجاع'}
          </Button>

          <Button
            onClick={handleReject}
            disabled={isLoading || !rejectReason.trim()}
            variant='destructive'
            className='flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-xl py-3 shadow-lg hover:shadow-xl transition-all duration-300'
          >
            <XCircle className='w-5 h-5 mr-3' />
            {isLoading ? 'جاري المعالجة...' : 'رفض طلب الإرجاع'}
          </Button>
        </div>

        {/* Status Info */}
        <div className='p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl'>
          <div className='flex items-center gap-3 text-blue-800'>
            <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center'>
              <RotateCcw className='w-4 h-4 text-white' />
            </div>
            <span className='text-sm font-bold'>معلومات الحالة</span>
          </div>
          <p className='text-sm text-blue-700 mt-2 font-medium'>
            {returnItem.returnStatus === 'pending'
              ? 'طلب الإرجاع في انتظار المراجعة والمعالجة'
              : 'طلب الإرجاع قيد المعالجة حالياً'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

