'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Pagination as PaginationType } from '@/types/client';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  loading?: boolean;
}

export function Pagination({
  pagination,
  onPageChange,
  onPageSizeChange,
  loading,
}: PaginationProps) {
  const { currentPage, pageSize, totalCount, totalPages } = pagination;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className='flex items-center justify-between px-2'>
      {/* <div className='flex items-center space-x-2 space-x-reverse'>
        <p className='text-sm text-muted-foreground'>
          عرض {startItem} إلى {endItem} من {totalCount} عنصر
        </p>
        <div className='flex items-center space-x-2 space-x-reverse'>
          <p className='text-sm text-muted-foreground'>عناصر في الصفحة:</p>
          <Select
            value={pageSize.toString()}
            onValueChange={value => onPageSizeChange(Number(value))}
            disabled={loading}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='10'>10</SelectItem>
              <SelectItem value='20'>20</SelectItem>
              <SelectItem value='50'>50</SelectItem>
              <SelectItem value='100'>100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div> */}

      <div className='flex items-center space-x-2 space-x-reverse'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1 || loading}
        >
          <ChevronRight className='h-4 w-4' />
          السابق
        </Button>

        <div className='flex items-center space-x-1 space-x-reverse'>
          {getVisiblePages().map((page, index) => (
            <div key={index}>
              {page === '...' ? (
                <span className='px-3 py-2 text-sm text-muted-foreground'>...</span>
              ) : (
                <Button
                  variant={currentPage === page ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => onPageChange(page as number)}
                  disabled={loading}
                  className='h-8 w-8 p-0'
                >
                  {page}
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button
          variant='outline'
          size='sm'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || loading}
        >
          التالي
          <ChevronLeft className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}
