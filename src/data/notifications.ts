import { Notification } from '@/types/notification';

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Order Received',
    body: 'You have received a new order #1001 from Ahmed Hassan',
    description:
      'Order contains 3 items: Nike Air Force, Adidas Hoodie, and Puma Shoes. Total amount: $150.00',
    datetime: '2024-01-15T10:30:00Z',
    createdBy: 'System',
    clientName: 'Ahmed Hassan',
    clientMobile: '+20 123 456 7890',
    seen: false,
    type: 'order',
    priority: 'high',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    title: 'Order Status Update',
    body: 'Order #1002 has been shipped and is out for delivery',
    description: 'Your order is now on its way to you. Expected delivery time: 2-3 business days.',
    datetime: '2024-01-15T09:15:00Z',
    createdBy: 'Admin User',
    clientName: 'Fatima Ahmed',
    clientMobile: '+20 111 222 3333',
    seen: true,
    type: 'order',
    priority: 'medium',
    createdAt: '2024-01-15T09:15:00Z',
    updatedAt: '2024-01-15T09:15:00Z',
  },
  {
    id: '3',
    title: 'Special Promotion',
    body: '50% OFF on all summer collection items!',
    description: "Don't miss out on our biggest sale of the year. Valid until end of month.",
    datetime: '2024-01-14T14:20:00Z',
    createdBy: 'Marketing Team',
    clientName: 'All Users',
    clientMobile: 'N/A',
    seen: false,
    type: 'promotion',
    priority: 'high',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-14T14:20:00Z',
  },
  {
    id: '4',
    title: 'System Maintenance',
    body: 'Scheduled maintenance will occur tonight from 2 AM to 4 AM',
    description:
      'The system will be temporarily unavailable during this time. We apologize for any inconvenience.',
    datetime: '2024-01-14T08:00:00Z',
    createdBy: 'System Admin',
    clientName: 'All Users',
    clientMobile: 'N/A',
    seen: true,
    type: 'system',
    priority: 'medium',
    createdAt: '2024-01-14T08:00:00Z',
    updatedAt: '2024-01-14T08:00:00Z',
  },
  {
    id: '5',
    title: 'Order Cancelled',
    body: 'Order #1003 has been cancelled by the customer',
    description:
      'Customer requested cancellation due to change of mind. Refund will be processed within 3-5 business days.',
    datetime: '2024-01-13T16:45:00Z',
    createdBy: 'Customer Service',
    clientName: 'Mohammed Ali',
    clientMobile: '+20 987 654 3210',
    seen: false,
    type: 'order',
    priority: 'medium',
    createdAt: '2024-01-13T16:45:00Z',
    updatedAt: '2024-01-13T16:45:00Z',
  },
  {
    id: '6',
    title: 'New Product Launch',
    body: 'Check out our new collection of winter jackets!',
    description:
      'Introducing our latest winter collection with premium materials and modern designs.',
    datetime: '2024-01-12T11:30:00Z',
    createdBy: 'Product Team',
    clientName: 'All Users',
    clientMobile: 'N/A',
    seen: true,
    type: 'promotion',
    priority: 'low',
    createdAt: '2024-01-12T11:30:00Z',
    updatedAt: '2024-01-12T11:30:00Z',
  },
];

export const getNotifications = async (): Promise<Notification[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockNotifications;
};

export const markNotificationAsSeen = async (id: string): Promise<void> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  const notification = mockNotifications.find(n => n.id === id);
  if (notification) {
    notification.seen = true;
    notification.updatedAt = new Date().toISOString();
  }
};

export const deleteNotification = async (id: string): Promise<void> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  const index = mockNotifications.findIndex(n => n.id === id);
  if (index > -1) {
    mockNotifications.splice(index, 1);
  }
};
