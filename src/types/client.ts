export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  status: 'Active' | 'Blocked';
  lastActivity: string;
  ordersCount: number;
  ordersTotal: number;
  createdAt: string;
}

export interface ClientTableProps {
  clients: Client[];
}
