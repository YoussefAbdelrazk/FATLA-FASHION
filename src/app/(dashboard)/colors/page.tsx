import ColorsTable from '@/components/colors/colors-table';

export default function ColorsPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold dark:text-black tracking-tight'>إدارة الألوان</h1>
        <p className='text-muted-foreground'>إدارة ألوان المنتجات والمنتجات المرتبطة بها.</p>
      </div>
      <ColorsTable />
    </div>
  );
}
