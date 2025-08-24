import AddBrandForm from '@/components/brands/add-brand-form';

export default function AddBrandPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Add New Brand</h1>
          <p className='text-muted-foreground'>
            Create a new brand with name, image, and visibility settings
          </p>
        </div>
      </div>

      <AddBrandForm />
    </div>
  );
}
