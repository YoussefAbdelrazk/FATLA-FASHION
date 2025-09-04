import NotificationModal from '@/components/notifications/notification-modal';
import NotificationsTable from '@/components/notifications/notifications-table';
import { getNotifications } from '@/data/notifications';
import { Bell } from 'lucide-react';

export default async function NotificationsListPage() {
  // Fetch notifications on the server
  const notifications = await getNotifications();

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
            <Bell className='w-5 h-5 text-blue-600' />
          </div>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>الإشعارات</h1>
            <p className='text-gray-600'>إدارة وعرض جميع الإشعارات</p>
          </div>
        </div>

        <NotificationModal />
      </div>

      {/* Notifications Table */}
      <NotificationsTable initialNotifications={notifications} />
    </div>
  );
}
