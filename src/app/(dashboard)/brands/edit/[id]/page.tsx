import EditBrandForm from '@/components/brands/edit-brand-form';

export default function EditBrandPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Edit Brand</h1>
          <p className='text-muted-foreground'>Update brand information and content</p>
        </div>
      </div>

      <EditBrandForm />
    </div>
  );
}
