import AddColorForm from '@/components/colors/add-color-form';

export default function AddColorPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Add New Color</h1>
        <p className='text-muted-foreground'>Create a new color for your products.</p>
      </div>
      <AddColorForm />
    </div>
  );
}
