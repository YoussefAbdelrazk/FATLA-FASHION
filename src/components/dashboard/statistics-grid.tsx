import { dashboardStatistics } from '@/data';
import { DollarSign, Package, ShoppingBag, Users } from 'lucide-react';
import StatisticsCard from './statistics-card';

export default function StatisticsGrid() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      <StatisticsCard
        title='Total Users'
        value={dashboardStatistics.totalUsers.count}
        change={dashboardStatistics.totalUsers.change}
        changeType={dashboardStatistics.totalUsers.changeType}
        icon={Users}
      />
      <StatisticsCard
        title='Total Orders'
        value={dashboardStatistics.totalOrders.count}
        change={dashboardStatistics.totalOrders.change}
        changeType={dashboardStatistics.totalOrders.changeType}
        icon={ShoppingBag}
      />
      <StatisticsCard
        title='Total Revenue'
        value={`${dashboardStatistics.totalRevenue.amount.toLocaleString()} ${
          dashboardStatistics.totalRevenue.currency
        }`}
        change={dashboardStatistics.totalRevenue.change}
        changeType={dashboardStatistics.totalRevenue.changeType}
        icon={DollarSign}
      />
      <StatisticsCard
        title='Total Products'
        value={dashboardStatistics.totalProducts.count}
        change={dashboardStatistics.totalProducts.change}
        changeType={dashboardStatistics.totalProducts.changeType}
        icon={Package}
        subtitle='new items'
      />
    </div>
  );
}
