import ReturnsTable from '@/components/returns/returns-table';
import { getReturns } from '@/data/returns';

export default async function ReturnsPage() {
  const returns = await getReturns();

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold dark:text-black tracking-tight'>إدارة طلبات الإرجاع</h1>
        <p className='text-muted-foreground'>إدارة جميع طلبات إرجاع العملاء وحالتها</p>
      </div>
      <ReturnsTable returns={returns} />
    </div>
  );
}

