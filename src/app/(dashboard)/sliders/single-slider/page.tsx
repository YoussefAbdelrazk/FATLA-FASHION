import SingleSliderForm from '@/components/sliders/sliders-table';

export default function AddSliderPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>إضافة سلايدر جديد</h1>
          <p className='text-muted-foreground'>إنشاء سلايدر جديد مع المحتوى العربي والإنجليزي</p>
        </div>
      </div>

      <SingleSliderForm />
    </div>
  );
}
