import SingleSliderForm from '@/components/sliders/single-slider-form';

export default function SingleSliderPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Add New Slider</h1>
        <p className='text-muted-foreground'>
          Create a new slider banner with Arabic and English content.
        </p>
      </div>
      <SingleSliderForm />
    </div>
  );
}
