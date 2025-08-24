import ClientsTable from '@/components/clients/clients-table';

export default function ClientsPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Clients Management</h1>
          <p className='text-muted-foreground'>Manage your clients and their account status</p>
        </div>
      </div>

      <ClientsTable />
    </div>
  );
}
