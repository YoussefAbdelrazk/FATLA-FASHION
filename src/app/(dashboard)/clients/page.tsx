import ClientsTable from '@/components/clients/clients-table';
import { clientsData } from '@/data/clients';

export default function ClientsPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-black '>Clients</h1>
        <p className='text-gray-600 dark:text-gray-400'>
          Manage your fashion store clients and their information
        </p>
      </div>
      <ClientsTable clients={clientsData} />
    </div>
  );
}
