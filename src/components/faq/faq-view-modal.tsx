'use client';

import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/context/language';
import { useGetFAQById } from '@/hooks/useFAQ';
import { FAQ } from '@/types/faq';
import { format } from 'date-fns';

interface FAQViewModalProps {
  faq: FAQ | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FAQViewModal({ faq, open, onOpenChange }: FAQViewModalProps) {
  const { language } = useLanguage();
  const { data: faqDetail, isLoading: loading } = useGetFAQById(faq?.id || 0, language, {
    enabled: open && !!faq?.id,
  });

  if (!faq) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[700px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            FAQ Details
            <Badge variant='secondary'>#{faq.id}</Badge>
          </DialogTitle>
          <DialogDescription>
            View detailed information about this frequently asked question.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className='flex items-center justify-center h-32'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
          </div>
        ) : faqDetail ? (
          <div className='space-y-6'>
            <div className='space-y-4'>
              <div>
                <h4 className='text-sm font-medium text-gray-500 mb-2'>Arabic Question</h4>
                <p className='text-sm bg-gray-50 p-3 rounded-md'>{faqDetail.questionAr}</p>
              </div>
              <div>
                <h4 className='text-sm font-medium text-gray-500 mb-2'>English Question</h4>
                <p className='text-sm bg-gray-50 p-3 rounded-md'>{faqDetail.questionEn}</p>
              </div>
            </div>

            <Separator />

            <div className='space-y-4'>
              <div>
                <h4 className='text-sm font-medium text-gray-500 mb-2'>Arabic Answer</h4>
                <p className='text-sm bg-gray-50 p-3 rounded-md whitespace-pre-wrap'>
                  {faqDetail.answearAr}
                </p>
              </div>
              <div>
                <h4 className='text-sm font-medium text-gray-500 mb-2'>English Answer</h4>
                <p className='text-sm bg-gray-50 p-3 rounded-md whitespace-pre-wrap'>
                  {faqDetail.answearEn}
                </p>
              </div>
            </div>

            <Separator />

            <div className='flex items-center justify-between text-sm text-gray-500'>
              <span>Created at:</span>
              <span>{format(new Date(faqDetail.createdAt), 'MMM dd, yyyy HH:mm')}</span>
            </div>
          </div>
        ) : (
          <div className='text-center py-8'>
            <p className='text-gray-500'>Failed to load FAQ details</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
