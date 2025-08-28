'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    clientAddress: {
      government: 'Cairo',
      city: 'New Cairo',
      area: 'First Settlement',
      floor: '3rd Floor',
      building: 'Building A',
      landmark: 'Near City Center Mall',
    },
    orderDate: '2024-01-15T10:30:00Z',
    subTotal: 299.99,
    deliveryTotal: 25.0,
    discountTotal: 30.0,
    couponDiscount: 15.0,
    finalTotal: 294.99,
    paymentMethod: 'COD',
    orderStatus: 'Delivered',
    driverName: 'Mohammed Ali',
    driverMobile: '+20 987 654 3210',
    codCollected: 294.99,
    deliveryDateTime: '2024-01-16T14:30:00Z',
    totalQuantity: 3,
    orderItems: [],
  },
  {
    id: '2',
    orderNo: 'ORD-2024-002',
    clientName: 'Fatima Ahmed',
    clientMobile: '+20 111 222 3333',
    clientAddress: {
      government: 'Alexandria',
      city: 'Alexandria',
      area: 'Miami',
      floor: '2nd Floor',
      building: 'Building B',
      landmark: 'Near Corniche',
    },
    orderDate: '2024-01-16T11:45:00Z',
    subTotal: 159.99,
    deliveryTotal: 20.0,
    discountTotal: 0.0,
    couponDiscount: 0.0,
    finalTotal: 179.99,
    paymentMethod: 'Card',
    orderStatus: 'Processing',
    driverName: 'Omar Khalil',
    driverMobile: '+20 555 666 7777',
    codCollected: 0.0,
    deliveryDateTime: '2024-01-17T16:00:00Z',
    totalQuantity: 2,
    orderItems: [],
  },
  {
    id: '3',
    orderNo: 'ORD-2024-003',
    clientName: 'Youssef Mahmoud',
    clientMobile: '+20 444 555 6666',
    clientAddress: {
      government: 'Giza',
      city: '6th of October',
      area: 'Sheikh Zayed',
      floor: '1st Floor',
      building: 'Building C',
      landmark: 'Near Mall of Egypt',
    },
    orderDate: '2024-01-17T09:15:00Z',
    subTotal: 449.99,
    deliveryTotal: 30.0,
    discountTotal: 50.0,
    couponDiscount: 0.0,
    finalTotal: 429.99,
    paymentMethod: 'Online',
    orderStatus: 'Shipped',
    driverName: 'Ahmed Samir',
    driverMobile: '+20 777 888 9999',
    codCollected: 0.0,
    deliveryDateTime: '2024-01-18T12:30:00Z',
    totalQuantity: 4,
    orderItems: [],
  },
  {
    id: '4',
    orderNo: 'ORD-2024-004',
    clientName: 'Nour El-Din',
    clientMobile: '+20 888 999 0000',
    clientAddress: {
      government: 'Cairo',
      city: 'Maadi',
      area: 'Degla',
      floor: '5th Floor',
      building: 'Building D',
      landmark: 'Near Maadi Grand Mall',
    },
    orderDate: '2024-01-18T14:20:00Z',
    subTotal: 89.99,
    deliveryTotal: 15.0,
    discountTotal: 10.0,
    couponDiscount: 5.0,
    finalTotal: 94.99,
    paymentMethod: 'Cash',
    orderStatus: 'Pending',
    driverName: 'Hassan Ibrahim',
    driverMobile: '+20 123 456 7890',
    codCollected: 0.0,
    deliveryDateTime: '2024-01-19T10:00:00Z',
    totalQuantity: 1,
    orderItems: [],
  },
  {
    id: '5',
    orderNo: 'ORD-2024-005',
    clientName: 'Layla Mohamed',
    clientMobile: '+20 999 000 1111',
    clientAddress: {
      government: 'Cairo',
      city: 'Heliopolis',
      area: 'Korba',
      floor: 'Ground Floor',
      building: 'Building E',
      landmark: 'Near Heliopolis Club',
    },
    orderDate: '2024-01-19T16:45:00Z',
    subTotal: 199.99,
    deliveryTotal: 25.0,
    discountTotal: 25.0,
    couponDiscount: 0.0,
    finalTotal: 199.99,
    paymentMethod: 'COD',
    orderStatus: 'Confirmed',
    driverName: 'Karim Ahmed',
    driverMobile: '+20 222 333 4444',
    codCollected: 0.0,
    deliveryDateTime: '2024-01-20T15:30:00Z',
    totalQuantity: 2,
    orderItems: [],
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
    return 'الأمس';
  } else if (diffDays === 0) {
    return 'اليوم';
  } else if (diffDays <= 7) {
    return `${diffDays} أيام سابقاً`;
  } else {
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  }
};

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'EGP',
  }).format(amount);
};

