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
import { Order } from '@/types/order';
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
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Mock data - replace with actual API call
const mockOrders: Order[] = [
  {
    id: '1',
    orderNo: 'ORD-2024-001',
    clientName: 'Ahmed Hassan',
    clientMobile: '+20 123 456 7890',
    orderDate: '2024-01-15T10:30:00Z',
    subTotal: 299.99,
    deliveryTotal: 25.0,
    discountTotal: 30.0,
    finalTotal: 294.99,
    paymentMethod: 'COD',
    orderStatus: 'Delivered',
    driverName: 'Mohammed Ali',
    driverMobile: '+20 987 654 3210',
    codCollected: 294.99,
    deliveryDateTime: '2024-01-16T14:30:00Z',
  },
  {
    id: '2',
    orderNo: 'ORD-2024-002',
    clientName: 'Fatima Ahmed',
    clientMobile: '+20 111 222 3333',
    orderDate: '2024-01-16T11:45:00Z',
    subTotal: 159.99,
    deliveryTotal: 20.0,
    discountTotal: 0.0,
    finalTotal: 179.99,
    paymentMethod: 'Card',
    orderStatus: 'Processing',
    driverName: 'Omar Khalil',
    driverMobile: '+20 555 666 7777',
    codCollected: 0.0,
    deliveryDateTime: '2024-01-17T16:00:00Z',
  },
  {
    id: '3',
    orderNo: 'ORD-2024-003',
    clientName: 'Youssef Mahmoud',
    clientMobile: '+20 444 555 6666',
    orderDate: '2024-01-17T09:15:00Z',
    subTotal: 449.99,
    deliveryTotal: 30.0,
    discountTotal: 50.0,
    finalTotal: 429.99,
    paymentMethod: 'Online',
    orderStatus: 'Shipped',
    driverName: 'Ahmed Samir',
    driverMobile: '+20 777 888 9999',
    codCollected: 0.0,
    deliveryDateTime: '2024-01-18T12:30:00Z',
  },
  {
    id: '4',
    orderNo: 'ORD-2024-004',
    clientName: 'Nour El-Din',
    clientMobile: '+20 888 999 0000',
    orderDate: '2024-01-18T14:20:00Z',
    subTotal: 89.99,
    deliveryTotal: 15.0,
    discountTotal: 10.0,
    finalTotal: 94.99,
    paymentMethod: 'Cash',
    orderStatus: 'Pending',
    driverName: 'Hassan Ibrahim',
    driverMobile: '+20 123 456 7890',
    codCollected: 0.0,
    deliveryDateTime: '2024-01-19T10:00:00Z',
  },
  {
    id: '5',
    orderNo: 'ORD-2024-005',
    clientName: 'Layla Mohamed',
    clientMobile: '+20 999 000 1111',
    orderDate: '2024-01-19T16:45:00Z',
    subTotal: 199.99,
    deliveryTotal: 25.0,
    discountTotal: 25.0,
    finalTotal: 199.99,
    paymentMethod: 'COD',
    orderStatus: 'Confirmed',
    driverName: 'Karim Ahmed',
    driverMobile: '+20 222 333 4444',
    codCollected: 0.0,
    deliveryDateTime: '2024-01-20T15:30:00Z',
  },
];

const getStatusBadgeVariant = (status: Order['orderStatus']) => {
  switch (status) {
    case 'Pending':
      return 'secondary';
    case 'Confirmed':
      return 'default';
    case 'Processing':
      return 'default';
    case 'Shipped':
      return 'default';
    case 'Delivered':
      return 'default';
    case 'Cancelled':
      return 'destructive';
    default:
      return 'secondary';
  }
};

