import AddBrandForm from '@/components/brands/add-brand-form';

export default function AddBrandPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>إضافة علامة تجارية جديدة</h1>
          <p className='text-muted-foreground'>
            إنشاء علامة تجارية جديدة مع الاسم والصورة وإعدادات الظهور
          </p>
        </div>
      </div>

      <AddBrandForm />
    </div>
  );
}