export default function OrdersTable() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Order>('orderDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
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
            <span>إدارة الطلبات</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Page Size Controls */}
          <div className='mb-4 flex flex-col sm:flex-row gap-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <Input
                placeholder='البحث في الطلبات برقم الطلب، اسم العميل، الهاتف، أو السائق...'
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
                    onClick={() => handleSort('orderNo')}
                  >
                    رقم الطلب {sortField === 'orderNo' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => handleSort('clientName')}
                  >
                    اسم العميل {sortField === 'clientName' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead>هاتف العميل</TableHead>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => handleSort('orderDate')}
                  >
                    تاريخ الطلب {sortField === 'orderDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead>المجموع الفرعي</TableHead>
                  <TableHead>إجمالي التوصيل</TableHead>
                  <TableHead>إجمالي الخصم</TableHead>
                  <TableHead>المجموع النهائي</TableHead>
                  <TableHead>طريقة الدفع</TableHead>
                  <TableHead>حالة الطلب</TableHead>
                  <TableHead>اسم السائق</TableHead>
                  <TableHead>هاتف السائق</TableHead>
                  <TableHead>المبلغ المحصل</TableHead>
                  <TableHead>تاريخ ووقت التوصيل</TableHead>
                  <TableHead className='text-right'>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={14} className='text-center py-8'>
                      <p className='text-muted-foreground'>لم يتم العثور على طلبات</p>
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
                          title={`اتصال بـ ${order.clientMobile}`}
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
                          {order.paymentMethod === 'Cash'
                            ? 'نقداً'
                            : order.paymentMethod === 'Card'
                            ? 'بطاقة'
                            : order.paymentMethod === 'Online'
                            ? 'إلكتروني'
                            : order.paymentMethod === 'COD'
                            ? 'الدفع عند الاستلام'
                            : order.paymentMethod}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(order.orderStatus)}>
                          {order.orderStatus === 'Pending'
                            ? 'قيد الانتظار'
                            : order.orderStatus === 'Processing'
                            ? 'قيد المعالجة'
                            : order.orderStatus === 'Shipped'
                            ? 'تم الشحن'
                            : order.orderStatus === 'Delivered'
                            ? 'تم التوصيل'
                            : order.orderStatus === 'Cancelled'
                            ? 'ملغي'
                            : order.orderStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.driverName}</TableCell>
                      <TableCell>
                        <a
                          href={`tel:${order.driverMobile}`}
                          className='font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer'
                          title={`اتصال بـ ${order.driverMobile}`}
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
                              <span className='sr-only'>فتح القائمة</span>
                              <MoreHorizontal className='h-4 w-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem onClick={() => router.push(`/orders/${order.id}`)}>
                              <Eye className='mr-2 h-4 w-4' />
                              عرض التفاصيل
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(order)}>
                              <Pencil className='mr-2 h-4 w-4' />
                              تعديل
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(order)}
                              className='text-destructive'
                            >
                              <Trash2 className='mr-2 h-4 w-4' />
                              حذف
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
                عرض {startIndex + 1} إلى {Math.min(endIndex, sortedOrders.length)} من{' '}
                {sortedOrders.length} نتيجة
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

      {/* Delete Confirmation Dialog */}
      {orderToDelete && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 max-w-md w-full mx-4'>
            <h3 className='text-lg font-semibold mb-2'>تأكيد الحذف</h3>
            <p className='text-gray-600 mb-4'>
              هل أنت متأكد من أنك تريد حذف الطلب <strong>{orderToDelete.orderNo}</strong>؟ هذا
              الإجراء لا يمكن التراجع عنه.
            </p>
            <div className='flex justify-end space-x-2'>
              <Button variant='outline' onClick={() => setOrderToDelete(null)}>
                إلغاء
              </Button>
              <Button variant='destructive' onClick={confirmDelete}>
                حذف
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
