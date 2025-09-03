'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { OrderReturn } from '@/types/return';
import { Eye, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface ReturnsTableProps {
  returns: OrderReturn[];
}

const getStatusBadge = (status: OrderReturn['returnStatus']) => {
  const statusConfig = {
    pending: { label: 'في الانتظار', variant: 'secondary' as const },
    in_progress: { label: 'قيد المعالجة', variant: 'default' as const },
    refunded: { label: 'تم الاسترداد', variant: 'default' as const },
    rejected: { label: 'مرفوض', variant: 'destructive' as const },
  };

  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

const getRefundMethodLabel = (method: OrderReturn['refundMethod']) => {
  return method === 'credit_card' ? 'بطاقة ائتمان' : 'محفظة';
};

export default function ReturnsTable({ returns }: ReturnsTableProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate refresh
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
        <CardTitle className='text-xl font-semibold'>طلبات الإرجاع</CardTitle>
        <Button
          variant='outline'
          size='sm'
          onClick={handleRefresh}
          disabled={isLoading}
          className='flex items-center gap-2'
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          تحديث
        </Button>
      </CardHeader>
      <CardContent>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='text-right'>رقم الإرجاع</TableHead>
                <TableHead className='text-right'>اسم العميل</TableHead>
                <TableHead className='text-right'>رقم الهاتف</TableHead>
                <TableHead className='text-right'>طريقة الاسترداد</TableHead>
                <TableHead className='text-right'>الحالة</TableHead>
                <TableHead className='text-right'>مبلغ الاسترداد</TableHead>
                <TableHead className='text-right'>تاريخ الإرجاع</TableHead>
                <TableHead className='text-right'>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {returns.map(returnItem => (
                <TableRow key={returnItem.id}>
                  <TableCell className='font-medium'>{returnItem.returnNo}</TableCell>
                  <TableCell>{returnItem.customerName}</TableCell>
                  <TableCell>{returnItem.customerMobile}</TableCell>
                  <TableCell>{getRefundMethodLabel(returnItem.refundMethod)}</TableCell>
                  <TableCell>{getStatusBadge(returnItem.returnStatus)}</TableCell>
                  <TableCell className='font-medium'>
                    {returnItem.refundAmount.toFixed(2)} ج.م
                  </TableCell>
                  <TableCell>{returnItem.refundDate}</TableCell>
                  <TableCell>
                    <Link href={`/returns/${returnItem.id}`}>
                      <Button variant='outline' size='sm' className='flex items-center gap-2'>
                        <Eye className='h-4 w-4' />
                        عرض التفاصيل
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
