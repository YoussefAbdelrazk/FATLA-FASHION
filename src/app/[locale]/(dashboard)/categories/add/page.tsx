import AddCategoryForm from '@/components/categories/add-category-form';

export default function AddCategoryPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Add New Category</h1>
          <p className='text-muted-foreground'>
            Create a new category with Arabic and English content
          </p>
        </div>
      </div>

      <AddCategoryForm />
    </div>
  );
}
