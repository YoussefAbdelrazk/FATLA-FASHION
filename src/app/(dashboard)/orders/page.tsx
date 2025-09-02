import OrdersTable from '@/components/orders/orders-table';

export default function OrdersPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold dark:text-black tracking-tight'>إدارة الطلبات</h1>
        <p className='text-muted-foreground'>إدارة جميع طلبات العملاء وحالتها</p>
      </div>
      <OrdersTable />
    </div>
  );
}
