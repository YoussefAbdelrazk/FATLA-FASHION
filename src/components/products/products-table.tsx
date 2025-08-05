'use client';

import { Badge } from '@/components/ui/badge';
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
import { Product } from '@/types/product';
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
import { format } from 'date-fns';
import {
  Ban,
  Barcode,
  ChevronDown,
  ChevronUp,
  Clock,
  DollarSign,
  Edit,
  Eye,
  Image as ImageIcon,
  MoreHorizontal,
  Package,
  Percent,
  Search,
  ShoppingCart,
  Trash2,
  TrendingUp,
  User,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

interface ProductsTableProps {
  products: Product[];
}

export default function ProductsTable({ products }: ProductsTableProps) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // Here you would typically make an API call to delete the product
    console.log('Deleting product:', productToDelete);
    // For now, we'll just close the modal
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleDeactivateProduct = (product: Product) => {
    // Here you would typically make an API call to deactivate the product
    console.log('Deactivating product:', product);
    // You could update the product status to inactive
  };

  const columns: ColumnDef<Product>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Product',
        cell: ({ row }) => {
          const product = row.original;
          return (
            <div className='flex items-center space-x-3'>
              <div className='w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden'>
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={48}
                    height={48}
                    className='object-cover w-full h-full'
                  />
                ) : (
                  <ImageIcon className='w-6 h-6 text-gray-400' />
                )}
              </div>
              <div>
                <div className='font-medium text-gray-900 dark:text-white'>{product.name}</div>
                <div className='text-sm text-gray-500 dark:text-gray-400'>ID: {product.id}</div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'availableQty',
        header: 'Available Qty',
        cell: ({ row }) => (
          <div className='flex items-center space-x-2'>
            <Package className='w-4 h-4 text-gray-500' />
            <span className='font-medium'>{row.getValue('availableQty')}</span>
          </div>
        ),
      },
      {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => (
          <div className='flex items-center space-x-2'>
            <DollarSign className='w-4 h-4 text-gray-500' />
            <span className='font-medium'>${(row.getValue('price') as number).toFixed(2)}</span>
          </div>
        ),
      },
      {
        accessorKey: 'discount',
        header: 'Discount',
        cell: ({ row }) => {
          const discount = row.getValue('discount') as number;
          return (
            <div className='flex items-center space-x-2'>
              <Percent className='w-4 h-4 text-gray-500' />
              <span className='font-medium'>{discount}%</span>
            </div>
          );
        },
      },
      {
        accessorKey: 'barcode',
        header: 'Barcode',
        cell: ({ row }) => (
          <div className='flex items-center space-x-2'>
            <Barcode className='w-4 h-4 text-gray-500' />
            <span className='text-sm font-mono'>{row.getValue('barcode')}</span>
          </div>
        ),
      },
      {
        accessorKey: 'soldCount',
        header: 'Sold Count',
        cell: ({ row }) => (
          <div className='flex items-center space-x-2'>
            <TrendingUp className='w-4 h-4 text-gray-500' />
            <span className='font-medium'>{row.getValue('soldCount')}</span>
          </div>
        ),
      },
      {
        accessorKey: 'isActive',
        header: 'Status',
        cell: ({ row }) => {
          const isActive = row.getValue('isActive') as boolean;
          return (
            <Badge variant={isActive ? 'default' : 'destructive'} className='capitalize'>
              {isActive ? 'Active' : 'Inactive'}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => {
          const date = new Date(row.getValue('createdAt') as string);
          return (
            <div className='flex items-center space-x-2'>
              <Clock className='w-4 h-4 text-gray-500' />
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                {format(date, 'MMM dd, yyyy')}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'createdBy',
        header: 'Created By',
        cell: ({ row }) => (
          <div className='flex items-center space-x-2'>
            <User className='w-4 h-4 text-gray-500' />
            <span className='text-sm'>{row.getValue('createdBy')}</span>
          </div>
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const product = row.original;
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
                    setSelectedProduct(product);
                    setIsModalOpen(true);
                  }}
                >
                  <Eye className='mr-2 h-4 w-4' />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className='mr-2 h-4 w-4' />
                  Edit Product
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDeactivateProduct(product)}>
                  <Ban className='mr-2 h-4 w-4' />
                  {product.isActive ? 'Deactivate' : 'Activate'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleDeleteProduct(product)}
                  className='text-red-600'
                >
                  <Trash2 className='mr-2 h-4 w-4' />
                  Delete Product
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data: products,
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

  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <span>Products Management</span>
            <div className='flex items-center space-x-2'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                <Input
                  placeholder='Search products...'
                  value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                  onChange={event => table.getColumn('name')?.setFilterValue(event.target.value)}
                  className='pl-10 w-64'
                />
              </div>
              <Button onClick={() => router.push('/products/add')}>Add Product</Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border'>
            <div className='max-h-[600px] overflow-auto'>
              <table className='w-full'>
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

      {/* Product Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>Detailed information about the selected product</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className='space-y-6'>
              <div className='flex items-center space-x-4'>
                <div className='w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden'>
                  {selectedProduct.image ? (
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      width={96}
                      height={96}
                      className='object-cover w-full h-full'
                    />
                  ) : (
                    <ImageIcon className='w-12 h-12 text-gray-400' />
                  )}
                </div>
                <div>
                  <h3 className='text-xl font-semibold'>{selectedProduct.name}</h3>
                  <p className='text-sm text-gray-500'>ID: {selectedProduct.id}</p>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-500'>Available Quantity</label>
                  <p className='text-lg font-semibold'>{selectedProduct.availableQty}</p>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-500'>Price</label>
                  <p className='text-lg font-semibold text-green-600'>
                    ${selectedProduct.price.toFixed(2)}
                  </p>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-500'>Discount</label>
                  <p className='text-lg font-semibold'>{selectedProduct.discount}%</p>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-500'>Sold Count</label>
                  <p className='text-lg font-semibold'>{selectedProduct.soldCount}</p>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-500'>Status</label>
                  <Badge
                    variant={selectedProduct.isActive ? 'default' : 'destructive'}
                    className='capitalize'
                  >
                    {selectedProduct.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-500'>Barcode</label>
                  <p className='text-sm font-mono'>{selectedProduct.barcode}</p>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-500'>Created At</label>
                  <p className='text-lg'>
                    {format(new Date(selectedProduct.createdAt), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-500'>Created By</label>
                  <p className='text-lg'>{selectedProduct.createdBy}</p>
                </div>
              </div>

              <div className='flex space-x-2 pt-4'>
                <Button className='flex-1'>
                  <Edit className='w-4 h-4 mr-2' />
                  Edit Product
                </Button>
                <Button variant='outline' className='flex-1'>
                  <ShoppingCart className='w-4 h-4 mr-2' />
                  View Orders
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
              Are you sure you want to delete product <strong>{productToDelete?.name}</strong>? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
