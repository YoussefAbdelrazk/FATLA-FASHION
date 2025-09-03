export interface Notification {
  id: string;
  title: string;
  body: string;
  description: string;
  datetime: string;
  createdBy: string;
  clientName: string;
  clientMobile: string;
  seen: boolean;
  image?: string;
  type: 'order' | 'promotion' | 'system' | 'general';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export interface NotificationTableProps {
  notifications: Notification[];
  onMarkAsSeen: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}
