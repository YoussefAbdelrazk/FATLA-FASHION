import ClientsTable from '@/components/clients/clients-table';

export default function ClientsPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl dark:text-black font-bold tracking-tight'>إدارة العملاء</h1>
          <p className='text-muted-foreground'>إدارة عملائك وحالة حساباتهم</p>
        </div>
      </div>

      <ClientsTable />
    </div>
  );
}
