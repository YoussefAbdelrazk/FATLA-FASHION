import AddSliderForm from '@/components/sliders/add-slider-form';

export default function AddSliderPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Add New Slider</h1>
          <p className='text-muted-foreground'>
            Create a new slider with Arabic and English content
          </p>
        </div>
      </div>

      <AddSliderForm />
    </div>
  );
}
