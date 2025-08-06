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
import { clientsData } from '@/data/clients';
import { Client } from '@/types/client';
import { format } from 'date-fns';
import {
  ChevronDown,
  ChevronUp,
  Edit,
  Eye,
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
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Client>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [clientToBlock, setClientToBlock] = useState<Client | null>(null);

  // Filter and sort clients
  const filteredClients = clientsData.filter(
    client =>
      `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.mobile.includes(searchTerm) ||
      client.status.toLowerCase().includes(searchTerm.toLowerCase()),
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

  const confirmDelete = () => {
    // In a real app, this would call an API
    console.log('Deleting client:', clientToDelete?.id);
    setIsDeleteModalOpen(false);
    setClientToDelete(null);
  };

  const confirmBlock = () => {
    // In a real app, this would call an API
    console.log('Blocking client:', clientToBlock?.id);
    setIsBlockModalOpen(false);
    setClientToBlock(null);
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
            <CardTitle>Clients</CardTitle>
            <div className='flex items-center space-x-2'>
              <div className='relative flex-1 max-w-sm'>
                <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Search clients...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className='pl-8'
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
                      ID
                      <SortIcon field='id' />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant='ghost'
                      onClick={() => handleSort('firstName')}
                      className='h-auto p-0 font-semibold'
                    >
                      First Name
                      <SortIcon field='firstName' />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant='ghost'
                      onClick={() => handleSort('lastName')}
                      className='h-auto p-0 font-semibold'
                    >
                      Last Name
                      <SortIcon field='lastName' />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant='ghost'
                      onClick={() => handleSort('mobile')}
                      className='h-auto p-0 font-semibold'
                    >
                      Mobile
                      <SortIcon field='mobile' />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant='ghost'
                      onClick={() => handleSort('status')}
                      className='h-auto p-0 font-semibold'
                    >
                      Status
                      <SortIcon field='status' />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant='ghost'
                      onClick={() => handleSort('lastActivity')}
                      className='h-auto p-0 font-semibold'
                    >
                      Last Activity
                      <SortIcon field='lastActivity' />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant='ghost'
                      onClick={() => handleSort('ordersCount')}
                      className='h-auto p-0 font-semibold'
                    >
                      Orders Count
                      <SortIcon field='ordersCount' />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant='ghost'
                      onClick={() => handleSort('ordersTotal')}
                      className='h-auto p-0 font-semibold'
                    >
                      Orders Total EGP
                      <SortIcon field='ordersTotal' />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant='ghost'
                      onClick={() => handleSort('createdAt')}
                      className='h-auto p-0 font-semibold'
                    >
                      Created At
                      <SortIcon field='createdAt' />
                    </Button>
                  </TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedClients.map(client => (
                  <TableRow key={client.id}>
                    <TableCell className='font-medium'>{client.id}</TableCell>
                    <TableCell>{client.firstName}</TableCell>
                    <TableCell>{client.lastName}</TableCell>
                    <TableCell>{client.mobile}</TableCell>
                    <TableCell>
                      <Badge
                        variant={client.status === 'Active' ? 'default' : 'destructive'}
                        className='capitalize'
                      >
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(client.lastActivity), 'MMM dd, yyyy HH:mm')}
                    </TableCell>
                    <TableCell>{client.ordersCount}</TableCell>
                    <TableCell>EGP {client.ordersTotal.toLocaleString()}</TableCell>
                    <TableCell>{format(new Date(client.createdAt), 'MMM dd, yyyy')}</TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'>Open menu</span>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem onClick={() => handleShowDetails(client)}>
                            <Eye className='mr-2 h-4 w-4' />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(client)}>
                            <Edit className='mr-2 h-4 w-4' />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleBlock(client)}
                            className={
                              client.status === 'Active' ? 'text-destructive' : 'text-green-600'
                            }
                          >
                            {client.status === 'Active' ? (
                              <>
                                <ShieldOff className='mr-2 h-4 w-4' />
                                Block
                              </>
                            ) : (
                              <>
                                <Shield className='mr-2 h-4 w-4' />
                                Unblock
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(client)}
                            className='text-destructive'
                          >
                            <Trash2 className='mr-2 h-4 w-4' />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Client Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Client Details</DialogTitle>
            <DialogDescription>Detailed information about the selected client</DialogDescription>
          </DialogHeader>
          {selectedClient && (
            <div className='space-y-4'>
              <div className='flex items-center space-x-3'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'>
                  <User className='h-6 w-6 text-primary' />
                </div>
                <div>
                  <h3 className='text-lg font-semibold'>
                    {selectedClient.firstName} {selectedClient.lastName}
                  </h3>
                  <p className='text-sm text-muted-foreground'>Client ID: {selectedClient.id}</p>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Mobile</label>
                  <p className='text-sm'>{selectedClient.mobile}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Status</label>
                  <Badge
                    variant={selectedClient.status === 'Active' ? 'default' : 'destructive'}
                    className='capitalize'
                  >
                    {selectedClient.status}
                  </Badge>
                </div>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Orders Count</label>
                  <p className='text-sm'>{selectedClient.ordersCount}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Total Spent</label>
                  <p className='text-sm'>EGP {selectedClient.ordersTotal.toLocaleString()}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Last Activity</label>
                  <p className='text-sm'>
                    {format(new Date(selectedClient.lastActivity), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Created At</label>
                  <p className='text-sm'>
                    {format(new Date(selectedClient.createdAt), 'MMM dd, yyyy')}
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
            <DialogTitle>Delete Client</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this client? This action cannot be undone.
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

      {/* Block/Unblock Confirmation Modal */}
      <Dialog open={isBlockModalOpen} onOpenChange={setIsBlockModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {clientToBlock?.status === 'Active' ? 'Block Client' : 'Unblock Client'}
            </DialogTitle>
            <DialogDescription>
              {clientToBlock?.status === 'Active'
                ? 'Are you sure you want to block this client? They will not be able to access their account.'
                : 'Are you sure you want to unblock this client? They will be able to access their account again.'}
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-end space-x-2'>
            <Button variant='outline' onClick={() => setIsBlockModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={clientToBlock?.status === 'Active' ? 'destructive' : 'default'}
              onClick={confirmBlock}
            >
              {clientToBlock?.status === 'Active' ? 'Block' : 'Unblock'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
