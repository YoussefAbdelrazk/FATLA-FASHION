import ProductsTable from '@/components/products/products-table';
import { products } from '@/data/products';

export default function ProductsPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Products</h1>
        <p className='text-muted-foreground'>
          Manage your product inventory, pricing, and availability.
        </p>
      </div>
      <ProductsTable products={products} />
    </div>
  );
}
