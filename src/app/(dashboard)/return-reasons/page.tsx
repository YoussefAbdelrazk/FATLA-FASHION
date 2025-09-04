import ReturnReasonsClient from '@/components/returns/return-reasons-client';
import { getReturnReasons } from '@/data/returns';

export default async function ReturnReasonsPage() {
  const returnReasons = await getReturnReasons();

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold dark:text-black tracking-tight'>أسباب طلبات الإرجاع</h1>
        <p className='text-muted-foreground'>إدارة أسباب طلبات الإرجاع المتاحة للعملاء</p>
      </div>
      <ReturnReasonsClient initialReasons={returnReasons} />
    </div>
  );
}
