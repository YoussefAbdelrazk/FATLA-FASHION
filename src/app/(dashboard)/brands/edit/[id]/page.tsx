import EditBrandForm from '@/components/brands/edit-brand-form';

export default function EditBrandPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>تعديل العلامة التجارية</h1>
          <p className='text-muted-foreground'>تعديل معلومات العلامة التجارية والمحتوى</p>
        </div>
      </div>

      <EditBrandForm />
    </div>
  );
}
