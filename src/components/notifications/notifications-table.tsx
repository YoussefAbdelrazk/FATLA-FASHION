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
import { deleteNotification, markNotificationAsSeen } from '@/data/notifications';
import { Notification } from '@/types/notification';
import {
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  MoreHorizontal,
  Search,
  Trash2,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface NotificationsTableProps {
  initialNotifications: Notification[];
}

export default function NotificationsTable({ initialNotifications }: NotificationsTableProps) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Notification>('datetime');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [notificationToDelete, setNotificationToDelete] = useState<Notification | null>(null);
  const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set());

  const formatDateTime = (dateString: string) => {
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

  const formatFullDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  const getTypeLabel = (type: Notification['type']) => {
    switch (type) {
      case 'order':
        return 'طلب';
      case 'promotion':
        return 'عرض ترويجي';
      case 'system':
        return 'نظام';
      case 'general':
        return 'عام';
      default:
        return type;
    }
  };

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'order':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'promotion':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'system':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'general':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityLabel = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'عالي';
      case 'medium':
        return 'متوسط';
      case 'low':
        return 'منخفض';
      default:
        return priority;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(
    notification =>
      notification.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.body?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.clientMobile?.includes(searchTerm) ||
      notification.createdBy?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Sort notifications
  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue && bValue && aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue && bValue && aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field: keyof Notification) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleMarkAsSeen = async (id: string) => {
    setLoadingItems(prev => new Set(prev).add(id));
    try {
      await markNotificationAsSeen(id);
      // Update local state
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === id
            ? { ...notification, seen: true, updatedAt: new Date().toISOString() }
            : notification,
        ),
      );
      toast.success('تم تحديث حالة الإشعار');
    } catch {
      toast.error('فشل في تحديث الإشعار');
    } finally {
      setLoadingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleDelete = (notification: Notification) => {
    setNotificationToDelete(notification);
  };

  const confirmDelete = async () => {
    if (notificationToDelete) {
      setLoadingItems(prev => new Set(prev).add(notificationToDelete.id));
      try {
        await deleteNotification(notificationToDelete.id);
        // Update local state
        setNotifications(prev =>
          prev.filter(notification => notification.id !== notificationToDelete.id),
        );
        toast.success('تم حذف الإشعار بنجاح');
        setNotificationToDelete(null);
      } catch {
        toast.error('فشل في حذف الإشعار');
      } finally {
        setLoadingItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(notificationToDelete.id);
          return newSet;
        });
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchTerm('');
  };

  const handlePageSizeChange = (newPageSize: string) => {
    setPageSize(parseInt(newPageSize));
    setCurrentPage(1);
    setSearchTerm('');
  };

  const totalPages = Math.ceil(sortedNotifications.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedNotifications = sortedNotifications.slice(startIndex, endIndex);

  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <span>إدارة الإشعارات</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Page Size Controls */}
          <div className='mb-4 flex flex-col sm:flex-row gap-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <Input
                placeholder='البحث في الإشعارات بالعنوان، المحتوى، اسم العميل، أو الهاتف...'
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
                  <TableHead className='w-16'>المعرف</TableHead>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => handleSort('title')}
                  >
                    العنوان {sortField === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead>المحتوى</TableHead>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => handleSort('datetime')}
                  >
                    التاريخ والوقت{' '}
                    {sortField === 'datetime' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead
                    className='cursor-pointer hover:bg-muted/50'
                    onClick={() => handleSort('createdBy')}
                  >
                    أنشئ بواسطة {sortField === 'createdBy' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead>العميل</TableHead>
                  <TableHead>تم القراءة</TableHead>
                  <TableHead>النوع</TableHead>
                  <TableHead>الأولوية</TableHead>
                  <TableHead className='text-right'>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedNotifications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className='text-center py-8'>
                      <div className='flex flex-col items-center gap-2'>
                        <Bell className='w-12 h-12 text-gray-400' />
                        <p className='text-muted-foreground'>لم يتم العثور على إشعارات</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedNotifications.map(notification => {
                    const isLoading = loadingItems.has(notification.id);

                    return (
                      <TableRow
                        key={notification.id}
                        className={`hover:bg-gray-50 transition-colors ${
                          !notification.seen ? 'bg-blue-50/30' : ''
                        }`}
                      >
                        <TableCell className='font-mono text-sm text-gray-600'>
                          #{notification.id}
                        </TableCell>

                        <TableCell>
                          <div className='space-y-1'>
                            <div className='font-medium text-gray-900'>{notification.title}</div>
                            <div className='text-sm text-gray-600 line-clamp-2 max-w-xs'>
                              {notification.body}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className='text-sm text-gray-700 max-w-xs'>
                            <p className='line-clamp-3'>{notification.description}</p>
                          </div>
                        </TableCell>

                        <TableCell
                          className='font-medium cursor-help'
                          title={formatFullDateTime(notification.datetime)}
                        >
                          <div className='flex items-center gap-1 text-sm'>
                            <Calendar className='w-3 h-3' />
                            {formatDateTime(notification.datetime)}
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className='flex items-center gap-2'>
                            <User className='w-4 h-4 text-gray-500' />
                            <span className='text-sm text-gray-900'>{notification.createdBy}</span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className='space-y-1'>
                            <div className='text-sm font-medium text-gray-900'>
                              {notification.clientName}
                            </div>
                            <div className='text-xs text-gray-600'>{notification.clientMobile}</div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant='outline'
                            className={`text-xs ${
                              notification.seen
                                ? 'bg-green-100 text-green-800 border-green-200'
                                : 'bg-orange-100 text-orange-800 border-orange-200'
                            }`}
                          >
                            {notification.seen ? 'نعم' : 'لا'}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant='outline'
                            className={`text-xs ${getTypeColor(notification.type)}`}
                          >
                            {getTypeLabel(notification.type)}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant='outline'
                            className={`text-xs ${getPriorityColor(notification.priority)}`}
                          >
                            {getPriorityLabel(notification.priority)}
                          </Badge>
                        </TableCell>

                        <TableCell className='text-right'>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant='ghost' className='h-8 w-8 p-0'>
                                <span className='sr-only'>فتح القائمة</span>
                                <MoreHorizontal className='h-4 w-4' />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                              <DropdownMenuItem
                                onClick={() => handleMarkAsSeen(notification.id)}
                                disabled={isLoading}
                              >
                                {isLoading ? (
                                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2'></div>
                                ) : notification.seen ? (
                                  <EyeOff className='mr-2 h-4 w-4' />
                                ) : (
                                  <Eye className='mr-2 h-4 w-4' />
                                )}
                                {notification.seen ? 'تعيين كغير مقروء' : 'تعيين كمقروء'}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(notification)}
                                className='text-destructive'
                                disabled={isLoading}
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
          {totalPages > 1 && (
            <div className='flex items-center justify-between mt-4'>
              <div className='text-sm text-muted-foreground'>
                عرض {startIndex + 1} إلى {Math.min(endIndex, sortedNotifications.length)} من{' '}
                {sortedNotifications.length} نتيجة
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
      {notificationToDelete && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 max-w-md w-full mx-4'>
            <h3 className='text-lg font-semibold mb-2'>تأكيد الحذف</h3>
            <p className='text-gray-600 mb-4'>
              هل أنت متأكد من أنك تريد حذف الإشعار <strong>{notificationToDelete.title}</strong>؟
              هذا الإجراء لا يمكن التراجع عنه.
            </p>
            <div className='flex justify-end space-x-2'>
              <Button variant='outline' onClick={() => setNotificationToDelete(null)}>
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
