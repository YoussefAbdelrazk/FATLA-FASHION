import SlidersTable from '@/components/sliders/sliders-table';

export default function SlidersPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold dark:text-black tracking-tight'>إدارة السلايدرز</h1>
          <p className='text-muted-foreground'>إدارة محتوى السلايدرز وإعدادات الظهور</p>
        </div>
      </div>

      <SlidersTable />
    </div>
  );
}
