import ColorsTable from '@/components/colors/colors-table';

export default function ColorsPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Colors Management</h1>
        <p className='text-muted-foreground'>
          Manage product colors and their associated products.
        </p>
      </div>
      <ColorsTable />
    </div>
  );
}
