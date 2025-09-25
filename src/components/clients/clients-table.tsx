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
import { Pagination } from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useLanguage } from '@/context/language';
import {
  useBlockClient,
  useDeleteClient,
  useGetAllClients,
  useUnblockClient,
} from '@/hooks/useClients';
import { Client } from '@/types/client';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import {
  ChevronDown,
  ChevronUp,
  Edit,
  Eye,
  Loader2,
  MoreHorizontal,
  Search,
  Shield,
  ShieldOff,
  Trash2,
  User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ClientsTable() {
  const router = useRouter();
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Client>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [clientToBlock, setClientToBlock] = useState<Client | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // Use React Query hooks
  const { data: clientsData, isLoading, error } = useGetAllClients(language, currentPage, pageSize);
  const blockClientMutation = useBlockClient();
  const unblockClientMutation = useUnblockClient();
  const deleteClientMutation = useDeleteClient();

  const clients = clientsData?.clients || [];
  const pagination = clientsData?.pagination || {
    currentPage: 1,
    pageSize: 20,
    totalCount: 0,
    totalPages: 0,
  };
  const loading = isLoading;

  // Filter and sort clients
  const filteredClients = clients.filter(
    client =>
      `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.mobileNumber.includes(searchTerm) ||
      (client.isBlocked ? 'محظور' : 'نشط').toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedClients = [...filteredClients].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
      return sortDirection === 'asc' ? (aValue ? 1 : -1) : bValue ? 1 : -1;
    }

    return 0;
  });

  const handleSort = (field: keyof Client) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleShowDetails = (client: Client) => {
    setSelectedClient(client);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (client: Client) => {
    router.push(`/clients/edit/${client.id}`);
  };

  const handleDelete = (client: Client) => {
    setClientToDelete(client);
    setIsDeleteModalOpen(true);
  };

  const handleBlock = (client: Client) => {
    setClientToBlock(client);
    setIsBlockModalOpen(true);
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const confirmDelete = async () => {
    if (!clientToDelete) return;

    try {
      await deleteClientMutation.mutateAsync({ id: clientToDelete.id });
      setIsDeleteModalOpen(false);
      setClientToDelete(null);
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const confirmBlock = async () => {
    if (!clientToBlock) return;

    try {
      if (clientToBlock.isBlocked) {
        await unblockClientMutation.mutateAsync({ id: clientToBlock.id });
      } else {
        await blockClientMutation.mutateAsync({ id: clientToBlock.id });
      }
      setIsBlockModalOpen(false);
      setClientToBlock(null);
    } catch (error) {
      console.error('Error updating client status:', error);
    }
  };

  const SortIcon = ({ field }: { field: keyof Client }) => {
    if (sortField !== field) {
      return <ChevronDown className='w-4 h-4' />;
    }
    return sortDirection === 'asc' ? (
      <ChevronUp className='w-4 h-4' />
    ) : (
      <ChevronDown className='w-4 h-4' />
    );
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle>العملاء</CardTitle>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <div className='relative flex-1 max-w-sm'>
                <Search className='absolute right-2 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='البحث في العملاء...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className='pr-8'
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button
                      variant='ghost'
                      onClick={() => handleSort('id')}
                      className='h-auto p-0 font-semibold'
                    >
                      المعرف
                      <SortIcon field='id' />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant='ghost'
                      onClick={() => handleSort('firstName')}
                      className='h-auto p-0 font-semibold'
                    >
                      الاسم الأول
                      <SortIcon field='firstName' />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant='ghost'
                      onClick={() => handleSort('lastName')}
                      className='h-auto p-0 font-semibold'
                    >
                      اسم العائلة
                      <SortIcon field='lastName' />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant='ghost'
                      onClick={() => handleSort('mobileNumber')}
                      className='h-auto p-0 font-semibold'
                    >
                      رقم الهاتف
                      <SortIcon field='mobileNumber' />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant='ghost'
                      onClick={() => handleSort('isBlocked')}
                      className='h-auto p-0 font-semibold'
                    >
                      الحالة
                      <SortIcon field='isBlocked' />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant='ghost'
                      onClick={() => handleSort('lastLogin')}
                      className='h-auto p-0 font-semibold'
                    >
                      آخر تسجيل دخول
                      <SortIcon field='lastLogin' />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant='ghost'
                      onClick={() => handleSort('ordersCount')}
                      className='h-auto p-0 font-semibold'
                    >
                      عدد الطلبات
                      <SortIcon field='ordersCount' />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant='ghost'
                      onClick={() => handleSort('ordersTotal')}
                      className='h-auto p-0 font-semibold'
                    >
                      إجمالي الطلبات (جنيه)
                      <SortIcon field='ordersTotal' />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant='ghost'
                      onClick={() => handleSort('createdAt')}
                      className='h-auto p-0 font-semibold'
                    >
                      تاريخ الإنشاء
                      <SortIcon field='createdAt' />
                    </Button>
                  </TableHead>
                  <TableHead className='text-right'>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={10} className='text-center py-8'>
                      <div className='flex items-center justify-center space-x-2 space-x-reverse'>
                        <Loader2 className='h-4 w-4 animate-spin' />
                        <span>جاري التحميل...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={10} className='text-center py-8 text-destructive'>
                      خطأ في تحميل البيانات:{' '}
                      {error instanceof Error ? error.message : 'حدث خطأ غير متوقع'}
                    </TableCell>
                  </TableRow>
                ) : sortedClients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className='text-center py-8 text-muted-foreground'>
                      لا توجد عملاء
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedClients.map(client => (
                    <TableRow key={client.id}>
                      <TableCell className='font-medium'>{client.id}</TableCell>
                      <TableCell>{client.firstName}</TableCell>
                      <TableCell>{client.lastName}</TableCell>
                      <TableCell>{client.mobileNumber}</TableCell>
                      <TableCell>
                        <Badge
                          variant={!client.isBlocked ? 'default' : 'destructive'}
                          className='capitalize'
                        >
                          {!client.isBlocked ? 'نشط' : 'محظور'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(client.lastLogin), 'MMM dd, yyyy HH:mm', { locale: ar })}
                      </TableCell>
                      <TableCell>{client.ordersCount}</TableCell>
                      <TableCell>{client.ordersTotal.toLocaleString()} جنيه</TableCell>
                      <TableCell>
                        {format(new Date(client.createdAt), 'MMM dd, yyyy', { locale: ar })}
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
                            <DropdownMenuItem onClick={() => handleShowDetails(client)}>
                              <Eye className='ml-2 h-4 w-4' />
                              عرض التفاصيل
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(client)}>
                              <Edit className='ml-2 h-4 w-4' />
                              تعديل
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleBlock(client)}
                              className={!client.isBlocked ? 'text-destructive' : 'text-green-600'}
                            >
                              {!client.isBlocked ? (
                                <>
                                  <ShieldOff className='ml-2 h-4 w-4' />
                                  حظر
                                </>
                              ) : (
                                <>
                                  <Shield className='ml-2 h-4 w-4' />
                                  إلغاء الحظر
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(client)}
                              className='text-destructive'
                            >
                              <Trash2 className='ml-2 h-4 w-4' />
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
          {!loading && !error && sortedClients.length > 0 && (
            <div className='mt-4'>
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                loading={loading}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Client Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>تفاصيل العميل</DialogTitle>
            <DialogDescription>معلومات مفصلة عن العميل المحدد</DialogDescription>
          </DialogHeader>
          {selectedClient && (
            <div className='space-y-4'>
              <div className='flex items-center space-x-3 space-x-reverse'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'>
                  <User className='h-6 w-6 text-primary' />
                </div>
                <div>
                  <h3 className='text-lg font-semibold'>
                    {selectedClient.firstName} {selectedClient.lastName}
                  </h3>
                  <p className='text-sm text-muted-foreground'>معرف العميل: {selectedClient.id}</p>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>رقم الهاتف</label>
                  <p className='text-sm'>{selectedClient.mobileNumber}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>الحالة</label>
                  <Badge
                    variant={!selectedClient.isBlocked ? 'default' : 'destructive'}
                    className='capitalize'
                  >
                    {!selectedClient.isBlocked ? 'نشط' : 'محظور'}
                  </Badge>
                </div>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>عدد الطلبات</label>
                  <p className='text-sm'>{selectedClient.ordersCount}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>
                    إجمالي الإنفاق
                  </label>
                  <p className='text-sm'>{selectedClient.ordersTotal.toLocaleString()} جنيه</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>
                    آخر تسجيل دخول
                  </label>
                  <p className='text-sm'>
                    {format(new Date(selectedClient.lastLogin), 'MMM dd, yyyy HH:mm', {
                      locale: ar,
                    })}
                  </p>
                </div>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>تاريخ الإنشاء</label>
                  <p className='text-sm'>
                    {format(new Date(selectedClient.createdAt), 'MMM dd, yyyy', { locale: ar })}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>حذف العميل</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من حذف هذا العميل؟ لا يمكن التراجع عن هذا الإجراء.
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-end space-x-2 space-x-reverse'>
            <Button variant='outline' onClick={() => setIsDeleteModalOpen(false)}>
              إلغاء
            </Button>
            <Button variant='destructive' onClick={confirmDelete}>
              حذف
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Block/Unblock Confirmation Modal */}
      <Dialog open={isBlockModalOpen} onOpenChange={setIsBlockModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {!clientToBlock?.isBlocked ? 'حظر العميل' : 'إلغاء حظر العميل'}
            </DialogTitle>
            <DialogDescription>
              {!clientToBlock?.isBlocked
                ? 'هل أنت متأكد من حظر هذا العميل؟ لن يتمكن من الوصول إلى حسابه.'
                : 'هل أنت متأكد من إلغاء حظر هذا العميل؟ سيتمكن من الوصول إلى حسابه مرة أخرى.'}
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-end space-x-2 space-x-reverse'>
            <Button variant='outline' onClick={() => setIsBlockModalOpen(false)}>
              إلغاء
            </Button>
            <Button
              variant={!clientToBlock?.isBlocked ? 'destructive' : 'default'}
              onClick={confirmBlock}
            >
              {!clientToBlock?.isBlocked ? 'حظر' : 'إلغاء الحظر'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
