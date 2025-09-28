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
import { useGetColorById } from '@/hooks/useColors';
import { Color } from '@/types/color';
import { format } from 'date-fns';

interface ColorViewModalProps {
  color: Color | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ColorViewModal({ color, open, onOpenChange }: ColorViewModalProps) {
  const { language } = useLanguage();
  const { data: colorDetail, isLoading: loading } = useGetColorById(color?.id || 0, language, {
    enabled: open && !!color?.id,
  });

  if (!color) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[700px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            تفاصيل اللون
            <Badge variant='secondary'>#{color.id}</Badge>
          </DialogTitle>
          <DialogDescription>عرض المعلومات التفصيلية للون.</DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className='flex items-center justify-center h-32'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
          </div>
        ) : colorDetail ? (
          <div className='space-y-6'>
            <div className='space-y-4'>
              <div>
                <h4 className='text-sm font-medium text-gray-500 mb-2'>الاسم (عربي)</h4>
                <p className='text-sm bg-gray-50 p-3 rounded-md'>{colorDetail.nameAr}</p>
              </div>
              <div>
                <h4 className='text-sm font-medium text-gray-500 mb-2'>الاسم (إنجليزي)</h4>
                <p className='text-sm bg-gray-50 p-3 rounded-md'>{colorDetail.nameEn}</p>
              </div>
            </div>

            <Separator />

            <div className='space-y-4'>
              <div>
                <h4 className='text-sm font-medium text-gray-500 mb-2'>كود اللون</h4>
                <div className='flex items-center gap-3'>
                  <div
                    className='w-12 h-12 rounded-lg border border-gray-300'
                    style={{ backgroundColor: colorDetail.colorCode }}
                  />
                  <code className='text-sm bg-gray-100 px-3 py-2 rounded'>
                    {colorDetail.colorCode}
                  </code>
                </div>
              </div>
            </div>

            <Separator />

            <div className='flex items-center justify-between text-sm text-gray-500'>
              <span>تاريخ الانشاء:</span>
              <span>{format(new Date(colorDetail.createdAt), 'MMM dd, yyyy HH:mm')}</span>
            </div>
          </div>
        ) : (
          <div className='text-center py-8'>
            <p className='text-gray-500'>فشل في تحميل تفاصيل اللون</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
