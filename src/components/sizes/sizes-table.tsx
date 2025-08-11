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
import { sizes } from '@/data/sizes';
import { Size } from '@/types/size';
import { format } from 'date-fns';
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

export default function SizesTable() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Size>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sizeToDelete, setSizeToDelete] = useState<Size | null>(null);

  const handleSort = (field: keyof Size) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleShowDetails = (size: Size) => {
    setSelectedSize(size);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (size: Size) => {
    router.push(`/sizes/edit/${size.id}`);
  };

  const handleDelete = (size: Size) => {
    setSizeToDelete(size);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (sizeToDelete) {
      // TODO: Implement delete functionality
      console.log('Deleting size:', sizeToDelete.id);
      setIsDeleteModalOpen(false);
      setSizeToDelete(null);
    }
  };

  // Filter and sort sizes
  const filteredAndSortedSizes = sizes
    .filter(
      size =>
        size.arName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        size.enName.toLowerCase().includes(searchTerm.toLowerCase()),
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

  const SortIcon = ({ field }: { field: keyof Size }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className='w-4 h-4 ml-1' />
    ) : (
      <ChevronDown className='w-4 h-4 ml-1' />
    );
  };

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <span>Sizes Management</span>
            <Button onClick={() => router.push('/sizes/add')} className='flex items-center gap-2'>
              <Plus className='w-4 h-4' />
              Add New Size
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className='mb-6'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <Input
                placeholder='Search sizes by name...'
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
                {filteredAndSortedSizes.map(size => (
                  <TableRow key={size.id} className='hover:bg-muted/50'>
                    <TableCell className='font-mono text-sm'>{size.id}</TableCell>
                    <TableCell>
                      <div className='max-w-[150px] truncate' title={size.arName}>
                        {size.arName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='max-w-[150px] truncate' title={size.enName}>
                        {size.enName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant='secondary' className='font-normal'>
                        {size.productsCount} products
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
                          <DropdownMenuItem onClick={() => handleShowDetails(size)}>
                            <Eye className='mr-2 h-4 w-4' />
                            Show Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(size)}>
                            <Edit className='mr-2 h-4 w-4' />
                            Edit Size
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(size)}
                            className='text-red-600 focus:text-red-600'
                          >
                            <Trash2 className='mr-2 h-4 w-4' />
                            Delete Size
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
          {filteredAndSortedSizes.length === 0 && (
            <div className='text-center py-12'>
              <div className='w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4'>
                <span className='text-2xl'>📏</span>
              </div>
              <h3 className='text-lg font-semibold mb-2'>No sizes found</h3>
              <p className='text-muted-foreground mb-4'>
                {searchTerm
                  ? 'Try adjusting your search terms.'
                  : 'Get started by creating your first size.'}
              </p>
              {!searchTerm && (
                <Button onClick={() => router.push('/sizes/add')}>
                  <Plus className='w-4 h-4 mr-2' />
                  Create First Size
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Size Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Size Details</DialogTitle>
            <DialogDescription>Detailed information about the selected size</DialogDescription>
          </DialogHeader>
          {selectedSize && (
            <div className='space-y-6'>
              <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>Arabic Content</h3>
                  <div className='space-y-3'>
                    <div>
                      <label className='text-sm font-medium text-muted-foreground'>
                        Arabic Name
                      </label>
                      <p className='text-lg font-semibold'>{selectedSize.arName}</p>
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
                      <p className='text-lg font-semibold'>{selectedSize.enName}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-muted-foreground'>
                    Products Count
                  </label>
                  <Badge variant='secondary' className='text-lg'>
                    {selectedSize.productsCount} products
                  </Badge>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-muted-foreground'>Created At</label>
                  <p className='text-lg'>
                    {format(new Date(selectedSize.createdAt), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
              </div>

              <div className='flex space-x-2 pt-4'>
                <Button onClick={() => handleEdit(selectedSize)} className='flex-1'>
                  <Edit className='w-4 h-4 mr-2' />
                  Edit Size
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
              Are you sure you want to delete size <strong>{sizeToDelete?.enName}</strong>? This
              action cannot be undone.
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
