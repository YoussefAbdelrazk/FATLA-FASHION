import BrandForm from '@/components/brands/brand-form';

interface EditBrandPageProps {
  params: {
    id: string;
  };
}

export default function EditBrandPage({ params }: EditBrandPageProps) {
  return <BrandForm brandId={params.id} isEdit={true} />;
}
