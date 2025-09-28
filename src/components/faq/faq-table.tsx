'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useLanguage } from '@/context/language';
import { FAQ } from '@/types/faq';
import { format } from 'date-fns';
import { Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react';

interface FAQTableProps {
  faqs: FAQ[];
  onEdit: (faq: FAQ) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
  loading?: boolean;
}

export function FAQTable({ faqs, onEdit, onDelete, onView, loading }: FAQTableProps) {
  const { language } = useLanguage();

  const handleDelete = (id: number) => {
    onDelete(id);
  };

  // Helper function to get the appropriate content based on language
  const getLocalizedContent = (faq: FAQ) => {
    if (language === 'ar') {
      return {
        question: faq.questionAr || faq.question,
        answer: faq.answearAr || faq.answear,
      };
    } else {
      return {
        question: faq.questionEn || faq.question,
        answer: faq.answearEn || faq.answear,
      };
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-32'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  if (!Array.isArray(faqs) || faqs.length === 0) {
    return (
      <div className='text-center py-8'>
        <p className='text-gray-500'>No FAQs found</p>
      </div>
    );
  }

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>اسئلة شائعة</TableHead>
            <TableHead>اجابة</TableHead>
            <TableHead>تاريخ الانشاء</TableHead>
            <TableHead className='text-right'>الاجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {faqs.map(faq => {
            const localizedContent = getLocalizedContent(faq);
            return (
              <TableRow key={faq.id}>
                <TableCell className='font-medium'>
                  <Badge variant='secondary'>#{faq.id}</Badge>
                </TableCell>
                <TableCell className='max-w-xs'>
                  <div className='truncate' title={localizedContent.question}>
                    {localizedContent.question}
                  </div>
                </TableCell>
                <TableCell className='max-w-xs'>
                  <div className='truncate' title={localizedContent.answer}>
                    {localizedContent.answer}
                  </div>
                </TableCell>
                <TableCell>{format(new Date(faq.createdAt), 'MMM dd, yyyy')}</TableCell>
                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' className='h-8 w-8 p-0'>
                        <span className='sr-only'>فتح القائمة</span>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuLabel>الاجراءات</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onView(faq.id)}>
                        <Eye className='mr-2 h-4 w-4' />
                        عرض التفاصيل
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(faq)}>
                        <Edit className='mr-2 h-4 w-4' />
                        تعديل
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(faq.id)}
                        className='text-red-600'
                      >
                        <Trash2 className='mr-2 h-4 w-4' />
                        حذف
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
