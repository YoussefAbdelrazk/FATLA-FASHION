export interface DashboardStatistics {
  totalUsers: {
    count: number;
    change: number;
    changeType: 'increase' | 'decrease';
  };
  totalOrders: {
    count: number;
    change: number;
    changeType: 'increase' | 'decrease';
  };
  totalRevenue: {
    amount: number;
    currency: string;
    change: number;
    changeType: 'increase' | 'decrease';
  };
  totalProducts: {
    count: number;
    change: number;
    changeType: 'increase' | 'decrease';
  };
}

export const dashboardStatistics: DashboardStatistics = {
  totalUsers: {
    count: 15847,
    change: 5.2,
    changeType: 'increase',
  },
  totalOrders: {
    count: 2847,
    change: 12.3,
    changeType: 'increase',
  },
  totalRevenue: {
    amount: 89231,
    currency: 'EGP',
    change: 23.5,
    changeType: 'increase',
  },
  totalProducts: {
    count: 1234,
    change: 8.7,
    changeType: 'increase',
  },
};
