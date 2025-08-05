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
import { Client } from '@/types/client';
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
  DollarSign,
  Edit,
  Eye,
  MoreHorizontal,
  Phone,
  Search,
  ShoppingBag,
  Trash2,
  User,
} from 'lucide-react';
import { useMemo, useState } from 'react';

interface ClientsTableProps {
  clients: Client[];
}

export default function ClientsTable({ clients }: ClientsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  const handleDeleteClient = (client: Client) => {
    setClientToDelete(client);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // Here you would typically make an API call to delete the client
    console.log('Deleting client:', clientToDelete);
    // For now, we'll just close the modal
    setIsDeleteModalOpen(false);
    setClientToDelete(null);
  };

  const handleBlockClient = (client: Client) => {
    // Here you would typically make an API call to block the client
    console.log('Blocking client:', client);
    // You could update the client status to 'Blocked' or similar
  };

  const columns: ColumnDef<Client>[] = useMemo(
    () => [
      {
        accessorKey: 'firstName',
        header: 'Name',
        cell: ({ row }) => {
          const client = row.original;
          return (
            <div className='flex items-center space-x-3'>
              <div className='w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center'>
                <User className='w-4 h-4 text-gray-600 dark:text-gray-400' />
              </div>
              <div>
                <div className='font-medium text-gray-900 dark:text-white'>
                  {client.firstName} {client.lastName}
                </div>
                <div className='text-sm text-gray-500 dark:text-gray-400'>ID: {client.id}</div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'mobile',
        header: 'Mobile',
        cell: ({ row }) => (
          <div className='flex items-center space-x-2'>
            <Phone className='w-4 h-4 text-gray-500' />
            <span className='text-sm'>{row.getValue('mobile')}</span>
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as string;
          return (
            <Badge variant={status === 'Active' ? 'default' : 'destructive'} className='capitalize'>
              {status}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'ordersCount',
        header: 'Orders',
        cell: ({ row }) => (
          <div className='flex items-center space-x-2'>
            <ShoppingBag className='w-4 h-4 text-gray-500' />
            <span className='font-medium'>{row.getValue('ordersCount')}</span>
          </div>
        ),
      },
      {
        accessorKey: 'ordersTotal',
        header: 'Total Spent',
        cell: ({ row }) => (
          <div className='flex items-center space-x-2'>
            <DollarSign className='w-4 h-4 text-gray-500' />
            <span className='font-medium'>
              ${(row.getValue('ordersTotal') as number).toLocaleString()}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'lastActivity',
        header: 'Last Activity',
        cell: ({ row }) => {
          const date = new Date(row.getValue('lastActivity') as string);
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
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const client = row.original;
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
                    setSelectedClient(client);
                    setIsModalOpen(true);
                  }}
                >
                  <Eye className='mr-2 h-4 w-4' />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className='mr-2 h-4 w-4' />
                  Edit Client
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Phone className='mr-2 h-4 w-4' />
                  Call Client
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleBlockClient(client)}>
                  <Ban className='mr-2 h-4 w-4' />
                  Block Client
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleDeleteClient(client)}
                  className='text-red-600'
                >
                  <Trash2 className='mr-2 h-4 w-4' />
                  Delete Client
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
    data: clients,
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
            <span>Clients Management</span>
            <div className='flex items-center space-x-2'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                <Input
                  placeholder='Search clients...'
                  value={(table.getColumn('firstName')?.getFilterValue() as string) ?? ''}
                  onChange={event =>
                    table.getColumn('firstName')?.setFilterValue(event.target.value)
                  }
                  className='pl-10 w-64'
                />
              </div>
              <Button>Add Client</Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border'>
            <div className='max-h-[800px] overflow-auto'>
              <table className='w-full'>
                <thead className='bg-gray-50 dark:bg-gray-800 sticky top-0 z-10'>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th
                          key={header.id}
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800'
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
                        <td key={cell.id} className='px-6 py-4 whitespace-nowrap'>
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
                  {[5, 10, 20, 30, 40, 50].map(pageSize => (
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

      {/* Client Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Client Details</DialogTitle>
            <DialogDescription>Detailed information about the selected client</DialogDescription>
          </DialogHeader>
          {selectedClient && (
            <div className='space-y-6'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-500'>Full Name</label>
                  <p className='text-lg font-semibold'>
                    {selectedClient.firstName} {selectedClient.lastName}
                  </p>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-500'>Mobile</label>
                  <p className='text-lg'>{selectedClient.mobile}</p>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-500'>Status</label>
                  <Badge
                    variant={selectedClient.status === 'Active' ? 'default' : 'destructive'}
                    className='capitalize'
                  >
                    {selectedClient.status}
                  </Badge>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-500'>Orders Count</label>
                  <p className='text-lg font-semibold'>{selectedClient.ordersCount}</p>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-500'>Total Spent</label>
                  <p className='text-lg font-semibold text-green-600'>
                    ${selectedClient.ordersTotal.toLocaleString()}
                  </p>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-500'>Member Since</label>
                  <p className='text-lg'>
                    {format(new Date(selectedClient.createdAt), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-500'>Last Activity</label>
                <p className='text-lg'>
                  {format(new Date(selectedClient.lastActivity), 'MMM dd, yyyy HH:mm')}
                </p>
              </div>

              <div className='flex space-x-2 pt-4'>
                <Button className='flex-1'>
                  <Edit className='w-4 h-4 mr-2' />
                  Edit Client
                </Button>
                <Button variant='outline' className='flex-1'>
                  <Phone className='w-4 h-4 mr-2' />
                  Call Client
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
              Are you sure you want to delete client{' '}
              <strong>
                {clientToDelete?.firstName} {clientToDelete?.lastName}
              </strong>
              ? This action cannot be undone.
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
