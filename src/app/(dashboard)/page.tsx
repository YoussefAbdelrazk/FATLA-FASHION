import DailyOrdersChart from '@/components/dashboard/daily-orders-chart';
import RestockProductsCard from '@/components/dashboard/restock-products-card';
import StatisticsGrid from '@/components/dashboard/statistics-grid';
import TopClientsCard from '@/components/dashboard/top-clients-card';
import TopProductsCard from '@/components/dashboard/top-products-card';
import WelcomeHeader from '@/components/dashboard/welcome-header';

export default function DashboardPage() {
  return (
    <div className='space-y-8'>
      <WelcomeHeader />
      <StatisticsGrid />
      <DailyOrdersChart />

      {/* Top Products and Clients */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <TopProductsCard />
        <TopClientsCard />
      </div>

      <RestockProductsCard />
    </div>
  );
}
