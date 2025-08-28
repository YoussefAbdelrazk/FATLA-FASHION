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
import { categories } from '@/data/categories';
// import { useDeleteCategory } from '@/hooks/useCategories';
// import { useGetAllCategories } from '@/hooks/useCategories';
import { Category } from '@/types/category';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import {
  ChevronDown,
  ChevronUp,
  Edit,
  Eye,
  Image as ImageIcon,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CategoriesTable() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Category>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  // React Query hooks
  // const { data: categories = [], isLoading, error } = useGetAllCategories('en');
  // const deleteCategoryMutation = useDeleteCategory();

  const handleSort = (field: keyof Category) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleShowDetails = (category: Category) => {
    setSelectedCategory(category);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    router.push(`/categories/edit/${category.id}`);
  };

  const handleDelete = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      // deleteCategoryMutation.mutate(
      // { id: categoryToDelete.id, lang: 'en' },
      // {
      // onSuccess: () => {
      //   setIsDeleteModalOpen(false);
      //   setCategoryToDelete(null);
      // },
      // },
      //  );
    }
  };

  // Filter and sort categories
  const filteredAndSortedCategories = categories
    .filter(
      category =>
        category.arName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.enName.toLowerCase().includes(searchTerm.toLowerCase()),
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

  const SortIcon = ({ field }: { field: keyof Category }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className='w-4 h-4 mr-1' />
    ) : (
      <ChevronDown className='w-4 h-4 mr-1' />
    );
  };

  if (false) {
    return (
      <Card>
        <CardContent className='flex items-center justify-center py-12'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
            <p className='text-muted-foreground'>جاري تحميل الفئات...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (false) {
    return (
      <Card>
        <CardContent className='flex items-center justify-center py-12'>
          <div className='text-center'>
            <p className='text-destructive mb-2'>خطأ في تحميل الفئات</p>
            <p className='text-muted-foreground text-sm'>حدث خطأ ما</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <span>إدارة الفئات</span>
            <Button
              onClick={() => router.push('/categories/add')}
              className='flex items-center gap-2'
            >
              <Plus className='w-4 h-4' />
              إضافة فئة جديدة
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className='mb-6'>
            <div className='relative'>
              <Search className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <Input
                placeholder='البحث في الفئات بالاسم...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='pr-10'
              />
            </div>
          </div>

          {/* Table */}
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => handleSort('id')}
                  >
                    <div className='flex items-center'>
                      المعرف
                      <SortIcon field='id' />
                    </div>
                  </TableHead>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => handleSort('arName')}
                  >
                    <div className='flex items-center'>
                      الاسم العربي
                      <SortIcon field='arName' />
                    </div>
                  </TableHead>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => handleSort('enName')}
                  >
                    <div className='flex items-center'>
                      الاسم الإنجليزي
                      <SortIcon field='enName' />
                    </div>
                  </TableHead>
                  <TableHead>الصورة</TableHead>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => handleSort('productsCount')}
                  >
                    <div className='flex items-center'>
                      عدد المنتجات
                      <SortIcon field='productsCount' />
                    </div>
                  </TableHead>
                  <TableHead className='text-right'>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedCategories.map(category => (
                  <TableRow key={category.id} className='hover:bg-muted/50'>
                    <TableCell className='font-mono text-sm'>{category.id}</TableCell>
                    <TableCell>
                      <div className='max-w-[150px] truncate' title={category.arName}>
                        {category.arName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='max-w-[150px] truncate' title={category.enName}>
                        {category.enName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='w-16 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden'>
                        {category.image ? (
                          <Image
                            src={category.image}
                            alt='صورة الفئة'
                            width={64}
                            height={48}
                            className='object-cover w-full h-full'
                          />
                        ) : (
                          <ImageIcon className='w-6 h-6 text-muted-foreground' />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant='secondary' className='font-normal'>
                        {category.productsCount} منتج
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
                          <DropdownMenuItem onClick={() => handleShowDetails(category)}>
                            <Eye className='ml-2 h-4 w-4' />
                            عرض التفاصيل
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(category)}>
                            <Edit className='ml-2 h-4 w-4' />
                            تعديل الفئة
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(category)}
                            className='text-red-600 focus:text-red-600'
                          >
                            <Trash2 className='ml-2 h-4 w-4' />
                            حذف الفئة
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
          {filteredAndSortedCategories.length === 0 && (
            <div className='text-center py-12'>
              <ImageIcon className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
              <h3 className='text-lg font-semibold mb-2'>لم يتم العثور على فئات</h3>
              <p className='text-muted-foreground mb-4'>
                {searchTerm ? 'حاول تعديل مصطلحات البحث.' : 'ابدأ بإنشاء أول فئة لك.'}
              </p>
              {!searchTerm && (
                <Button onClick={() => router.push('/categories/add')}>
                  <Plus className='w-4 h-4 ml-2' />
                  إنشاء أول فئة
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className='max-w-4xl'>
          <DialogHeader>
            <DialogTitle>تفاصيل الفئة</DialogTitle>
            <DialogDescription>معلومات مفصلة عن الفئة المحددة</DialogDescription>
          </DialogHeader>
          {selectedCategory && (
            <div className='space-y-6'>
              <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>المحتوى العربي</h3>
                  <div className='space-y-3'>
                    <div>
                      <label className='text-sm font-medium text-muted-foreground'>
                        الاسم العربي
                      </label>
                      <p className='text-lg font-semibold'>{selectedCategory.arName}</p>
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
                      <p className='text-lg font-semibold'>{selectedCategory.enName}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>صورة الفئة</h3>
                <div className='w-full h-48 bg-muted rounded-lg flex items-center justify-center overflow-hidden'>
                  {selectedCategory.image ? (
                    <Image
                      src={selectedCategory.image}
                      alt='صورة الفئة'
                      width={400}
                      height={192}
                      className='object-cover w-full h-full'
                    />
                  ) : (
                    <ImageIcon className='w-16 h-16 text-muted-foreground' />
                  )}
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-muted-foreground'>عدد المنتجات</label>
                  <Badge variant='secondary' className='text-lg'>
                    {selectedCategory.productsCount} منتج
                  </Badge>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-muted-foreground'>تاريخ الإنشاء</label>
                  <p className='text-lg'>
                    {format(new Date(selectedCategory.createdAt), 'MMM dd, yyyy HH:mm', {
                      locale: ar,
                    })}
                  </p>
                </div>
              </div>

              <div className='flex space-x-2 space-x-reverse pt-4'>
                <Button onClick={() => handleEdit(selectedCategory)} className='flex-1'>
                  <Edit className='w-4 h-4 ml-2' />
                  تعديل الفئة
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
              هل أنت متأكد من حذف الفئة <strong>{categoryToDelete?.arName}</strong>؟ لا يمكن التراجع
              عن هذا الإجراء.
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
