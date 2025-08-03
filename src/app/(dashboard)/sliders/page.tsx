import SlidersTable from '@/components/sliders/sliders-table';

export default function SlidersPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Sliders</h1>
        <p className='text-muted-foreground'>
          Manage your slider banners, visibility, and content for both Arabic and English.
        </p>
      </div>
      <SlidersTable />
    </div>
  );
}
