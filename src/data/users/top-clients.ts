export interface TopClient {
  name: string;
  orders: number;
  total: string;
  status: 'VIP' | 'Regular' | 'Premium';
  email?: string;
  lastOrder?: string;
}

export interface TopClientsData {
  clients: TopClient[];
  period: string;
}

export const topClientsData: TopClientsData = {
  clients: [
    { name: 'Sarah Johnson', orders: 45, total: '12,450', status: 'VIP' },
    { name: 'Mike Chen', orders: 38, total: '9,800', status: 'VIP' },
    { name: 'Emma Davis', orders: 32, total: '8,900', status: 'Regular' },
    { name: 'Alex Brown', orders: 28, total: '7,200', status: 'Regular' },
    { name: 'Lisa Wilson', orders: 25, total: '6,800', status: 'VIP' },
    { name: 'David Miller', orders: 22, total: '5,900', status: 'Regular' },
    { name: 'Anna Garcia', orders: 19, total: '4,500', status: 'Regular' },
    { name: 'John Smith', orders: 17, total: '4,200', status: 'Regular' },
    { name: 'Maria Lopez', orders: 15, total: '3,800', status: 'Regular' },
    { name: 'Tom Anderson', orders: 12, total: '3,100', status: 'Regular' },
  ],
  period: 'All time',
};
