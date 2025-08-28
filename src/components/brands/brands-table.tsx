'use client';

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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDeleteBrand, useGetAllBrands } from '@/hooks/useBrands';
import { BrandforAll } from '@/types/brand';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Helper function to validate and format image URL
const getValidImageUrl = (imageUrl: string): string => {
  if (!imageUrl || imageUrl === 'string') {
    return '/placeholder-image.png'; // Fallback image
  }

  // If it's already a full URL, return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // If it starts with a slash, it's a relative path
  if (imageUrl.startsWith('/')) {
    return imageUrl;
  }

  // Otherwise, assume it's a relative path and add leading slash
  return `/${imageUrl}`;
};

export default function BrandsTable() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const { data, isLoading, error } = useGetAllBrands('en', currentPage, pageSize);
  const deleteBrandMutation = useDeleteBrand();

  // Debug logging
  console.log('BrandsTable - data:', data);
  console.log('BrandsTable - isLoading:', isLoading);
  console.log('BrandsTable - error:', error);

  const brands = data?.brands || [];
  const pagination = data?.pagination;

  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof BrandforAll>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedBrand, setSelectedBrand] = useState<BrandforAll | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState<BrandforAll | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  // Filter brands (client-side filtering for current page)
  const filteredBrands = brands.filter(
    brand =>
      brand.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.id.toString().includes(searchTerm),
  );

  // Sort brands (client-side sorting for current page)

  const handleSort = (field: keyof BrandforAll) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleViewDetails = (brand: BrandforAll) => {
    setSelectedBrand(brand);
    setShowDetailsDialog(true);
  };

  const handleEdit = (brand: BrandforAll) => {
    router.push(`/brands/edit/${brand.id}`);
  };

  const handleDelete = (brand: BrandforAll) => {
    setBrandToDelete(brand);
  };

  const confirmDelete = () => {
    if (brandToDelete) {
      deleteBrandMutation.mutate(brandToDelete.id, {
        onSuccess: () => {
          setBrandToDelete(null);
        },
      });
    }
  };

  const handleImageError = (imageUrl: string) => {
    // Prevent infinite loop by tracking failed images
    if (!failedImages.has(imageUrl)) {
      setFailedImages(prev => new Set(prev).add(imageUrl));
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchTerm(''); // Clear search when changing pages
  };

  const handlePageSizeChange = (newPageSize: string) => {
    setPageSize(parseInt(newPageSize));
    setCurrentPage(1); // Reset to first page when changing page size
    setSearchTerm(''); // Clear search when changing page size
  };

  const totalPages = pagination ? Math.ceil(pagination.totalCount / pagination.pageSize) : 0;

  if (isLoading && !data) {
    return (
      <Card>
        <CardContent className='flex items-center justify-center py-8'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
            <p className='text-muted-foreground'>جاري تحميل العلامات التجارية...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error && !data) {
    return (
      <Card>
        <CardContent className='flex items-center justify-center py-8'>
          <div className='text-center'>
            <p className='text-destructive mb-2'>خطأ في تحميل العلامات التجارية</p>
            <p className='text-muted-foreground text-sm'>
              {error instanceof Error ? error.message : 'فشل في تحميل العلامات التجارية'}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <span>إدارة العلامات التجارية</span>
            <Button onClick={() => router.push('/brands/add')} className='flex items-center gap-2'>
              <Plus className='w-4 h-4' />
              إضافة علامة تجارية جديدة
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Page Size Controls */}
          <div className='mb-4 flex flex-col sm:flex-row gap-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <Input
                placeholder='البحث في العلامات التجارية...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='pl-10'
              />
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-sm text-muted-foreground'>عرض:</span>
              <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
                <SelectTrigger className='w-20'>
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
                    المعرف {sortField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => handleSort('name')}
                  >
                    الاسم {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead>الصورة</TableHead>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => handleSort('visibilityOrder')}
                  >
                    ترتيب الظهور{' '}
                    {sortField === 'visibilityOrder' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>

                  <TableHead className='text-right'>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBrands.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className='text-center py-8'>
                      <p className='text-muted-foreground'>لم يتم العثور على علامات تجارية</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBrands.map(brand => {
                    const imageUrl = getValidImageUrl(brand.imageUrl);
                    const hasFailed = failedImages.has(imageUrl);

                    return (
                      <TableRow key={brand.id}>
                        <TableCell className='font-medium'>{brand.id}</TableCell>
                        <TableCell>{brand.name}</TableCell>
                        <TableCell>
                          <div className='w-12 h-12 bg-muted rounded-lg overflow-hidden flex items-center justify-center'>
                            {hasFailed ? (
                              <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                                <span className='text-xs text-gray-500'>لا توجد صورة</span>
                              </div>
                            ) : (
                              <Image
                                src={imageUrl}
                                alt={brand.name || ''}
                                width={48}
                                height={48}
                                className='w-full h-full object-cover'
                                onError={() => handleImageError(imageUrl)}
                              />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{brand.visibilityOrder}</TableCell>

                        <TableCell className='text-right'>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant='ghost' className='h-8 w-8 p-0'>
                                <span className='sr-only'>فتح القائمة</span>
                                <MoreHorizontal className='h-4 w-4' />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                              <DropdownMenuItem onClick={() => handleViewDetails(brand)}>
                                <Eye className='mr-2 h-4 w-4' />
                                عرض التفاصيل
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEdit(brand)}>
                                <Pencil className='mr-2 h-4 w-4' />
                                تعديل
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(brand)}
                                className='text-destructive'
                              >
                                <Trash2 className='mr-2 h-4 w-4' />
                                حذف
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {pagination && totalPages > 1 && (
            <div className='flex items-center justify-between mt-4'>
              <div className='text-sm text-muted-foreground'>
                عرض {(pagination.currentPage - 1) * pagination.pageSize + 1} إلى{' '}
                {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalCount)} من{' '}
                {pagination.totalCount} نتيجة
              </div>
              <div className='flex items-center space-x-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  <ChevronLeft className='h-4 w-4' />
                  السابق
                </Button>
                <div className='flex items-center space-x-1'>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? 'default' : 'outline'}
                        size='sm'
                        onClick={() => handlePageChange(pageNum)}
                        className='w-8 h-8'
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                >
                  التالي
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle>تفاصيل العلامة التجارية</DialogTitle>
            <DialogDescription>عرض المعلومات التفصيلية حول هذه العلامة التجارية</DialogDescription>
          </DialogHeader>
          {selectedBrand && (
            <div className='space-y-4'>
              <div className='flex items-center space-x-4'>
                <div className='w-16 h-16 bg-muted rounded-lg overflow-hidden'>
                  {failedImages.has(getValidImageUrl(selectedBrand.imageUrl)) ? (
                    <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                      <span className='text-xs text-gray-500'>لا توجد صورة</span>
                    </div>
                  ) : (
                    <Image
                      src={getValidImageUrl(selectedBrand.imageUrl)}
                      alt={selectedBrand.name || ''}
                      width={64}
                      height={64}
                      className='w-full h-full object-cover'
                      onError={() => handleImageError(getValidImageUrl(selectedBrand.imageUrl))}
                    />
                  )}
                </div>
                <div>
                  <h3 className='font-semibold text-lg'>{selectedBrand.name}</h3>
                  <p className='text-sm text-muted-foreground'>المعرف: {selectedBrand.id}</p>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div>
                  <span className='font-medium'>ترتيب الظهور:</span>
                  <p>{selectedBrand.visibilityOrder}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!brandToDelete} onOpenChange={() => setBrandToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تأكيد الحذف</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من أنك تريد حذف العلامة التجارية <strong>{brandToDelete?.name}</strong>؟
              هذا الإجراء لا يمكن التراجع عنه.
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-end space-x-2'>
            <Button variant='outline' onClick={() => setBrandToDelete(null)}>
              إلغاء
            </Button>
            <Button
              variant='destructive'
              onClick={confirmDelete}
              disabled={deleteBrandMutation.isPending}
            >
              {deleteBrandMutation.isPending ? 'جاري الحذف...' : 'حذف'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
