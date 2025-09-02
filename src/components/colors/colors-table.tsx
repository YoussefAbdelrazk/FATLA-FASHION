'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { colors } from '@/data/colors';
import { Color } from '@/types/color';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import {
  ChevronDown,
  ChevronUp,
  Edit,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ColorsTable() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Color>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [colorToDelete, setColorToDelete] = useState<Color | null>(null);

  const handleSort = (field: keyof Color) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleShowDetails = (color: Color) => {
    setSelectedColor(color);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (color: Color) => {
    router.push(`/colors/edit/${color.id}`);
  };

  const handleDelete = (color: Color) => {
    setColorToDelete(color);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (colorToDelete) {
      // TODO: Implement delete functionality
      console.log('Delete color:', colorToDelete.id);
      setIsDeleteModalOpen(false);
      setColorToDelete(null);
    }
  };

  // Filter and sort colors
  const filteredAndSortedColors = colors
    .filter(
      color =>
        color.arName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        color.enName.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

  const SortIcon = ({ field }: { field: keyof Color }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className='w-4 h-4 mr-1' />
    ) : (
      <ChevronDown className='w-4 h-4 mr-1' />
    );
  };

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <span>إدارة الألوان</span>
            <Button onClick={() => router.push('/colors/add')} className='flex items-center gap-2'>
              <Plus className='w-4 h-4' />
              إضافة لون جديد
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className='mb-6'>
            <div className='relative'>
              <Search className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <Input
                placeholder='البحث في الألوان بالاسم...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='pr-10 text-right'
              />
            </div>
          </div>

          {/* Table */}
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50 text-center'
                    onClick={() => handleSort('id')}
                  >
                    <div className='flex items-center justify-center'>
                      المعرف
                      <SortIcon field='id' />
                    </div>
                  </TableHead>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50 text-right'
                    onClick={() => handleSort('arName')}
                  >
                    <div className='flex items-center justify-end'>
                      الاسم العربي
                      <SortIcon field='arName' />
                    </div>
                  </TableHead>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50 text-right'
                    onClick={() => handleSort('enName')}
                  >
                    <div className='flex items-center justify-end'>
                      الاسم الإنجليزي
                      <SortIcon field='enName' />
                    </div>
                  </TableHead>
                  <TableHead className='text-center'>اللون</TableHead>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50 text-center'
                    onClick={() => handleSort('productsCount')}
                  >
                    <div className='flex items-center justify-center'>
                      عدد المنتجات
                      <SortIcon field='productsCount' />
                    </div>
                  </TableHead>
                  <TableHead className='text-right'>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedColors.map(color => (
                  <TableRow key={color.id} className='hover:bg-muted/50'>
                    <TableCell className='font-mono text-sm text-center'>{color.id}</TableCell>
                    <TableCell className='text-right'>
                      <div className='max-w-[150px] truncate flex justify-end' title={color.arName}>
                        {color.arName}
                      </div>
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='max-w-[150px] truncate flex justify-end' title={color.enName}>
                        {color.enName}
                      </div>
                    </TableCell>
                    <TableCell className='text-center'>
                      <div className='flex items-center justify-center gap-3'>
                        <div
                          className='w-8 h-8 rounded-full border-2 border-gray-200 shadow-sm'
                          style={{ backgroundColor: color.color }}
                          title={color.color}
                        />
                        <span className='text-sm font-mono text-muted-foreground'>
                          {color.color}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className='text-center'>
                      <Badge variant='secondary' className='font-normal'>
                        {color.productsCount} منتج
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'>فتح القائمة</span>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem onClick={() => handleShowDetails(color)}>
                            <Eye className='ml-2 h-4 w-4' />
                            عرض التفاصيل
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(color)}>
                            <Edit className='ml-2 h-4 w-4' />
                            تعديل اللون
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(color)}
                            className='text-red-600 focus:text-red-600'
                          >
                            <Trash2 className='ml-2 h-4 w-4' />
                            حذف اللون
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Empty State */}
          {filteredAndSortedColors.length === 0 && (
            <div className='text-center py-12'>
              <div className='w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4'>
                <div className='w-6 h-6 bg-muted-foreground rounded-full'></div>
              </div>
              <h3 className='text-lg font-semibold mb-2'>لم يتم العثور على ألوان</h3>
              <p className='text-muted-foreground mb-4'>
                {searchTerm ? 'حاول تعديل مصطلحات البحث.' : 'ابدأ بإنشاء أول لون لك.'}
              </p>
              {!searchTerm && (
                <Button onClick={() => router.push('/colors/add')}>
                  <Plus className='w-4 h-4 ml-2' />
                  إنشاء أول لون
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Color Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className='max-w-4xl'>
          <DialogHeader>
            <DialogTitle>تفاصيل اللون</DialogTitle>
            <DialogDescription>معلومات مفصلة عن اللون المحدد</DialogDescription>
          </DialogHeader>
          {selectedColor && (
            <div className='space-y-6'>
              <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>المحتوى العربي</h3>
                  <div className='space-y-3'>
                    <div>
                      <label className='text-sm font-medium text-muted-foreground'>
                        الاسم العربي
                      </label>
                      <p className='text-lg font-semibold'>{selectedColor.arName}</p>
                    </div>
                  </div>
                </div>

                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>المحتوى الإنجليزي</h3>
                  <div className='space-y-3'>
                    <div>
                      <label className='text-sm font-medium text-muted-foreground'>
                        الاسم الإنجليزي
                      </label>
                      <p className='text-lg font-semibold'>{selectedColor.enName}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>معلومات اللون</h3>
                <div className='flex items-center gap-4'>
                  <div
                    className='w-16 h-16 rounded-lg border-2 border-gray-200 shadow-sm'
                    style={{ backgroundColor: selectedColor.color }}
                    title={selectedColor.color}
                  />
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-muted-foreground'>رمز اللون</label>
                    <p className='text-lg font-mono'>{selectedColor.color}</p>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-muted-foreground'>عدد المنتجات</label>
                  <Badge variant='secondary' className='text-lg'>
                    {selectedColor.productsCount} منتج
                  </Badge>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-muted-foreground'>تاريخ الإنشاء</label>
                  <p className='text-lg'>
                    {format(new Date(selectedColor.createdAt), 'MMM dd, yyyy HH:mm', {
                      locale: ar,
                    })}
                  </p>
                </div>
              </div>

              <div className='flex space-x-2 space-x-reverse pt-4'>
                <Button onClick={() => handleEdit(selectedColor)} className='flex-1'>
                  <Edit className='w-4 h-4 ml-2' />
                  تعديل اللون
                </Button>
                <Button variant='outline' className='flex-1'>
                  <Eye className='w-4 h-4 ml-2' />
                  عرض المنتجات
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تأكيد الحذف</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من حذف اللون <strong>{colorToDelete?.arName}</strong>؟ لا يمكن التراجع عن
              هذا الإجراء.
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-end space-x-2 space-x-reverse'>
            <Button variant='outline' onClick={() => setIsDeleteModalOpen(false)}>
              إلغاء
            </Button>
            <Button variant='destructive' onClick={confirmDelete}>
              حذف
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
