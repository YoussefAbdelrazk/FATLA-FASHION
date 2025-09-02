import CategoriesTable from '@/components/categories/categories-table';

export default function CategoriesPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold dark:text-black tracking-tight'>إدارة الفئات</h1>
          <p className='text-muted-foreground'>إدارة فئات المنتجات ومحتواها</p>
        </div>
      </div>

      <CategoriesTable />
    </div>
  );
}
