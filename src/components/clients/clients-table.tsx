'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Ban, Edit, Trash2, UserCheck } from 'lucide-react';
import { useState } from 'react';

export default function ClientsTable() {
  const [clients, setClients] = useState<Client[]>(clientsData);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleBlockClient = (clientId: string) => {
    setClients(prev =>
      prev.map(client =>
        client.id === clientId
          ? { ...client, status: client.status === 'Active' ? 'Blocked' : 'Active' }
          : client,
      ),
    );
  };

  const handleDeleteClient = (clientId: string) => {
    setClients(prev => prev.filter(client => client.id !== clientId));
  };

  const handleEditClient = (client: Client) => {
    console.log('Edit client:', client);
    // TODO: Implement edit client functionality
  };

  return (
    <Card className='border-0 shadow-lg bg-white dark:bg-black'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='text-xl font-bold text-black dark:text-white'>
              Clients Management
            </CardTitle>
            <p className='text-gray-600 dark:text-gray-400'>
              Manage your fashion store clients and their information
            </p>
          </div>
          <Button className='bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'>
            <UserCheck className='w-4 h-4 mr-2' />
            Add New Client
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='rounded-md border border-gray-200 dark:border-gray-700'>
          <Table>
            <TableHeader>
              <TableRow className='bg-gray-50 dark:bg-gray-900'>
                <TableHead className='font-semibold text-black dark:text-white'>ID</TableHead>
                <TableHead className='font-semibold text-black dark:text-white'>
                  First Name
                </TableHead>
                <TableHead className='font-semibold text-black dark:text-white'>
                  Last Name
                </TableHead>
                <TableHead className='font-semibold text-black dark:text-white'>Mobile</TableHead>
                <TableHead className='font-semibold text-black dark:text-white'>Status</TableHead>
                <TableHead className='font-semibold text-black dark:text-white'>
                  Last Activity
                </TableHead>
                <TableHead className='font-semibold text-black dark:text-white'>
                  Orders Count
                </TableHead>
                <TableHead className='font-semibold text-black dark:text-white'>
                  Orders Total (EGP)
                </TableHead>
                <TableHead className='font-semibold text-black dark:text-white'>
                  Created At
                </TableHead>
                <TableHead className='font-semibold text-black dark:text-white text-center'>
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map(client => (
                <TableRow key={client.id} className='hover:bg-gray-50 dark:hover:bg-gray-900'>
                  <TableCell className='font-medium text-black dark:text-white'>
                    #{client.id}
                  </TableCell>
                  <TableCell className='text-black dark:text-white'>{client.firstName}</TableCell>
                  <TableCell className='text-black dark:text-white'>{client.lastName}</TableCell>
                  <TableCell className='text-black dark:text-white'>{client.mobile}</TableCell>
                  <TableCell>
                    <Badge
                      variant='secondary'
                      className={
                        client.status === 'Active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }
                    >
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-black dark:text-white'>
                    {formatDate(client.lastActivity)}
                  </TableCell>
                  <TableCell className='text-black dark:text-white'>{client.ordersCount}</TableCell>
                  <TableCell className='text-black dark:text-white'>
                    {client.ordersTotal.toLocaleString()} EGP
                  </TableCell>
                  <TableCell className='text-black dark:text-white'>
                    {formatDate(client.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center space-x-2'>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleEditClient(client)}
                        className='text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300'
                      >
                        <Edit className='w-4 h-4' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleBlockClient(client.id)}
                        className={
                          client.status === 'Active'
                            ? 'text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300'
                            : 'text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300'
                        }
                      >
                        {client.status === 'Active' ? (
                          <Ban className='w-4 h-4' />
                        ) : (
                          <UserCheck className='w-4 h-4' />
                        )}
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleDeleteClient(client.id)}
                        className='text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'
                      >
                        <Trash2 className='w-4 h-4' />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
