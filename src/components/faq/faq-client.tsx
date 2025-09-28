'use client';

import { AddFAQForm } from '@/components/faq/add-faq-form';
import { EditFAQForm } from '@/components/faq/edit-faq-form';
import { FAQTable } from '@/components/faq/faq-table';
import { FAQViewModal } from '@/components/faq/faq-view-modal';
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
import { useDeleteFAQ, useGetAllFAQs } from '@/hooks/useFAQ';
import { FAQ } from '@/types/faq';
import { FileQuestion, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export function FAQClient() {
  const { language } = useLanguage();
  const { data: faqs = [], isLoading: loading, error, refetch } = useGetAllFAQs(language);
  const deleteFAQMutation = useDeleteFAQ();
  const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleEdit = (faq: FAQ) => {
    setSelectedFAQ(faq);
    setEditOpen(true);
  };

  const handleView = (id: number) => {
    if (Array.isArray(faqs)) {
      const faq = faqs.find(f => f.id === id);
      if (faq) {
        setSelectedFAQ(faq);
        setViewOpen(true);
      }
    }
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      deleteFAQMutation.mutate({ id: deleteId, lang: language });
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
          <h3 className='text-lg font-medium text-gray-900'>Error loading FAQs</h3>
          <p className='text-gray-500'>{error.message}</p>
        </div>
        <Button onClick={handleRefresh} variant='outline'>
          <RefreshCw className='mr-2 h-4 w-4' />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>ادارة الاسئلة الشائعة</h1>
        </div>
        <div className='flex items-center gap-2'>
          <Button onClick={handleRefresh} variant='outline' disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            تحديث
          </Button>
          <AddFAQForm onSuccess={handleRefresh} />
        </div>
      </div>

      <FAQTable
        faqs={faqs}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        loading={loading}
      />

      <EditFAQForm
        faq={selectedFAQ}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSuccess={handleRefresh}
      />

      <FAQViewModal faq={selectedFAQ} open={viewOpen} onOpenChange={setViewOpen} />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the FAQ.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className='bg-red-600 hover:bg-red-700'>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
