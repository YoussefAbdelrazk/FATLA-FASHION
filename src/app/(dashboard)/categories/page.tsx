import CategoriesTable from '@/components/categories/categories-table';
import { categories } from '@/data/categories';

export default function CategoriesPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Categories</h1>
        <p className='text-muted-foreground'>
          Manage your product categories, organize inventory, and control visibility.
        </p>
      </div>
      <CategoriesTable categories={categories} />
    </div>
  );
}
