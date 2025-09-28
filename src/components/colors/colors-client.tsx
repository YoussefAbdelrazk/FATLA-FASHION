'use client';

import { AddColorForm } from '@/components/colors/add-color-form';
import { ColorViewModal } from '@/components/colors/color-view-modal';
import { ColorsTable } from '@/components/colors/colors-table';
import { EditColorForm } from '@/components/colors/edit-color-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language';
import { useDeleteColor, useGetAllColors } from '@/hooks/useColors';
import { Color } from '@/types/color';
import { FileQuestion, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export function ColorsClient() {
  const { language } = useLanguage();
  const { data: colors = [], isLoading: loading, error, refetch } = useGetAllColors(language);
  const deleteColorMutation = useDeleteColor();
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleEdit = (color: Color) => {
    setSelectedColor(color);
    setEditOpen(true);
  };

  const handleView = (id: number) => {
    if (Array.isArray(colors)) {
      const color = colors.find(c => c.id === id);
      if (color) {
        setSelectedColor(color);
        setViewOpen(true);
      }
    }
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      deleteColorMutation.mutate({ id: deleteId, lang: language });
      setDeleteId(null);
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center h-64 space-y-4'>
        <FileQuestion className='h-12 w-12 text-gray-400' />
        <div className='text-center'>
          <h3 className='text-lg font-medium text-gray-900'>خطأ في تحميل الألوان</h3>
          <p className='text-gray-500'>{error.message}</p>
        </div>
        <Button onClick={handleRefresh} variant='outline'>
          <RefreshCw className='mr-2 h-4 w-4' />
          حاول مرة أخرى
        </Button>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>إدارة الألوان</h1>
          <p className='text-gray-500'>إدارة ألوان المنتجات</p>
        </div>
        <div className='flex items-center gap-2'>
          <Button onClick={handleRefresh} variant='outline' disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            تحديث
          </Button>
          <AddColorForm onSuccess={handleRefresh} />
        </div>
      </div>

      <ColorsTable
        colors={colors}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        loading={loading}
      />

      <EditColorForm
        color={selectedColor}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSuccess={handleRefresh}
      />

      <ColorViewModal color={selectedColor} open={viewOpen} onOpenChange={setViewOpen} />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
            <AlertDialogDescription>
              لا يمكن التراجع عن هذا الإجراء. سيتم حذف اللون نهائياً.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className='bg-red-600 hover:bg-red-700'>
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
