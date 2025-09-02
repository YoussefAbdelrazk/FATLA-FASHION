import NotificationsForm from '@/components/notifications/notifications-form';

export default function NotificationsPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold dark:text-black tracking-tight'>إدارة الإشعارات</h1>
          <p className='text-muted-foreground'>أرسل إشعارات للمستخدمين أو للجميع</p>
        </div>
      </div>
      <NotificationsForm />
    </div>
  );
}