const getPaymentMethodBadgeVariant = (method: Order['paymentMethod']) => {
  switch (method) {
    case 'Cash':
      return 'secondary';
    case 'Card':
      return 'default';
    case 'Online':
      return 'default';
    case 'COD':
      return 'outline';
    default:
      return 'secondary';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays === 0) {
    return 'Today';
  } else if (diffDays <= 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
};

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export default function OrdersTable() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Order>('orderDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

  // Filter orders (client-side filtering for current page)
  const filteredOrders = mockOrders.filter(
    order =>
      order.orderNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.clientMobile?.includes(searchTerm) ||
      order.driverName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Sort orders (client-side sorting for current page)
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field: keyof Order) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailsDialog(true);
  };

  const handleEdit = (order: Order) => {
    router.push(`/orders/edit/${order.id}`);
  };

  const handleDelete = (order: Order) => {
    setOrderToDelete(order);
  };

  const confirmDelete = () => {
    if (orderToDelete) {
      // TODO: Implement delete API call
      console.log('Deleting order:', orderToDelete.id);
      setOrderToDelete(null);
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

  const totalPages = Math.ceil(sortedOrders.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedOrders = sortedOrders.slice(startIndex, endIndex);

  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <span>Orders Management</span>
            <Button onClick={() => router.push('/orders/add')} className='flex items-center gap-2'>
              <Plus className='w-4 h-4' />
              Add New Order
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Page Size Controls */}
          <div className='mb-4 flex flex-col sm:flex-row gap-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <Input
                placeholder='Search orders by order number, client name, mobile, or driver...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='pl-10'
              />
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-sm text-muted-foreground'>Show:</span>
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
                    onClick={() => handleSort('orderNo')}
                  >
                    Order No {sortField === 'orderNo' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => handleSort('clientName')}
                  >
                    Client Name{' '}
                    {sortField === 'clientName' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead>Client Mobile</TableHead>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => handleSort('orderDate')}
                  >
                    Order Date {sortField === 'orderDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead>Sub Total</TableHead>
                  <TableHead>Delivery Total</TableHead>
                  <TableHead>Discount Total</TableHead>
                  <TableHead>Final Total</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Order Status</TableHead>
                  <TableHead>Driver Name</TableHead>
                  <TableHead>Driver Mobile</TableHead>
                  <TableHead>COD Collected</TableHead>
                  <TableHead>Delivery Date-time</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={14} className='text-center py-8'>
                      <p className='text-muted-foreground'>No orders found</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedOrders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell className='font-medium'>{order.orderNo}</TableCell>
                      <TableCell>{order.clientName}</TableCell>
                      <TableCell>
                        <a
                          href={`tel:${order.clientMobile}`}
                          className='font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer'
                          title={`Call ${order.clientMobile}`}
                        >
                          {order.clientMobile}
                        </a>
                      </TableCell>
                      <TableCell
                        className='font-medium cursor-help'
                        title={formatDateTime(order.orderDate)}
                      >
                        {formatDate(order.orderDate)}
                      </TableCell>
                      <TableCell>{formatCurrency(order.subTotal)}</TableCell>
                      <TableCell>{formatCurrency(order.deliveryTotal)}</TableCell>
                      <TableCell>{formatCurrency(order.discountTotal)}</TableCell>
                      <TableCell className='font-semibold'>
                        {formatCurrency(order.finalTotal)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPaymentMethodBadgeVariant(order.paymentMethod)}>
                          {order.paymentMethod}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(order.orderStatus)}>
                          {order.orderStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.driverName}</TableCell>
                      <TableCell>
                        <a
                          href={`tel:${order.driverMobile}`}
                          className='font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer'
                          title={`Call ${order.driverMobile}`}
                        >
                          {order.driverMobile}
                        </a>
                      </TableCell>
                      <TableCell>{formatCurrency(order.codCollected)}</TableCell>
                      <TableCell>{formatDateTime(order.deliveryDateTime)}</TableCell>
                      <TableCell className='text-right'>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' className='h-8 w-8 p-0'>
                              <span className='sr-only'>Open menu</span>
                              <MoreHorizontal className='h-4 w-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem onClick={() => handleViewDetails(order)}>
                              <Eye className='mr-2 h-4 w-4' />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(order)}>
                              <Pencil className='mr-2 h-4 w-4' />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(order)}
                              className='text-destructive'
                            >
                              <Trash2 className='mr-2 h-4 w-4' />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className='flex items-center justify-between mt-4'>
              <div className='text-sm text-muted-foreground'>
                Showing {startIndex + 1} to {Math.min(endIndex, sortedOrders.length)} of{' '}
                {sortedOrders.length} results
              </div>
              <div className='flex items-center space-x-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  <ChevronLeft className='h-4 w-4' />
                  Previous
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
                  Next
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>View detailed information about this order</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h3 className='font-semibold text-lg mb-2'>Order Information</h3>
                  <div className='space-y-2 text-sm'>
                    <div className='flex justify-between'>
                      <span className='font-medium'>Order No:</span>
                      <span>{selectedOrder.orderNo}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-medium'>Order Date:</span>
                      <span>{formatDate(selectedOrder.orderDate)}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-medium'>Status:</span>
                      <Badge variant={getStatusBadgeVariant(selectedOrder.orderStatus)}>
                        {selectedOrder.orderStatus}
                      </Badge>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-medium'>Payment Method:</span>
                      <Badge variant={getPaymentMethodBadgeVariant(selectedOrder.paymentMethod)}>
                        {selectedOrder.paymentMethod}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className='font-semibold text-lg mb-2'>Client Information</h3>
                  <div className='space-y-2 text-sm'>
                    <div className='flex justify-between'>
                      <span className='font-medium'>Name:</span>
                      <span>{selectedOrder.clientName}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-medium'>Mobile:</span>
                      <span>{selectedOrder.clientMobile}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h3 className='font-semibold text-lg mb-2'>Financial Details</h3>
                  <div className='space-y-2 text-sm'>
                    <div className='flex justify-between'>
                      <span className='font-medium'>Sub Total:</span>
                      <span>{formatCurrency(selectedOrder.subTotal)}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-medium'>Delivery Total:</span>
                      <span>{formatCurrency(selectedOrder.deliveryTotal)}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-medium'>Discount Total:</span>
                      <span>{formatCurrency(selectedOrder.discountTotal)}</span>
                    </div>
                    <div className='flex justify-between font-semibold'>
                      <span>Final Total:</span>
                      <span>{formatCurrency(selectedOrder.finalTotal)}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-medium'>COD Collected:</span>
                      <span>{formatCurrency(selectedOrder.codCollected)}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className='font-semibold text-lg mb-2'>Delivery Information</h3>
                  <div className='space-y-2 text-sm'>
                    <div className='flex justify-between'>
                      <span className='font-medium'>Driver Name:</span>
                      <span>{selectedOrder.driverName}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-medium'>Driver Mobile:</span>
                      <span>{selectedOrder.driverMobile}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-medium'>Delivery Date:</span>
                      <span>{formatDate(selectedOrder.deliveryDateTime)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!orderToDelete} onOpenChange={() => setOrderToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete order <strong>{orderToDelete?.orderNo}</strong>? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-end space-x-2'>
            <Button variant='outline' onClick={() => setOrderToDelete(null)}>
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
