import SingleColorForm from '@/components/colors/single-color-form';

export default function AddColorPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Add Color</h1>
        <p className='text-muted-foreground'>
          Create a new product color with Arabic and English names.
        </p>
      </div>
      <SingleColorForm />
    </div>
  );
}
