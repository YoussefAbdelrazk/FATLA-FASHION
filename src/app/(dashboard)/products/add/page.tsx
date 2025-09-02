import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AddProductForm } from '@/components/products/add-product-form';

export default function AddProductPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>إضافة منتج جديد</h1>
        <p className='text-muted-foreground'>إنشاء منتج جديد مع جميع المتغيرات والتفاصيل</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>معلومات المنتج</CardTitle>
        </CardHeader>
        <CardContent>
          <AddProductForm />
        </CardContent>
      </Card>
    </div>
  );
}
