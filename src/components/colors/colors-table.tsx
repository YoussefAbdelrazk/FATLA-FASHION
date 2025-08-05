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
import { Color } from '@/types/color';
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
  ChevronDown,
  ChevronUp,
  Clock,
  Edit,
  Eye,
  MoreHorizontal,
  Package,
  Search,
  Trash2,
  User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

interface ColorsTableProps {
  colors: Color[];
}

export default function ColorsTable({ colors }: ColorsTableProps) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [colorToDelete, setColorToDelete] = useState<Color | null>(null);

  const handleDeleteColor = (color: Color) => {
    setColorToDelete(color);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // Here you would typically make an API call to delete the color
    console.log('Deleting color:', colorToDelete);
    // For now, we'll just close the modal
    setIsDeleteModalOpen(false);
    setColorToDelete(null);
  };

  const handleDeactivateColor = (color: Color) => {
    // Here you would typically make an API call to deactivate the color
    console.log('Deactivating color:', color);
    // You could update the color status to inactive
  };

  const columns: ColumnDef<Color>[] = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => (
          <div className='font-mono text-sm text-gray-600 dark:text-gray-400'>
            {row.getValue('id')}
          </div>
        ),
      },
      {
        accessorKey: 'arName',
        header: 'Arabic Name',
        cell: ({ row }) => (
          <div className='max-w-[150px] truncate' title={row.getValue('arName')}>
            <div className='font-medium text-gray-900 dark:text-white'>
              {row.getValue('arName')}
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'enName',
        header: 'English Name',
        cell: ({ row }) => (
          <div className='max-w-[150px] truncate' title={row.getValue('enName')}>
            <div className='font-medium text-gray-900 dark:text-white'>
              {row.getValue('enName')}
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'color',
        header: 'Color',
        cell: ({ row }) => {
          const color = row.getValue('color') as string;
          return (
            <div className='flex items-center space-x-3'>
              <div
                className='w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-700'
                style={{ backgroundColor: color }}
              />
              <span className='font-mono text-sm text-gray-600 dark:text-gray-400'>{color}</span>
            </div>
          );
        },
      },
      {
        accessorKey: 'productsCount',
        header: 'Products Count',
        cell: ({ row }) => {
          const count = row.getValue('productsCount') as number;
          return (
            <div className='flex items-center space-x-2'>
              <Package className='w-4 h-4 text-gray-500' />
              <span className='font-medium text-gray-900 dark:text-white'>{count}</span>
            </div>
          );
        },
      },
      {
        accessorKey: 'isActive',
        header: 'Status',
        cell: ({ row }) => {
          const isActive = row.getValue('isActive') as boolean;
          return (
            <Badge variant={isActive ? 'default' : 'secondary'}>
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
            <span className='text-sm text-gray-600 dark:text-gray-400'>
              {row.getValue('createdBy')}
            </span>
          </div>
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const color = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                  <span className='sr-only'>Open menu</span>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => setSelectedColor(color)}>
                  <Eye className='mr-2 h-4 w-4' />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className='mr-2 h-4 w-4' />
                  Edit Color
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleDeactivateColor(color)}
                  className='text-red-600'
                >
                  <Ban className='mr-2 h-4 w-4' />
                  {color.isActive ? 'Deactivate' : 'Activate'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDeleteColor(color)} className='text-red-600'>
                  <Trash2 className='mr-2 h-4 w-4' />
                  Delete Color
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
    data: colors,
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
            <span>Colors Management</span>
            <div className='flex items-center space-x-2'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                <Input
                  placeholder='Search colors...'
                  value={(table.getColumn('enName')?.getFilterValue() as string) ?? ''}
                  onChange={event => table.getColumn('enName')?.setFilterValue(event.target.value)}
                  className='pl-10 w-64'
                />
              </div>
              <Button onClick={() => router.push('/colors/add')}>Add Color</Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border'>
            <div className='max-h-[600px] overflow-x-auto'>
              <table className='w-full min-w-full'>
                <thead className='bg-gray-50 dark:bg-gray-800 sticky top-0 z-10'>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th
                          key={header.id}
                          className='px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800'
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
                        <td key={cell.id} className='px-3 py-4 whitespace-nowrap'>
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

      {/* Color Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Color Details</DialogTitle>
            <DialogDescription>
              View detailed information about the selected color.
            </DialogDescription>
          </DialogHeader>
          {selectedColor && (
            <div className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='text-sm font-medium'>Arabic Name</label>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>{selectedColor.arName}</p>
                </div>
                <div>
                  <label className='text-sm font-medium'>English Name</label>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>{selectedColor.enName}</p>
                </div>
              </div>
              <div>
                <label className='text-sm font-medium'>Color</label>
                <div className='flex items-center space-x-3 mt-2'>
                  <div
                    className='w-16 h-16 rounded-lg border-2 border-gray-200 dark:border-gray-700'
                    style={{ backgroundColor: selectedColor.color }}
                  />
                  <span className='font-mono text-sm text-gray-600 dark:text-gray-400'>
                    {selectedColor.color}
                  </span>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='text-sm font-medium'>Products Count</label>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    {selectedColor.productsCount}
                  </p>
                </div>
                <div>
                  <label className='text-sm font-medium'>Status</label>
                  <Badge variant={selectedColor.isActive ? 'default' : 'secondary'}>
                    {selectedColor.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='text-sm font-medium'>Created At</label>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    {format(new Date(selectedColor.createdAt), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
                <div>
                  <label className='text-sm font-medium'>Created By</label>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    {selectedColor.createdBy}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>Edit Color</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Color</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this color? This action cannot be undone.
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
