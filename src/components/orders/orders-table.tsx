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
import { Order } from '@/types/order';
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
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  CreditCard,
  DollarSign,
  Edit,
  Eye,
  MoreHorizontal,
  Package,
  Phone,
  Search,
  Truck,
  Truck as TruckIcon,
  User,
  Wifi,
} from 'lucide-react';
import { useMemo, useState } from 'react';

interface OrdersTableProps {
  orders: Order[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

  const handleDeleteOrder = (order: Order) => {
    setOrderToDelete(order);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // Here you would typically make an API call to delete the order
    console.log('Deleting order:', orderToDelete);
    // For now, we'll just close the modal
    setIsDeleteModalOpen(false);
    setOrderToDelete(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Processing':
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'Cash':
        return <DollarSign className='w-4 h-4' />;
      case 'Card':
        return <CreditCard className='w-4 h-4' />;
      case 'Online':
        return <Wifi className='w-4 h-4' />;
      case 'COD':
        return <TruckIcon className='w-4 h-4' />;
      default:
        return <DollarSign className='w-4 h-4' />;
    }
  };

  const columns: ColumnDef<Order>[] = useMemo(
    () => [
      {
        accessorKey: 'orderNo',
        header: 'Order No',
        size: 120,
        cell: ({ row }) => (
          <div className='flex items-center space-x-2'>
            <Package className='w-4 h-4 text-gray-500' />
            <span className='font-medium font-mono'>{row.getValue('orderNo')}</span>
          </div>
        ),
      },
      {
        accessorKey: 'clientName',
        header: 'Client Name',
        size: 150,
        cell: ({ row }) => (
          <div className='flex items-center space-x-2'>
            <User className='w-4 h-4 text-gray-500' />
            <span className='font-medium'>{row.getValue('clientName')}</span>
          </div>
        ),
      },
      {
        accessorKey: 'clientMobile',
        header: 'Client Mobile',
        size: 130,
        cell: ({ row }) => (
          <div className='flex items-center space-x-2'>
            <Phone className='w-4 h-4 text-gray-500' />
            <span className='text-sm'>{row.getValue('clientMobile')}</span>
          </div>
        ),
      },
      {
        accessorKey: 'orderDate',
        header: 'Order Date',
        size: 120,
        cell: ({ row }) => {
          const date = new Date(row.getValue('orderDate') as string);
          return (
            <div className='flex items-center space-x-2'>
              <Calendar className='w-4 h-4 text-gray-500' />
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                {format(date, 'MMM dd, yyyy')}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'subTotal',
        header: 'Sub Total',
        size: 100,
        cell: ({ row }) => (
          <div className='flex items-center space-x-2'>
            <DollarSign className='w-4 h-4 text-gray-500' />
            <span className='font-medium'>${(row.getValue('subTotal') as number).toFixed(2)}</span>
          </div>
        ),
      },
      {
        accessorKey: 'deliveryTotal',
        header: 'Delivery Total',
        size: 120,
        cell: ({ row }) => (
          <div className='flex items-center space-x-2'>
            <Truck className='w-4 h-4 text-gray-500' />
            <span className='font-medium'>
              ${(row.getValue('deliveryTotal') as number).toFixed(2)}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'discountTotal',
        header: 'Discount Total',
        size: 120,
        cell: ({ row }) => {
          const discount = row.getValue('discountTotal') as number;
          return (
            <div className='flex items-center space-x-2'>
              <DollarSign className='w-4 h-4 text-gray-500' />
              <span className='font-medium text-green-600'>-${discount.toFixed(2)}</span>
            </div>
          );
        },
      },
      {
        accessorKey: 'finalTotal',
        header: 'Final Total',
        size: 120,
        cell: ({ row }) => (
          <div className='flex items-center space-x-2'>
            <DollarSign className='w-4 h-4 text-gray-500' />
            <span className='font-bold text-lg'>
              ${(row.getValue('finalTotal') as number).toFixed(2)}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'paymentMethod',
        header: 'Payment Method',
        size: 120,
        cell: ({ row }) => {
          const method = row.getValue('paymentMethod') as string;
          return (
            <div className='flex items-center space-x-2'>
              {getPaymentIcon(method)}
              <span className='text-sm font-medium'>{method}</span>
            </div>
          );
        },
      },
      {
        accessorKey: 'orderStatus',
        header: 'Order Status',
        size: 120,
        cell: ({ row }) => {
          const status = row.getValue('orderStatus') as string;
          return <Badge className={`capitalize ${getStatusColor(status)}`}>{status}</Badge>;
        },
      },
      {
        accessorKey: 'driverName',
        header: 'Driver Name',
        size: 120,
        cell: ({ row }) => (
          <div className='flex items-center space-x-2'>
            <User className='w-4 h-4 text-gray-500' />
            <span className='text-sm'>{row.getValue('driverName')}</span>
          </div>
        ),
      },
      {
        accessorKey: 'driverMobile',
        header: 'Driver Mobile',
        size: 120,
        cell: ({ row }) => (
          <div className='flex items-center space-x-2'>
            <Phone className='w-4 h-4 text-gray-500' />
            <span className='text-sm'>{row.getValue('driverMobile')}</span>
          </div>
        ),
      },
      {
        accessorKey: 'codCollected',
        header: 'COD Collected',
        size: 120,
        cell: ({ row }) => {
          const codCollected = row.getValue('codCollected') as number;
          return (
            <div className='flex items-center space-x-2'>
              <DollarSign className='w-4 h-4 text-gray-500' />
              <span className='font-medium'>${codCollected.toFixed(2)}</span>
            </div>
          );
        },
      },
      {
        accessorKey: 'deliveryDateTime',
        header: 'Delivery Date-time',
        size: 150,
        cell: ({ row }) => {
          const date = new Date(row.getValue('deliveryDateTime') as string);
          return (
            <div className='flex items-center space-x-2'>
              <Clock className='w-4 h-4 text-gray-500' />
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                {format(date, 'MMM dd, yyyy HH:mm')}
              </span>
            </div>
          );
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        size: 100,
        cell: ({ row }) => {
          const order = row.original;
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
                    setSelectedOrder(order);
                    setIsModalOpen(true);
                  }}
                >
                  <Eye className='mr-2 h-4 w-4' />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className='mr-2 h-4 w-4' />
                  Edit Order
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Phone className='mr-2 h-4 w-4' />
                  Call Client
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Truck className='mr-2 h-4 w-4' />
                  Call Driver
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDeleteOrder(order)} className='text-red-600'>
                  <Ban className='mr-2 h-4 w-4' />
                  Cancel Order
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
    data: orders,
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
            <span>Orders Management</span>
            <div className='flex items-center space-x-2'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                <Input
                  placeholder='Search orders...'
                  value={(table.getColumn('orderNo')?.getFilterValue() as string) ?? ''}
                  onChange={event => table.getColumn('orderNo')?.setFilterValue(event.target.value)}
                  className='pl-10 w-64'
                />
              </div>
              {/* <Button>Add Order</Button> */}
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

      {/* Order Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className='max-w-4xl'>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>Detailed information about the selected order</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className='space-y-6'>
              <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-500'>Order Information</label>
                    <div className='space-y-2'>
                      <div className='flex justify-between'>
                        <span className='text-sm text-gray-500'>Order No:</span>
                        <span className='font-mono font-semibold'>{selectedOrder.orderNo}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-sm text-gray-500'>Order Date:</span>
                        <span className='font-semibold'>
                          {format(new Date(selectedOrder.orderDate), 'MMM dd, yyyy HH:mm')}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-sm text-gray-500'>Status:</span>
                        <Badge
                          className={`capitalize ${getStatusColor(selectedOrder.orderStatus)}`}
                        >
                          {selectedOrder.orderStatus}
                        </Badge>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-sm text-gray-500'>Payment Method:</span>
                        <div className='flex items-center space-x-2'>
                          {getPaymentIcon(selectedOrder.paymentMethod)}
                          <span className='font-semibold'>{selectedOrder.paymentMethod}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-500'>Client Information</label>
                    <div className='space-y-2'>
                      <div className='flex justify-between'>
                        <span className='text-sm text-gray-500'>Name:</span>
                        <span className='font-semibold'>{selectedOrder.clientName}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-sm text-gray-500'>Mobile:</span>
                        <span className='font-semibold'>{selectedOrder.clientMobile}</span>
                      </div>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-500'>Driver Information</label>
                    <div className='space-y-2'>
                      <div className='flex justify-between'>
                        <span className='text-sm text-gray-500'>Name:</span>
                        <span className='font-semibold'>{selectedOrder.driverName}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-sm text-gray-500'>Mobile:</span>
                        <span className='font-semibold'>{selectedOrder.driverMobile}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-500'>Financial Details</label>
                    <div className='space-y-2'>
                      <div className='flex justify-between'>
                        <span className='text-sm text-gray-500'>Sub Total:</span>
                        <span className='font-semibold'>${selectedOrder.subTotal.toFixed(2)}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-sm text-gray-500'>Delivery Total:</span>
                        <span className='font-semibold'>
                          ${selectedOrder.deliveryTotal.toFixed(2)}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-sm text-gray-500'>Discount Total:</span>
                        <span className='font-semibold text-green-600'>
                          -${selectedOrder.discountTotal.toFixed(2)}
                        </span>
                      </div>
                      <div className='flex justify-between border-t pt-2'>
                        <span className='text-lg font-bold text-gray-500'>Final Total:</span>
                        <span className='text-lg font-bold text-green-600'>
                          ${selectedOrder.finalTotal.toFixed(2)}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-sm text-gray-500'>COD Collected:</span>
                        <span className='font-semibold'>
                          ${selectedOrder.codCollected.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-500'>
                      Delivery Information
                    </label>
                    <div className='space-y-2'>
                      <div className='flex justify-between'>
                        <span className='text-sm text-gray-500'>Delivery Date-time:</span>
                        <span className='font-semibold'>
                          {format(new Date(selectedOrder.deliveryDateTime), 'MMM dd, yyyy HH:mm')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex space-x-2 pt-4'>
                <Button className='flex-1'>
                  <Edit className='w-4 h-4 mr-2' />
                  Edit Order
                </Button>
                <Button variant='outline' className='flex-1'>
                  <Phone className='w-4 h-4 mr-2' />
                  Call Client
                </Button>
                <Button variant='outline' className='flex-1'>
                  <Truck className='w-4 h-4 mr-2' />
                  Call Driver
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
            <DialogTitle>Confirm Cancellation</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel order <strong>{orderToDelete?.orderNo}</strong>? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={confirmDelete}>
              Cancel Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
