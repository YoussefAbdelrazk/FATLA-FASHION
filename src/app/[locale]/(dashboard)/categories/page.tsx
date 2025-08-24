import CategoriesTable from '@/components/categories/categories-table';

export default function CategoriesPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Categories Management</h1>
          <p className='text-muted-foreground'>Manage your product categories and their content</p>
        </div>
      </div>

      <CategoriesTable />
    </div>
  );
}
