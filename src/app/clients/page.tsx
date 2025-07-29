import ClientsTable from '@/components/clients/clients-table';

export default function ClientsPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-black '>Clients</h1>
        <p className='text-gray-600 '>Manage your fashion store clients and their information</p>
      </div>
      <ClientsTable />
    </div>
  );
}
