import NotificationsForm from '@/components/notifications/notifications-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';

export default function SendNotificationPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Link href='/notifications/list'>
            <Button variant='ghost' size='sm' className='text-gray-600 hover:text-gray-900'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Back to Notifications
            </Button>
          </Link>
          <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center'>
            <Send className='w-5 h-5 text-green-600' />
          </div>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>Send Notification</h1>
            <p className='text-gray-600'>Create and send a new notification to users</p>
          </div>
        </div>
      </div>

      {/* Notification Form */}
      <NotificationsForm />
    </div>
  );
}
