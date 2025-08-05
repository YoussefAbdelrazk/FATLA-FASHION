'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { useDeleteBrand, useGetAllBrands } from '@/hooks/useBrands';
import { getImageUrl } from '@/lib/utils';
import { Brand } from '@/types/brand';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  ChevronDown,
  ChevronUp,
  Edit,
  Eye,
  Globe,
  Image as ImageIcon,
  MoreHorizontal,
  Search,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

export default function BrandsTable() {
  const API_URL = process.env.API_URL!;
  console.log(API_URL);
  // console.log(API_BASE_URL);
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState<Brand | null>(null);

  // React Query hooks
  const { data: brandsResponse, isLoading, error } = useGetAllBrands(1, 10);
  const brands = brandsResponse?.brands || [];
  console.log(brands);
  const deleteBrandMutation = useDeleteBrand();

  // console.log(brands.imageUrl);
  const handleDeleteBrand = (brand: Brand) => {
    setBrandToDelete(brand);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    console.log(brandToDelete?.id);
    if (brandToDelete) {
      try {
        deleteBrandMutation.mutate(brandToDelete.id, {
          onSuccess: () => {
            setIsDeleteModalOpen(false);
            setBrandToDelete(null);
          },
          onError: error => {
            console.error('Error deleting brand:', error);
          },
        });
      } catch (error) {
        console.error('Error deleting brand:', error);
      }
    }
  };

  // const handleUpdateVisibilityOrder = (brand: Brand, newOrder: number) => {
  //   updateVisibilityOrderMutation.mutate({
  //     id: brand.id,
  //     visibilityOrder: newOrder,
  //   });
  // };

  const columns: ColumnDef<Brand>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Brand',
        size: 300,
        cell: ({ row }) => {
          const brand = row.original;
          console.log(brand);
          console.log(brand.imageUrl);
          return (
            <div className='flex items-center space-x-3'>
              <div className='w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden'>
                {brand.imageUrl ? (
                  <Image
                    src={getImageUrl(brand.imageUrl) || ''}
                    alt={brand.name}
                    width={32}
                    height={32}
                    className='object-cover w-full h-full'
                  />
                ) : (
                  <ImageIcon className='w-4 h-4 text-gray-400' />
                )}
              </div>
              <div>
                <div className='font-medium text-gray-900 dark:text-white'>{brand.name}</div>
                <div className='text-xs text-gray-400'>ID: {brand.id}</div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'imageUrl',
        header: 'Image',
        size: 200,
        cell: ({ row }) => {
          const imageUrl = row.getValue('imageUrl') as string;
          return (
            <div className='flex items-center space-x-2'>
              <ImageIcon className='w-4 h-4 text-gray-500' />
              <span className='text-sm text-blue-600 hover:underline'>
                {imageUrl || 'No image'}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'visibilityOrder',
        header: 'Visibility Order',
        size: 150,
        cell: ({ row }) => {
          const visibilityOrder = row.getValue('visibilityOrder') as number;
          return (
            <div className='flex items-center space-x-2'>
              <span className='font-medium'>{visibilityOrder}</span>
            </div>
          );
        },
      },
      {
        accessorKey: 'productsCount',
        header: 'Products Count',
        size: 150,
        cell: ({ row }) => {
          const productsCount = row.getValue('productsCount') as number;
          return (
            <div className='flex items-center space-x-2'>
              <span className='font-medium'>{productsCount}</span>
            </div>
          );
        },
      },

      {
        id: 'actions',
        header: 'Actions',
        size: 100,
        cell: ({ row }) => {
          const brand = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                  <span className='sr-only'>Open menu</span>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedBrand(brand);
                    setIsModalOpen(true);
                  }}
                >
                  <Eye className='mr-2 h-4 w-4' />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(`/brands/edit/${brand.id}`)}>
                  <Edit className='mr-2 h-4 w-4' />
                  Edit Brand
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem
                  onClick={() => handleUpdateVisibilityOrder(brand, brand.visibilityOrder + 1)}
                >
                  <Ban className='mr-2 h-4 w-4' />
                  Increase Visibility Order
                </DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDeleteBrand(brand)} className='text-red-600'>
                  <Trash2 className='mr-2 h-4 w-4' />
                  Delete Brand
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [router],
  );

  const table = useReactTable({
    data: brands,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className='flex items-center justify-center h-64'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto'></div>
            <p className='mt-2 text-gray-600'>Loading brands...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className='flex items-center justify-center h-64'>
          <div className='text-center'>
            <p className='text-red-600'>Error loading brands</p>
            <Button onClick={() => window.location.reload()} className='mt-2'>
              Retry
            </Button>
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
            <span>Brands Management</span>
            <div className='flex items-center space-x-2'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                <Input
                  placeholder='Search brands...'
                  value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                  onChange={event => table.getColumn('name')?.setFilterValue(event.target.value)}
                  className='pl-10 w-64'
                />
              </div>
              <Button onClick={() => router.push('/brands/add')}>Add Brand</Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='max-h-[600px] overflow-auto'>
            <table className='w-full table-fixed'>
              <thead className='bg-gray-50 dark:bg-gray-800 sticky top-0 z-10'>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className='px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800'
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className={`flex items-center space-x-1 ${
                              header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                            }`}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <ChevronUp className='w-4 h-4' />,
                              desc: <ChevronDown className='w-4 h-4' />,
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className='bg-white dark:bg-black divide-y divide-gray-200 dark:divide-gray-700'>
                {table.getRowModel().rows.map(row => (
                  <tr
                    key={row.id}
                    className='hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
                  >
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className='px-2 py-4 whitespace-nowrap'>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className='flex items-center justify-between space-x-2 py-4'>
            <div className='flex-1 text-sm text-gray-700 dark:text-gray-300'>
              Showing{' '}
              {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length,
              )}{' '}
              of {table.getFilteredRowModel().rows.length} results
            </div>
            <div className='flex items-center space-x-4'>
              {/* <div className='flex items-center space-x-2'>
                <span className='text-sm text-gray-700 dark:text-gray-300'>Rows per page:</span>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={e => {
                    table.setPageSize(Number(e.target.value));
                  }}
                  className='border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                >
                  {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
              </div> */}
              <div className='flex items-center space-x-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <div className='flex items-center space-x-1'>
                  {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
                    const pageIndex = table.getState().pagination.pageIndex;
                    const pageCount = table.getPageCount();
                    let startPage = Math.max(0, pageIndex - 2);
                    const endPage = Math.min(pageCount, startPage + 5);
                    if (endPage - startPage < 5) {
                      startPage = Math.max(0, endPage - 5);
                    }
                    return startPage + i;
                  }).map(pageIndex => (
                    <Button
                      key={pageIndex}
                      variant={
                        table.getState().pagination.pageIndex === pageIndex ? 'default' : 'outline'
                      }
                      size='sm'
                      onClick={() => table.setPageIndex(pageIndex)}
                      className='w-8 h-8 p-0'
                    >
                      {pageIndex + 1}
                    </Button>
                  ))}
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brand Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Brand Details</DialogTitle>
            <DialogDescription>Detailed information about the selected brand</DialogDescription>
          </DialogHeader>
          {selectedBrand && (
            <div className='space-y-6'>
              <div className='flex items-center space-x-4'>
                <div className='w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden'>
                  {selectedBrand.imageUrl ? (
                    <Image
                      src={getImageUrl(selectedBrand.imageUrl) || ''}
                      alt={selectedBrand.name}
                      width={96}
                      height={96}
                      className='object-cover w-full h-full'
                    />
                  ) : (
                    <ImageIcon className='w-12 h-12 text-gray-400' />
                  )}
                </div>
                <div>
                  <h3 className='text-xl font-semibold'>{selectedBrand.name}</h3>
                  <p className='text-xs text-gray-400'>ID: {selectedBrand.id}</p>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-500'>Image URL</label>
                  <p className='text-lg text-blue-600 hover:underline'>
                    {selectedBrand.imageUrl || 'No image'}
                  </p>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-500'>Visibility Order</label>
                  <p className='text-lg font-semibold'>{selectedBrand.visibilityOrder}</p>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-500'>Created At</label>
                </div>
              </div>

              <div className='flex space-x-2 pt-4'>
                <Button
                  className='flex-1'
                  onClick={() => {
                    setIsModalOpen(false);
                    router.push(`/brands/edit/${selectedBrand.id}`);
                  }}
                >
                  <Edit className='w-4 h-4 mr-2' />
                  Edit Brand
                </Button>
                <Button variant='outline' className='flex-1'>
                  <Globe className='w-4 h-4 mr-2' />
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
              Are you sure you want to delete brand <strong>{brandToDelete?.name}</strong>? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant='destructive'
              onClick={confirmDelete}
              disabled={deleteBrandMutation.isPending}
            >
              {deleteBrandMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
