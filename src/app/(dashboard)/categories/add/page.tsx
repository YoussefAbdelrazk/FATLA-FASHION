import AddCategoryForm from '@/components/categories/add-category-form';

export default function AddCategoryPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>إضافة فئة جديدة</h1>
          <p className='text-muted-foreground'>إنشاء فئة جديدة مع المحتوى العربي والإنجليزي</p>
        </div>
      </div>

      <AddCategoryForm />
    </div>
  );
}
