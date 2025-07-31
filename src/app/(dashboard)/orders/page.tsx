import OrdersTable from '@/components/orders/orders-table';
import { orders } from '@/data/orders';

export default function OrdersPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Orders</h1>
        <p className='text-muted-foreground'>
          Manage your orders, track delivery status, and handle customer requests.
        </p>
      </div>
      <OrdersTable orders={orders} />
    </div>
  );
}
