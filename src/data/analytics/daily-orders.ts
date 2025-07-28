export interface DailyOrder {
  day: string;
  orders: number;
}

export interface DailyOrdersData {
  data: DailyOrder[];
  maxOrders: number;
  period: string;
}

export const dailyOrdersData: DailyOrdersData = {
  data: [
    { day: 'Mon', orders: 45 },
    { day: 'Tue', orders: 52 },
    { day: 'Wed', orders: 38 },
    { day: 'Thu', orders: 67 },
    { day: 'Fri', orders: 89 },
    { day: 'Sat', orders: 120 },
    { day: 'Sun', orders: 95 },
  ],
  maxOrders: 120,
  period: 'Last 7 days',
};
