import AddColorForm from '@/components/colors/add-color-form';

export default function AddColorPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>إضافة ألوان جديدة</h1>
        <p className='text-muted-foreground'>إنشاء ألوان جديدة للمنتجات</p>
      </div>
      <AddColorForm />
    </div>
  );
}
