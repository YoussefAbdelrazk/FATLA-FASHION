'use client';

import NotificationModal from '@/components/notifications/notification-modal';
import NotificationsTable from '@/components/notifications/notifications-table';
import { deleteNotification, getNotifications, markNotificationAsSeen } from '@/data/notifications';
import { Notification } from '@/types/notification';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NotificationsListPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsSeen = async (id: string) => {
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
    } catch (error) {
      console.error('Error marking notification as seen:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNotification(id);
      // Update local state
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleNotificationSent = () => {
    // Refresh notifications after sending a new one
    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

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

        <NotificationModal onNotificationSent={handleNotificationSent} />
      </div>

      {/* Notifications Table */}
      {loading ? (
        <div className='animate-pulse bg-gray-100 rounded-lg h-96'></div>
      ) : (
        <NotificationsTable
          notifications={notifications}
          onMarkAsSeen={handleMarkAsSeen}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
