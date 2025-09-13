import BrandsTable from '@/components/brands/brands-table';


export default async function BrandsPage() {
  // Prefetch with the exact query key structure used in useGetAllBrands

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold dark:text-black tracking-tight'>
            إدارة العلامات التجارية
          </h1>
          <p className='text-muted-foreground'>إدارة علاماتك التجارية ومحتواها</p>
        </div>
      </div>

      <BrandsTable />
    </div>
  );
}
