import EditCategoryForm from '@/components/categories/edit-category-form';

export default function EditCategoryPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>تعديل الفئة</h1>
          <p className='text-muted-foreground'>تعديل معلومات الفئة والمحتوى</p>
        </div>
      </div>

      <EditCategoryForm />
    </div>
  );
}
