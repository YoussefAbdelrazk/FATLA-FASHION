import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { topClientsData } from '@/data';
import { MoreHorizontal } from 'lucide-react';

export default function TopClientsCard() {
  return (
    <Card className='border-0 shadow-lg bg-white dark:bg-black'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='text-xl font-bold text-black dark:text-white'>
              Top 10 Clients
            </CardTitle>
            <CardDescription className='text-gray-600 dark:text-gray-400'>
              Most valuable customers of all time
            </CardDescription>
          </div>
          <Button variant='outline' size='sm' className='border-gray-200 dark:border-gray-700'>
            <MoreHorizontal className='w-4 h-4' />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {topClientsData.clients.map((client, index) => (
            <div
              key={index}
              className='flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors'
            >
              <div className='flex items-center space-x-3'>
                <div className='w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black font-bold text-sm'>
                  {index + 1}
                </div>
                <div>
                  <p className='font-semibold text-black dark:text-white'>{client.name}</p>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>{client.orders} orders</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-bold text-black dark:text-white'>{client.total} EGP</p>
                <Badge
                  variant='secondary'
                  className={
                    client.status === 'VIP'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }
                >
                  {client.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
