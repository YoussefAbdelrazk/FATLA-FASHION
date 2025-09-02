import SizesTable from '@/components/sizes/sizes-table';

export default function SizesPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold dark:text-black tracking-tight'>إدارة المقاسات</h1>
        <p className='text-muted-foreground'>إدارة مقاسات المنتجات والمنتجات المرتبطة بها.</p>
      </div>
      <SizesTable />
    </div>
  );
}
