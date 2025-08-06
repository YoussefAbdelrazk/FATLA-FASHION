import BrandsTable from '@/components/brands/brands-table';

export default function BrandsPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Brands Management</h1>
          <p className='text-muted-foreground'>Manage your product brands and their content</p>
        </div>
      </div>

      <BrandsTable />
    </div>
  );
}
