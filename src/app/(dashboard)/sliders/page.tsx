import SlidersTable from '@/components/sliders/sliders-table';

export default function SlidersPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Sliders Management</h1>
          <p className='text-muted-foreground'>
            Manage your slider content and visibility settings
          </p>
        </div>
      </div>

      <SlidersTable />
    </div>
  );
}
