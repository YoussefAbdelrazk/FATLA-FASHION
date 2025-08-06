'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { categories } from '@/data/categories';
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
// import { useDeleteCategory } from '@/hooks/useCategories';
// import { useGetAllCategories } from '@/hooks/useCategories';
import { Category } from '@/types/category';
import { format } from 'date-fns';
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
      <ChevronUp className='w-4 h-4 ml-1' />
    ) : (
      <ChevronDown className='w-4 h-4 ml-1' />
    );
  };

  if (false) {
    return (
      <Card>
        <CardContent className='flex items-center justify-center py-12'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
            <p className='text-muted-foreground'>Loading categories...</p>
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
            <p className='text-destructive mb-2'>Error loading categories</p>
            <p className='text-muted-foreground text-sm'>{'An error occurred'}</p>
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
            <span>Categories Management</span>
            <Button
              onClick={() => router.push('/categories/add')}
              className='flex items-center gap-2'
            >
              <Plus className='w-4 h-4' />
              Add New Category
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className='mb-6'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <Input
                placeholder='Search categories by name...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='pl-10'
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
                      ID
                      <SortIcon field='id' />
                    </div>
                  </TableHead>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => handleSort('arName')}
                  >
                    <div className='flex items-center'>
                      Arabic Name
                      <SortIcon field='arName' />
                    </div>
                  </TableHead>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => handleSort('enName')}
                  >
                    <div className='flex items-center'>
                      English Name
                      <SortIcon field='enName' />
                    </div>
                  </TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => handleSort('productsCount')}
                  >
                    <div className='flex items-center'>
                      Products Count
                      <SortIcon field='productsCount' />
                    </div>
                  </TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
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
                            alt='Category Image'
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
                        {category.productsCount} products
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'>Open menu</span>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem onClick={() => handleShowDetails(category)}>
                            <Eye className='mr-2 h-4 w-4' />
                            Show Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(category)}>
                            <Edit className='mr-2 h-4 w-4' />
                            Edit Category
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(category)}
                            className='text-red-600 focus:text-red-600'
                          >
                            <Trash2 className='mr-2 h-4 w-4' />
                            Delete Category
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
              <h3 className='text-lg font-semibold mb-2'>No categories found</h3>
              <p className='text-muted-foreground mb-4'>
                {searchTerm
                  ? 'Try adjusting your search terms.'
                  : 'Get started by creating your first category.'}
              </p>
              {!searchTerm && (
                <Button onClick={() => router.push('/categories/add')}>
                  <Plus className='w-4 h-4 mr-2' />
                  Create First Category
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
            <DialogTitle>Category Details</DialogTitle>
            <DialogDescription>Detailed information about the selected category</DialogDescription>
          </DialogHeader>
          {selectedCategory && (
            <div className='space-y-6'>
              <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>Arabic Content</h3>
                  <div className='space-y-3'>
                    <div>
                      <label className='text-sm font-medium text-muted-foreground'>
                        Arabic Name
                      </label>
                      <p className='text-lg font-semibold'>{selectedCategory.arName}</p>
                    </div>
                  </div>
                </div>

                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>English Content</h3>
                  <div className='space-y-3'>
                    <div>
                      <label className='text-sm font-medium text-muted-foreground'>
                        English Name
                      </label>
                      <p className='text-lg font-semibold'>{selectedCategory.enName}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Category Image</h3>
                <div className='w-full h-48 bg-muted rounded-lg flex items-center justify-center overflow-hidden'>
                  {selectedCategory.image ? (
                    <Image
                      src={selectedCategory.image}
                      alt='Category Image'
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
                  <label className='text-sm font-medium text-muted-foreground'>
                    Products Count
                  </label>
                  <Badge variant='secondary' className='text-lg'>
                    {selectedCategory.productsCount} products
                  </Badge>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-muted-foreground'>Created At</label>
                  <p className='text-lg'>
                    {format(new Date(selectedCategory.createdAt), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
              </div>

              <div className='flex space-x-2 pt-4'>
                <Button onClick={() => handleEdit(selectedCategory)} className='flex-1'>
                  <Edit className='w-4 h-4 mr-2' />
                  Edit Category
                </Button>
                <Button variant='outline' className='flex-1'>
                  <Eye className='w-4 h-4 mr-2' />
                  View Products
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
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete category <strong>{categoryToDelete?.enName}</strong>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-end space-x-2'>
            <Button variant='outline' onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
