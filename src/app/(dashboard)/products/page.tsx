import { ProductsTable } from '@/components/products/products-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { products } from '@/data/products';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function ProductsPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>إدارة المنتجات</h1>
          <p className='text-muted-foreground'>إدارة كتالوج المنتجات والمخزون</p>
        </div>
        <Link href='/products/add'>
          <Button>
            <Plus className='ml-2 h-4 w-4' />
            إضافة منتج
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>جميع المنتجات</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductsTable products={products} />
        </CardContent>
      </Card>
    </div>
  );
}
