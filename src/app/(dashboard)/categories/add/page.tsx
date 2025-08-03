import SingleCategoryForm from '@/components/categories/single-category-form';

export default function AddCategoryPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Add Category</h1>
        <p className='text-muted-foreground'>
          Create a new product category with Arabic and English names.
        </p>
      </div>
      <SingleCategoryForm />
    </div>
  );
}
