export interface OrdersCount {
  today: number;
  yesterday: number;
  change: number;
  changeType: 'increase' | 'decrease';
}

export interface OrdersEGP {
  today: number;
  yesterday: number;
  change: number;
  changeType: 'increase' | 'decrease';
}

export interface Statistics {
  totalUsers: number;
  totalProducts: number;
  ordersCount: OrdersCount;
  ordersEGP: OrdersEGP;
}

export interface BarChartData {
  date: string;
  ordersCount: number;
}

export interface BarChart {
  data: BarChartData[];
  xAxisLabel: string;
  yAxisLabel: string;
}

export interface TopProduct {
  id: number;
  name: string;
  ordersCount: number;
  totalRevenue: number;
  imageUrl?: string;
}

export interface TopClient {
  id: number;
  firstName: string;
  lastName: string;
  ordersCount: number;
  totalSpent: number;
  mobileNumber: string;
}

export interface ProductNeedRestock {
  id: number;
  name: string;
  currentStock: number;
  minStock: number;
  imageUrl?: string;
}

export interface DashboardResponse {
  statistics: Statistics;
  barChart: BarChart;
  topProducts: TopProduct[];
  topClients: TopClient[];
  productsNeedRestock: ProductNeedRestock[];
}
