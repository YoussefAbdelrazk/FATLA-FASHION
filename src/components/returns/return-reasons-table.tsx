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
import { ReturnReason } from '@/types/return';
import { ReturnReasonFormData } from '@/lib/schemas/return-reason-schema';
import { Edit, Plus, RefreshCw, Trash2 } from 'lucide-react';
import { useState } from 'react';
import AddReturnReasonForm from './add-return-reason-form';

interface ReturnReasonsTableProps {
  returnReasons: ReturnReason[];
  onReasonAdded?: (reason: ReturnReasonFormData) => void;
  onReasonUpdated?: (id: string, reason: ReturnReasonFormData) => void;
  onReasonDeleted?: (id: string) => void;
  onRefresh?: () => void;
  isLoading?: boolean;
}

const getVisibilityBadge = (isVisible: boolean) => {
  return isVisible ? (
    <Badge
      variant='default'
      className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    >
      مرئي
    </Badge>
  ) : (
    <Badge
      variant='secondary'
      className='bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    >
      مخفي
    </Badge>
  );
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function ReturnReasonsTable({
  returnReasons,
  onReasonAdded,
  onReasonUpdated,
  onReasonDeleted,
  onRefresh,
  isLoading = false,
}: ReturnReasonsTableProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReason, setEditingReason] = useState<ReturnReason | null>(null);

  const handleRefresh = () => {
    onRefresh?.();
  };

  const handleAddNew = () => {
    setEditingReason(null);
    setIsFormOpen(true);
  };

  const handleEdit = (reason: ReturnReason) => {
    setEditingReason(reason);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا السبب؟')) {
      onReasonDeleted?.(id);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingReason(null);
  };

  const handleFormSave = (reasonData: ReturnReasonFormData) => {
    if (editingReason) {
      onReasonUpdated?.(editingReason.id, reasonData);
    } else {
      onReasonAdded?.(reasonData);
    }
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
        <CardTitle className='text-xl font-semibold'>أسباب طلبات الإرجاع</CardTitle>
        <div className='flex items-center gap-2'>
          <Button
            variant='default'
            size='sm'
            onClick={handleAddNew}
            className='flex items-center gap-2'
          >
            <Plus className='h-4 w-4' />
            إضافة سبب جديد
          </Button>
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
        </div>
      </CardHeader>
      <CardContent>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='text-right'>المعرف</TableHead>
                <TableHead className='text-right'>السبب (عربي)</TableHead>
                <TableHead className='text-right'>السبب (إنجليزي)</TableHead>
                <TableHead className='text-right'>أنشأ بواسطة</TableHead>
                <TableHead className='text-right'>تاريخ الإنشاء</TableHead>
                <TableHead className='text-right'>الظهور</TableHead>
                <TableHead className='text-right'>ترتيب الظهور</TableHead>
                <TableHead className='text-right'>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {returnReasons.map(reason => (
                <TableRow key={reason.id}>
                  <TableCell className='font-medium'>{reason.id}</TableCell>
                  <TableCell>{reason.arReason}</TableCell>
                  <TableCell>{reason.enReason}</TableCell>
                  <TableCell>{reason.createdBy}</TableCell>
                  <TableCell>{formatDate(reason.createdAt)}</TableCell>
                  <TableCell>{getVisibilityBadge(reason.isVisible)}</TableCell>
                  <TableCell className='text-center'>{reason.visibilityOrder}</TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleEdit(reason)}
                        className='flex items-center gap-2'
                      >
                        <Edit className='h-4 w-4' />
                        تعديل
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleDelete(reason.id)}
                        className='flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50'
                      >
                        <Trash2 className='h-4 w-4' />
                        حذف
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <AddReturnReasonForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSave={handleFormSave}
        editingReason={editingReason}
      />
    </Card>
  );
}
