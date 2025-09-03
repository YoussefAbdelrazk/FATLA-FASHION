import { redirect } from 'next/navigation';

export default function NotificationsPage() {
  // Redirect to the notifications list page
  redirect('/notifications/list');
}
