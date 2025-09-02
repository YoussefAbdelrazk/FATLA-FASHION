import EditColorForm from '@/components/colors/edit-color-form';

interface EditColorPageProps {
  params: {
    id: string;
  };
}

export default function EditColorPage({ params }: EditColorPageProps) {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>تعديل اللون</h1>
        <p className='text-muted-foreground'>تعديل معلومات اللون</p>
      </div>
      <EditColorForm colorId={params.id} />
    </div>
  );
}
